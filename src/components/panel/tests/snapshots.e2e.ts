import { snapIt } from '../../../test';

const component = 'panel';

describe(component, () => {
  const snap = snapIt(component);

  describe('renders', () => {
    snap('correctly with no props', '<hs-panel>default</hs-panel>');
    snap('correctly with height set', '<hs-panel height="350">default</hs-panel>');
  });
});
