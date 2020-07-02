import { snapIt } from '../../../test';

const component = 'calendar';

describe(component, () => {
  const snap = snapIt(component);

  describe('renders', () => {
    snap('a default calendar', '<hs-calendar date="1982, January 14"></hs-calendar>');
    snap('a coloured calendar', '<hs-calendar type="info" date="1982, January 14"></hs-calendar>');
  });
});
