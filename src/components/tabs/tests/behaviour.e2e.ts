import { newE2EPage } from '@stencil/core/dist/testing';

const html = `
  <hs-tabs>
    <hs-tab header="Tab one">This is tab one</hs-tab>
    <hs-tab header="Tab two" open>This is tab two</hs-tab>
  </hs-tabs>
`;

describe('tabs', async () => {
  test('triggers change event', async () => {
    const page = await newE2EPage();
    await page.setContent(html);

    const tabs = await page.find('hs-tabs');
    const tab = await tabs.find('.hs-tab-heading');
    const change = await tabs.spyOnEvent('change');

    await tab.click();
    await page.waitForChanges();

    expect(change).toHaveReceivedEventDetail({
      idx: 0,
    });
  });
});
