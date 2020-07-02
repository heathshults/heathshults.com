import { snapIt } from '../../../test';

const component = 'card';

describe(component, () => {
  const snap = snapIt(component);

  describe('renders', () => {
    snap('a card', '<hs-card></hs-card>');
    snap(
      'all the child elements correctly',
      `<hs-card>
      <hs-image></hs-image>
      <hs-card-header>
        <h2 class="hs-heading u-xlarge">
          Heading
          <div class="hs-heading__sub">Sub-heading</div>
        </h2>
      </hs-card-header>
      <hs-card-body>
        <p class="hs-paragraph">
          Lorem ipsum dolor sit amet, feugiat corpora ex eam. Inciderint eloquentiam sea et.
        </p>
      </hs-card-body>
      <hs-card-footer>
        <div class="hs-input-group">
          <button class="hs-button hs-button--block hs-button--brand">Button</button>
          <button class="hs-button hs-button--block hs-button--info">Button</button>
        </div>
      </hs-card-footer>
    </hs-card>`
    );
    snap(
      'all the child elements correctly',
      `<hs-card>
      <hs-media-item>
        <hs-media-image src="https://placehold.it/80"></hs-media-image>
        <hs-media-body>
          <h2 class="hs-heading">Title
            <span class="hs-heading__sub">Subtitle</span>
          </h2>
          <p class="hs-paragraph">
            Lorem ipsum dolor sit amet, feugiat corpora ex eam. Lorem ipsum dolor sit amet, feugiat corpora ex eam. Lorem ipsum dolor
            sit amet, feugiat corpora ex eam.
          </p>
        </hs-media-body>
      </hs-media-item>
    </hs-card>`
    );
  });
});
