import { newE2EPage } from '@stencil/core/dist/testing';

const html = `
<hs-accordion>
  <hs-accordion-pane header="Click me">
    This is an accordion
  </hs-accordion-pane>
</hs-accordion>
`;

describe('accordion', async () => {
  test('pane opens when clicked on', async () => {
    const page = await newE2EPage();
    await page.setContent(html);

    let paneControl = await page.find('button[role=heading]');
    expect(paneControl).not.toHaveClass('c-card__control--active');
    expect(paneControl).toEqualAttribute('aria-expanded', 'false');

    await paneControl.click();
    await page.waitForChanges();

    paneControl = await page.find('button[role=heading]');
    expect(paneControl).toHaveClass('c-card__control--active');
    expect(paneControl).toEqualAttribute('aria-expanded', 'true');
  });

  test('triggers toggle event', async () => {
    const page = await newE2EPage();
    await page.setContent(html);

    const accordion = await page.find('hs-accordion');
    const pane = await accordion.find('hs-accordion-pane');
    const paneControl = await pane.find('button[role=heading]');

    const toggle = await accordion.spyOnEvent('toggle');
    const togglePane = await pane.spyOnEvent('togglepane');

    await paneControl.click();
    await page.waitForChanges();

    expect(togglePane).toHaveReceivedEventDetail(true);
    expect(toggle).toHaveReceivedEventDetail({
      idx: 0,
      open: true,
    });
  });
});
