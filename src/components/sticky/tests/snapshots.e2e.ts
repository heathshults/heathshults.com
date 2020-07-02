import { snapIt } from '../../../test';

const component = 'sticky';

describe(component, () => {
  const snap = snapIt(component);

  describe('renders', () => {
    snap(
      'sticky no scroll',
      `<hs-sticky top="20">
        <hs-alert open dismissible type="info">Sticky alert</hs-alert>
       </hs-sticky>`
    );
  });
});
