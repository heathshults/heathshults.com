import { snapIt } from '../../../test';

const component = 'tabs';

describe(component, () => {
  const snap = snapIt(component);

  describe('renders', () => {
    snap(
      'renders correctly with no props',
      `<hs-tabs>
      <hs-tab>This is tab one</hs-tab>
      <hs-tab>This is tab two</hs-tab>
    </hs-tabs>`
    );
    snap(
      'renders correctly with props set',
      `<hs-tabs>
      <hs-tab header="Tab one" open>This is tab one</hs-tab>
      <hs-tab header="Tab two" disabled>This is tab two</hs-tab>
    </hs-tabs>`
    );
  });
});
