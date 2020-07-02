import { snapIt } from '../../../test';

const component = 'counter';

describe(component, () => {
  const snap = snapIt(component);

  describe('renders', () => {
    snap('a default empty counter', `<hs-counter></hs-counter>`);
  });
});
