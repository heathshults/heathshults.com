import { snapIt } from '../../../test';

const component = 'accordion';
const snap = snapIt(component);

snap('emtpy', `<hs-accordion></hs-accordion>`);
snap(
  'two headers and two panes',
  `<hs-accordion>
      <hs-accordion-pane header="Click me">
        This is an accordion
      </hs-accordion-pane>
    </hs-accordion>`
);
snap(
  'two headers and two panes',
  `<hs-accordion>
      <hs-accordion-pane open header="Click me">
        This is an accordion
      </hs-accordion-pane>
    </hs-accordion>`
);
