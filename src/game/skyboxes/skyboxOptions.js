export const SKYBOX_OPTIONS = [
  {
    id: 'sunset',
    label: 'Qwantani Sunset',
    path: '/skyboxes/qwantani_sunset_puresky_2k.hdr',
  },
  {
    id: 'rooftop-night',
    label: 'Rooftop Night',
    path: '/skyboxes/rooftop_night_2k.hdr',
  },
];

export function getSkyboxOption(skyboxId) {
  return SKYBOX_OPTIONS.find((option) => option.id === skyboxId) ?? null;
}
