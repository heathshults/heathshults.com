import { b as bootstrapLazy } from './index-57471f3a.js';
import { a as patchEsm } from './patch-9078b7f2.js';

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["hs-card",[[1,"hs-card"]]],["hs-card-body",[[1,"hs-card-body"]]],["hs-card-footer",[[1,"hs-card-footer"]]],["hs-card-header",[[1,"hs-card-header"]]],["hs-card-img-header",[[1,"hs-card-img-header",{"cardHeader":[8,"card-header"],"overlay":[8],"imgElem":[16],"imgPath":[1,"img-path"]}]]],["hs-media-body",[[1,"hs-media-body"]]],["hs-media-image",[[0,"hs-media-image",{"src":[1],"alt":[1]}]]],["hs-media-item",[[1,"hs-media-item"]]],["hs-modal",[[1,"hs-modal",{"ghost":[4],"full":[4],"open":[4],"dismissible":[4],"_isOpen":[32],"close":[64],"show":[64],"isOpen":[64]}]]],["hs-progress",[[1,"hs-progress",{"rounded":[4],"size":[1]},[[0,"changebar","onChangeBar"]]]]],["hs-progress-bar",[[1,"hs-progress-bar",{"type":[1],"value":[2],"min":[2],"max":[2]}]]],["hs-sticky",[[4,"hs-sticky",{"top":[2],"staticStyles":[32],"stickyStyles":[32]},[[9,"resize","positionElement"],[5,"scroll","positionElement"]]]]],["hs-tab",[[1,"hs-tab",{"header":[1],"disabled":[4],"open":[4],"type":[1]}]]],["hs-tabs",[[1,"hs-tabs",{"tabs":[32],"currentTab":[64],"openTab":[64]}]]],["hs-timeline",[[1,"hs-timeline",{"alternate":[4],"loading":[4]}]]],["hs-timeline-item",[[1,"hs-timeline-item",{"type":[1],"last":[4],"left":[4],"loading":[4]}]]]], options);
  });
};

export { defineCustomElements };
