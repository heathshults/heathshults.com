import { newE2EPage } from '@stencil/core/dist/testing';

const html = '<hs-toggle>default</hs-toggle>';

describe('toggle', async () => {
  test('triggers change event', async () => {
    const page = await newE2EPage();
    await page.setContent(html);

    const toggle = await page.find('hs-toggle');
    const label = await toggle.find('label');
    const change = await toggle.spyOnEvent('change');

    await label.click();
    await page.waitForChanges();

    expect(change).toHaveReceivedEventDetail(true);
  });
});
