import { snapIt } from '../../../test';

const component = 'timeline';

describe(component, () => {
  const snap = snapIt(component);

  describe('renders', () => {
    snap('without items', '<hs-timeline></hs-timeline>');
    snap(
      'with items',
      `<hs-timeline>
        <hs-timeline-item>Item 1</hs-timeline-item>
        <hs-timeline-item>Item 2</hs-timeline-item>
        <hs-timeline-item>Item 3</hs-timeline-item>
      </hs-timeline>`
    );
    snap(
      'all the attributes set',
      `<hs-timeline alternate loading>
        <hs-timeline-item left type="brand">Item 1</hs-timeline-item>
        <hs-timeline-item last>Item 2</hs-timeline-item>
        <hs-timeline-item loading>Item 3</hs-timeline-item>
      </hs-timeline>`
    );
  });
});
