import { snapIt } from '../../../test';

const component = 'breadcrumbs';

describe(component, () => {
  const snap = snapIt(component);

  describe('renders', () => {
    snap('nothing is rendered with no crumbs', '<hs-breadcrumbs></hs-breadcrumbs>');
    snap(
      'one crumb',
      `<hs-breadcrumbs>
      <hs-breadcrumb>Home</hs-breadcrumb>
    </hs-breadcrumbs>`
    );
    snap(
      'two crumbs with a separator',
      `<hs-breadcrumbs>
      <hs-breadcrumb>Home</hs-breadcrumb>
      <hs-breadcrumb>Sub-section</hs-breadcrumb>
    </hs-breadcrumbs>`
    );
    snap(
      'linked crumb',
      `<hs-breadcrumbs>
      <hs-breadcrumb href="home.html">Home</hs-breadcrumb>
      <hs-breadcrumb href="another-page.html">Another page</hs-breadcrumb>
      <hs-breadcrumb>Sub-section</hs-breadcrumb>
    </hs-breadcrumbs>`
    );
  });
});
