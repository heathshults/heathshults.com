import { snapIt } from '../../../test';

const component = 'pagination';

describe(component, () => {
  const snap = snapIt(component);

  describe('renders', () => {
    snap('should work without parameters', '<hs-pagination></hs-pagination>');
    snap('renders the correct buttons when pages set', '<hs-pagination pages="15"></hs-pagination>');
  });
});
