export interface IFeatureFlags {
  showLightAndDarkMode: boolean;
  showTicTackToe: boolean;
  showAccordion: boolean;
  showTreeView: boolean;
}

const dummyApiResponse = {
  showLightAndDarkMode: true,
  showTicTackToe: true,
  showAccordion: false,
  showTreeView: false,
};

const getFeatureFlags = (): Promise<IFeatureFlags> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyApiResponse);
    }, 500);
  });
};

export default getFeatureFlags;
