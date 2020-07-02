import { snapIt } from '../../../test';

const component = 'alert';

describe(component, () => {
  const snap = snapIt(component);

  describe('renders', () => {
    snap('without parameters', '<hs-alert>test this!</hs-alert>');
    snap('correct type', '<hs-alert type="brand">test this!</hs-alert>');
  });
});
