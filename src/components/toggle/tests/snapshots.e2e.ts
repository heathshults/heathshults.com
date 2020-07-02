import { snapIt } from '../../../test';

const component = 'toggle';

describe(component, () => {
  const snap = snapIt(component);

  describe('renders', () => {
    snap('renders correctly with no props', '<hs-toggle>default</hs-toggle>');
    snap('colours based on type', '<hs-toggle type="success">default</hs-toggle>');
    snap('should be toggle on when prop is present', '<hs-toggle toggled type="success">default</hs-toggle>');
  });
});
