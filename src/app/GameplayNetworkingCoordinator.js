export class GameplayNetworkingCoordinator {
  constructor(networkClient) {
    this.networkClient = networkClient;
    this.lastSentWeaponKey = null;
    this.lastSentScopedState = false;
  }

  resetTrackedStatus() {
    this.lastSentWeaponKey = null;
    this.lastSentScopedState = false;
  }

  isGameplaySyncEnabled({ authoritativeNetworkingEnabled, playerController }) {
    return authoritativeNetworkingEnabled && playerController?.getMovementMode?.() !== 'fly';
  }

  syncLocalPlayer({
    authoritativeNetworkingEnabled,
    mapId,
    team,
    displayName,
    playerController,
    weaponManager,
  }) {
    if (!playerController || !authoritativeNetworkingEnabled) {
      return;
    }

    this.networkClient.initializeLocalPlayer({
      mapId,
      team,
      displayName,
      position: {
        x: playerController.position.x,
        y: playerController.position.y,
        z: playerController.position.z,
      },
      velocity: {
        x: playerController.velocity.x,
        y: playerController.velocity.y,
        z: playerController.velocity.z,
      },
      yaw: playerController.yawAngle,
      pitch: playerController.pitchAngle,
      isGrounded: playerController.isGrounded,
      isCrouched: playerController.isCrouched,
      currentHeight: playerController.currentHeight,
      activeWeaponKey: weaponManager?.activeWeaponKey ?? 'rifle',
    });

    this.lastSentWeaponKey = weaponManager?.activeWeaponKey ?? 'rifle';
    this.lastSentScopedState = Boolean(weaponManager?.isScoped);
  }

  syncCombatNetworkingMode({
    authoritativeNetworkingEnabled,
    playerController,
    weaponManager,
  }) {
    weaponManager?.setCombatNetworking({
      authoritativeCombatEnabled: this.isGameplaySyncEnabled({
        authoritativeNetworkingEnabled,
        playerController,
      }),
      onFireRequest: (fireRequest) => {
        if (!this.isGameplaySyncEnabled({ authoritativeNetworkingEnabled, playerController })) {
          return;
        }

        this.networkClient.sendFireRequest(fireRequest);
      },
      onWeaponChanged: (activeWeaponKey) => {
        if (!this.isGameplaySyncEnabled({ authoritativeNetworkingEnabled, playerController })) {
          return;
        }

        this.networkClient.sendPlayerStatus({
          activeWeaponKey,
          isScoped: Boolean(weaponManager?.isScoped),
        });
        this.lastSentWeaponKey = activeWeaponKey;
        this.lastSentScopedState = Boolean(weaponManager?.isScoped);
      },
    });
  }

  syncWeaponStatusIfNeeded({
    authoritativeNetworkingEnabled,
    playerController,
    weaponManager,
  }) {
    if (!weaponManager || !this.isGameplaySyncEnabled({ authoritativeNetworkingEnabled, playerController })) {
      return;
    }

    const activeWeaponKey = weaponManager.activeWeaponKey ?? 'rifle';
    const isScoped = Boolean(weaponManager.isScoped);
    if (activeWeaponKey === this.lastSentWeaponKey && isScoped === this.lastSentScopedState) {
      return;
    }

    this.networkClient.sendPlayerStatus({ activeWeaponKey, isScoped });
    this.lastSentWeaponKey = activeWeaponKey;
    this.lastSentScopedState = isScoped;
  }

  handleCombatEvents({
    remotePlayerPresenter,
    utilityManager,
    getPopupId,
    onLocalPlayerHit,
    onLocalPlayerDamageDealt,
  }) {
    for (const event of this.networkClient.consumeCombatEvents()) {
      remotePlayerPresenter.handleCombatEvent(event);
      utilityManager?.handleCombatEvent?.(event, {
        localPlayerId: this.networkClient.playerId,
        localMapId: this.networkClient.getLocalPlayerState?.()?.mapId ?? null,
      });

      if (event?.type !== 'player-hit') {
        continue;
      }

      if (event.attackerPlayerId === this.networkClient.playerId) {
        onLocalPlayerDamageDealt?.({
          id: getPopupId(),
          text: String(event.damage ?? 0),
          life: 0.7,
        });
      }

      if (event.victimPlayerId === this.networkClient.playerId) {
        onLocalPlayerHit?.(event);
      }
    }
  }
}
