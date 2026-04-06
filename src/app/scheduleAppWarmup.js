export function scheduleAppWarmup({ preloadMapOptions, preloadNavigationModules, preloadSkyboxModules }) {
  const warmup = () => {
    void Promise.allSettled([
      preloadMapOptions(),
      preloadNavigationModules(),
      preloadSkyboxModules(),
    ]);
  };

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(() => warmup(), { timeout: 2000 });
    return;
  }

  window.setTimeout(warmup, 250);
}
