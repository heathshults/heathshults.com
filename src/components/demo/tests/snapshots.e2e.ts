import { snapIt } from '../../../test';

const component = 'demo';

describe(component, () => {
  const snap = snapIt(component);

  describe('renders', () => {
    snap('renders correctly with no props', '<hs-demo></hs-demo>');
    snap(
      'renders a badge component and a code area',
      `<hs-demo language="html" code='<hs-badge type="success">YO!</hs-badge>'></hs-demo>`
    );
  });
});
