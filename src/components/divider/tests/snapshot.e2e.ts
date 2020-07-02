import { snapIt } from '../../../test';

const component = 'divider';

describe(component, () => {
  const snap = snapIt(component);

  describe('renders', () => {
    snap('correctly', '<hs-divider></hs-divider>');
    snap('content', '<hs-divider>Hello, world</hs-divider>');
  });
});
