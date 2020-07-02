import { snapIt } from '../../../test';

const component = 'progress';

describe(component, () => {
  const snap = snapIt(component);

  describe('renders', () => {
    snap('basic progress bar', '<hs-progress percentage="5">5%</hs-progress>');
    snap('size correctly', '<hs-progress size="small" percentage="15">15%</hs-progress>');
    snap('type correctly', '<hs-progress size="medium" type="info" percentage="20">20%</hs-progress>');
    snap(
      'rounded ends correctly',
      '<hs-progress size="large" type="success" percentage="25" rounded>25%</hs-progress>'
    );
  });
});
