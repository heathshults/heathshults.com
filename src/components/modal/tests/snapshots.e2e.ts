import { snapIt } from '../../../test';

const component = 'modal';

describe(component, () => {
  const snap = snapIt(component);

  describe('renders', () => {
    snap('renders correctly with no props', '<hs-modal>default</hs-modal>');
    snap('renders as open', '<hs-modal open>default</hs-modal>');
    snap('renders dismissible button and overlay', '<hs-modal open dismissible>default</hs-modal>');
  });
});
