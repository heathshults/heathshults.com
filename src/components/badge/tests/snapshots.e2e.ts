import { snapIt } from '../../../test';

const component = 'badge';

describe(component, () => {
  const snap = snapIt(component);

  describe('renders', () => {
    snap('renders correctly with no props', '<hs-badge>default</hs-badge>');
    snap('appends the color modifier class', '<hs-badge type="brand">brand</hs-badge>');
    snap('handles boolean rounded attribute', '<hs-badge rounded>default</hs-badge>');
    snap('handles both boolean rounded attribute and type', '<hs-badge rounded type="brand">brand</hs-badge>');
    snap('handles boolean ghost and boolean rounded', '<hs-badge ghost rounded>default</hs-badge>');
    snap('supports all the modifiers', '<hs-badge ghost rounded type="brand">brand</hs-badge>');
  });
});
