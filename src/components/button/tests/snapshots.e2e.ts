import { snapIt } from '../../../test';

const component = 'button';

describe(component, () => {
  const snap = snapIt(component);

  describe('renders', () => {
    snap('a default button', `<hs-button>Action</hs-button>`);
    snap('an a button', `<hs-button href="nowhere.com" value="Action"></hs-button>`);
    snap('a colored button', `<hs-button type="info">Action</hs-button>`);
    snap('a sized button', `<hs-button size="small">Action</hs-button>`);
    snap('a full-width button', `<hs-button full>Action</hs-button>`);
    snap('a ghost button', `<hs-button ghost>Action</hs-button>`);
    snap('a colored ghost button', `<hs-button ghost type="info">Action</hs-button>`);
    snap('a rounded button', `<hs-button rounded>Action</hs-button>`);
    snap('a rounded ghost button', `<hs-button rounded ghost>Action</hs-button>`);
    snap('an active button', `<hs-button active>Action</hs-button>`);
  });
});
