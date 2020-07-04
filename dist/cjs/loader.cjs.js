'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-216d360b.js');
const patch = require('./patch-27b9c2b4.js');

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patch.patchEsm().then(() => {
  return index.bootstrapLazy([["hs-card.cjs",[[1,"hs-card"]]],["hs-card-body.cjs",[[1,"hs-card-body"]]],["hs-card-footer.cjs",[[1,"hs-card-footer"]]],["hs-card-header.cjs",[[1,"hs-card-header"]]],["hs-card-img-header.cjs",[[1,"hs-card-img-header",{"cardHeader":[8,"card-header"],"overlay":[8],"imgElem":[16],"imgPath":[1,"img-path"]}]]],["hs-media-body.cjs",[[1,"hs-media-body"]]],["hs-media-image.cjs",[[0,"hs-media-image",{"src":[1],"alt":[1]}]]],["hs-media-item.cjs",[[1,"hs-media-item"]]],["hs-modal.cjs",[[1,"hs-modal",{"ghost":[4],"full":[4],"open":[4],"dismissible":[4],"_isOpen":[32],"close":[64],"show":[64],"isOpen":[64]}]]],["hs-progress.cjs",[[1,"hs-progress",{"rounded":[4],"size":[1]},[[0,"changebar","onChangeBar"]]]]],["hs-progress-bar.cjs",[[1,"hs-progress-bar",{"type":[1],"value":[2],"min":[2],"max":[2]}]]],["hs-sticky.cjs",[[4,"hs-sticky",{"top":[2],"staticStyles":[32],"stickyStyles":[32]},[[9,"resize","positionElement"],[5,"scroll","positionElement"]]]]],["hs-tab.cjs",[[1,"hs-tab",{"header":[1],"disabled":[4],"open":[4],"type":[1]}]]],["hs-tabs.cjs",[[1,"hs-tabs",{"tabs":[32],"currentTab":[64],"openTab":[64]}]]],["hs-timeline.cjs",[[1,"hs-timeline",{"alternate":[4],"loading":[4]}]]],["hs-timeline-item.cjs",[[1,"hs-timeline-item",{"type":[1],"last":[4],"left":[4],"loading":[4]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
