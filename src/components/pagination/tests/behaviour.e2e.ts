import { newE2EPage } from '@stencil/core/dist/testing';

const html = '<hs-pagination pages="15"></hs-pagination>';

describe('modal', async () => {
  test('triggers change event', async () => {
    const page = await newE2EPage();
    await page.setContent(html);

    const pagination = await page.find('hs-pagination');
    const controls = await pagination.findAll('.hs-pagination__control');
    const change = await pagination.spyOnEvent('change');

    await controls.reverse()[0].click(); // last pagination control button (next page)
    await page.waitForChanges();

    expect(change).toHaveReceivedEvent();
  });
});
