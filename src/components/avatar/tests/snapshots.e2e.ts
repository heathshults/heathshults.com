import { snapIt } from '../../../test';

const component = 'avatar';

describe(component, () => {
  const snap = snapIt(component);

  describe('renders', () => {
    snap('nothing if no attributes are set', '<hs-avatar></hs-avatar>');
    snap('text inside', '<hs-avatar text="GP"></hs-avatar>');
    snap('correctly sized circles', '<hs-avatar size="super" text="GP"></hs-avatar>');
    snap('an image', '<hs-avatar src="my-test-image.png"></hs-avatar>');
    snap('2 images', '<hs-avatar src="my-test-image.png" src2="my-second-test-image.png"></hs-avatar>');
    snap(
      'images, text and sizes it correctly',
      '<hs-avatar src="my-test-image.png" src2="my-second-test-image.png" size="super" text="GP"></hs-avatar>'
    );
  });
});
