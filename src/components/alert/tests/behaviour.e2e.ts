import { newE2EPage } from '@stencil/core/dist/testing';

const html = '<hs-alert open dismissible>test this!</hs-alert>';

describe('alert', async () => {
  test('triggers close event', async () => {
    const page = await newE2EPage();
    await page.setContent(html);

    const alert = await page.find('hs-alert');
    const closeButton = await page.find('button');
    const close = await alert.spyOnEvent('close');

    await closeButton.click();
    await page.waitForChanges();

    expect(close).toHaveReceivedEvent();
  });
});
