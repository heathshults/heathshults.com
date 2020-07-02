import { snapIt } from '../../../test';

const component = 'drawer';

describe(component, () => {
  const snap = snapIt(component);

  describe('renders', () => {
    snap('renders correctly with no props', '<hs-drawer>default</hs-drawer>');
    snap('renders as open', '<hs-drawer open>default</hs-drawer>');
    snap('renders dismissible overlay', '<hs-drawer open dismissible>default</hs-drawer>');
  });
});
