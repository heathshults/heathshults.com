import { snapIt } from '../../../test';

const component = 'address';

describe(component, () => {
  const snap = snapIt(component);

  describe('renders', () => {
    snap('correctly', '<hs-address>Address line one</hs-address>');

    snap(
      'the address heading',
      `<hs-address>
        <hs-address-heading>Address header</hs-address-heading>
        Address line one<br />
        Address line two<br />
        Postcode
      </hs-address>`
    );
  });
});
