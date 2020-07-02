import { newE2EPage } from '@stencil/core/dist/testing';

const html = '<hs-modal open dismissible>default</hs-modal>';

describe('modal', async () => {
  test('triggers close event', async () => {
    const page = await newE2EPage();
    await page.setContent(html);

    const modal = await page.find('hs-modal');
    const closeButton = await modal.find('.hs-button--close');
    const close = await modal.spyOnEvent('close');

    await closeButton.click();
    await page.waitForChanges();

    expect(close).toHaveReceivedEvent();
  });
});
