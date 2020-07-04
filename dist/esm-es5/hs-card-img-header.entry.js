import { r as registerInstance, h, g as getElement } from './index-57471f3a.js';
var componentsCardsCss = "@charset \"UTF-8\";.hs-card__row{display:-ms-flexbox;display:flex;-ms-flex-align:stretch;align-items:stretch;-ms-flex-pack:center;justify-content:center}.hs-card{position:relative;display:block;width:100%;padding:0;overflow:hidden;background:transparent;border-radius:4px;-webkit-box-shadow:0 0 1px rgba(0, 0, 0, 0.6);box-shadow:0 0 1px rgba(0, 0, 0, 0.6)}.hs-card>.hs-image:not(:first-child){padding:1em 0 0}.hs-card+.hs-card{margin:0.5em 0 0 0}.hs-card__header{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;padding:1em 1em 0;font-size:1.2rem;color:#9bcbe6;background-color:#181a1b}.hs-card__header .hs-heading{padding:0;margin:0.5rem auto 0.25rem;font-size:2.5rem;font-weight:700;text-align:center}.hs-card__img-header{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;height:289px;max-height:289px;padding:0;overflow-x:hidden;background-color:#fff}.hs-card__img-header .hs-img-header-img{width:100%;height:100%}.hs-card__img-header .hs-img-header__overlay{position:relative;width:100%;height:100%}.hs-card__img-header .hs-img-header__overlay::before{position:absolute;z-index:1;width:0px;height:0px;content:\"\";background:rgba(254, 209, 54, 0.1);opacity:0;-webkit-transition:all ease 0.5s;transition:all ease 0.5s}.hs-card__img-header .hs-img-header__overlay:hover::before{top:0;left:0;z-index:4;width:100%;height:100%;color:#fff;content:\"\";background:rgba(254, 209, 54, 0.9);opacity:1;-webkit-transition:all ease 0.5s;transition:all ease 0.5s}.hs-card__body{padding:1em;text-align:center}.hs-card__footer{padding:1em;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-item-align:end;align-self:flex-end;width:100%;text-align:center}.hs-card__footer .lead,.hs-card__footer .footer-lead{margin-right:auto;margin-left:auto;font-size:2.5rem;font-weight:700;text-align:center;font-family:\"Caveat\", cursive}.hs-card__footer--block{padding:0.5em 0 0}.hs-card__footer--block .hs-input-group .hs-button{border-bottom:0}.hs-card__footer--block .hs-input-group .hs-button:first-child{border-left:0;border-top-left-radius:0;border-bottom-left-radius:0}.hs-card__footer--block .hs-input-group .hs-button:last-child{border-right:0;border-top-right-radius:0;border-bottom-right-radius:0}.hs-card__item{margin:0;padding:0.5em;color:#000;background-color:#fff}.hs-card__item[aria-selected=true]{background-color:#f7f7f7}.hs-card__item.hs-card__item--active{background-color:#f7f7f7}.hs-card__item:disabled,.hs-card__item[disabled]{cursor:not-allowed;opacity:0.5}.hs-card__item--divider[role=separator]{margin:0;padding:0.5em;color:#000;background-color:#f2f2f4;font-weight:bold}.hs-card__item--divider[role=separator][aria-selected=true]{background-color:#e9e9ed}.hs-card__item--divider[role=separator].hs-card__item--active{background-color:#e9e9ed}.hs-card__item--divider[role=separator]:disabled,.hs-card__item--divider[role=separator][disabled]{cursor:not-allowed;opacity:0.5}.hs-card__item--brand{margin:0;padding:0.5em;color:#fff;background-color:#2c3e50}.hs-card__item--brand[aria-selected=true]{background-color:#273646}.hs-card__item--brand.hs-card__item--active{background-color:#273646}.hs-card__item--brand:disabled,.hs-card__item--brand[disabled]{cursor:not-allowed;opacity:0.5}.hs-card__item--info{margin:0;padding:0.5em;color:#fff;background-color:#4267ff}.hs-card__item--info[aria-selected=true]{background-color:#335bff}.hs-card__item--info.hs-card__item--active{background-color:#335bff}.hs-card__item--info:disabled,.hs-card__item--info[disabled]{cursor:not-allowed;opacity:0.5}.hs-card__item--warning{margin:0;padding:0.5em;color:#000;background-color:#ffa500}.hs-card__item--warning[aria-selected=true]{background-color:#f09b00}.hs-card__item--warning.hs-card__item--active{background-color:#f09b00}.hs-card__item--warning:disabled,.hs-card__item--warning[disabled]{cursor:not-allowed;opacity:0.5}.hs-card__item--success{margin:0;padding:0.5em;color:#fff;background-color:#088a05}.hs-card__item--success[aria-selected=true]{background-color:#077b04}.hs-card__item--success.hs-card__item--active{background-color:#077b04}.hs-card__item--success:disabled,.hs-card__item--success[disabled]{cursor:not-allowed;opacity:0.5}.hs-card__item--error{margin:0;padding:0.5em;color:#fff;background-color:#ee0202}.hs-card__item--error[aria-selected=true]{background-color:#df0202}.hs-card__item--error.hs-card__item--active{background-color:#df0202}.hs-card__item--error:disabled,.hs-card__item--error[disabled]{cursor:not-allowed;opacity:0.5}.hs-card__item+.hs-card__footer--block{padding:0}.hs-card--grouped .hs-card__item:not(:last-child){border-bottom:0}.hs-card__divider[role=separator]{height:1px;overflow:hidden;background-color:#f2f2f4}.hs-card--menu[role=menu]{z-index:100;display:block;width:100%;max-height:280px;margin:0.5em 0 0 0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}.hs-card--menu[role=menu] .hs-card__control[role=menuitem]{color:#fff;background-color:#74748c;border:1px solid transparent;display:inline-block;max-width:100%;margin:0;padding:0.5em;overflow:hidden;font-size:1em;font-family:inherit;line-height:normal;white-space:nowrap;text-align:center;text-decoration:none;text-overflow:ellipsis;vertical-align:middle;border-radius:4px;outline:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-user-select:none;-ms-user-select:none;-moz-user-select:none;user-select:none;color:#000;background-color:#fff;border:1px solid transparent;position:relative;display:block;width:100%;margin:0;padding:0.5em;text-align:inherit;text-decoration:inherit;border:0;border-radius:0}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-button--active{background-color:#6d6d84}.hs-card--menu[role=menu] .hs-card__control[role=menuitem]:not(:disabled):not([disabled]):not(:active):hover{background-color:#7c7c93}.hs-card--menu[role=menu] .hs-card__control[role=menuitem]:not(:disabled):not([disabled]):focus{border-color:#4267ff;-webkit-box-shadow:inset 0 0 0 2px #5173ff;box-shadow:inset 0 0 0 2px #5173ff}.hs-card--menu[role=menu] .hs-card__control[role=menuitem]:not(:disabled):not([disabled]):active{background-color:#6d6d84}.hs-card--menu[role=menu] .hs-card__control[role=menuitem]:disabled,.hs-card--menu[role=menu] .hs-card__control[role=menuitem][disabled]{cursor:not-allowed;opacity:0.5}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-button--active{background-color:#f7f7f7}.hs-card--menu[role=menu] .hs-card__control[role=menuitem]:not(:disabled):not([disabled]):not(:active):hover{background-color:white}.hs-card--menu[role=menu] .hs-card__control[role=menuitem]:not(:disabled):not([disabled]):focus{border-color:#4267ff;-webkit-box-shadow:inset 0 0 0 2px #5173ff;box-shadow:inset 0 0 0 2px #5173ff}.hs-card--menu[role=menu] .hs-card__control[role=menuitem]:not(:disabled):not([disabled]):active{background-color:#f7f7f7}.hs-card--menu[role=menu] .hs-card__control[role=menuitem][aria-expanded=true]{font-weight:bold;background-color:#f7f7f7}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--active{background-color:#f7f7f7}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--brand{color:#fff;background-color:#74748c;border:1px solid transparent;display:inline-block;max-width:100%;margin:0;padding:0.5em;overflow:hidden;font-size:1em;font-family:inherit;line-height:normal;white-space:nowrap;text-align:center;text-decoration:none;text-overflow:ellipsis;vertical-align:middle;border-radius:4px;outline:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-user-select:none;-ms-user-select:none;-moz-user-select:none;user-select:none;color:#fff;background-color:#2c3e50;border:1px solid transparent;position:relative;display:block;width:100%;margin:0;padding:0.5em;text-align:inherit;text-decoration:inherit;border:0;border-radius:0}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--brand.hs-button--active{background-color:#6d6d84}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--brand:not(:disabled):not([disabled]):not(:active):hover{background-color:#7c7c93}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--brand:not(:disabled):not([disabled]):focus{border-color:#4267ff;-webkit-box-shadow:inset 0 0 0 2px #5173ff;box-shadow:inset 0 0 0 2px #5173ff}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--brand:not(:disabled):not([disabled]):active{background-color:#6d6d84}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--brand:disabled,.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--brand[disabled]{cursor:not-allowed;opacity:0.5}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--brand.hs-button--active{background-color:#273646}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--brand:not(:disabled):not([disabled]):not(:active):hover{background-color:#31465a}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--brand:not(:disabled):not([disabled]):focus{border-color:#4267ff;-webkit-box-shadow:inset 0 0 0 2px #5173ff;box-shadow:inset 0 0 0 2px #5173ff}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--brand:not(:disabled):not([disabled]):active{background-color:#273646}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--brand[aria-expanded=true]{font-weight:bold;background-color:#273646}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--brand.hs-card__control--active{background-color:#273646}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--info{color:#fff;background-color:#74748c;border:1px solid transparent;display:inline-block;max-width:100%;margin:0;padding:0.5em;overflow:hidden;font-size:1em;font-family:inherit;line-height:normal;white-space:nowrap;text-align:center;text-decoration:none;text-overflow:ellipsis;vertical-align:middle;border-radius:4px;outline:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-user-select:none;-ms-user-select:none;-moz-user-select:none;user-select:none;color:#fff;background-color:#4267ff;border:1px solid transparent;position:relative;display:block;width:100%;margin:0;padding:0.5em;text-align:inherit;text-decoration:inherit;border:0;border-radius:0}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--info.hs-button--active{background-color:#6d6d84}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--info:not(:disabled):not([disabled]):not(:active):hover{background-color:#7c7c93}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--info:not(:disabled):not([disabled]):focus{border-color:#4267ff;-webkit-box-shadow:inset 0 0 0 2px #5173ff;box-shadow:inset 0 0 0 2px #5173ff}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--info:not(:disabled):not([disabled]):active{background-color:#6d6d84}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--info:disabled,.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--info[disabled]{cursor:not-allowed;opacity:0.5}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--info.hs-button--active{background-color:#335bff}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--info:not(:disabled):not([disabled]):not(:active):hover{background-color:#5173ff}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--info:not(:disabled):not([disabled]):focus{border-color:#4267ff;-webkit-box-shadow:inset 0 0 0 2px #5173ff;box-shadow:inset 0 0 0 2px #5173ff}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--info:not(:disabled):not([disabled]):active{background-color:#335bff}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--info[aria-expanded=true]{font-weight:bold;background-color:#335bff}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--info.hs-card__control--active{background-color:#335bff}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--warning{color:#fff;background-color:#74748c;border:1px solid transparent;display:inline-block;max-width:100%;margin:0;padding:0.5em;overflow:hidden;font-size:1em;font-family:inherit;line-height:normal;white-space:nowrap;text-align:center;text-decoration:none;text-overflow:ellipsis;vertical-align:middle;border-radius:4px;outline:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-user-select:none;-ms-user-select:none;-moz-user-select:none;user-select:none;color:#000;background-color:#ffa500;border:1px solid transparent;position:relative;display:block;width:100%;margin:0;padding:0.5em;text-align:inherit;text-decoration:inherit;border:0;border-radius:0}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--warning.hs-button--active{background-color:#6d6d84}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--warning:not(:disabled):not([disabled]):not(:active):hover{background-color:#7c7c93}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--warning:not(:disabled):not([disabled]):focus{border-color:#4267ff;-webkit-box-shadow:inset 0 0 0 2px #5173ff;box-shadow:inset 0 0 0 2px #5173ff}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--warning:not(:disabled):not([disabled]):active{background-color:#6d6d84}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--warning:disabled,.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--warning[disabled]{cursor:not-allowed;opacity:0.5}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--warning.hs-button--active{background-color:#f09b00}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--warning:not(:disabled):not([disabled]):not(:active):hover{background-color:#ffaa0f}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--warning:not(:disabled):not([disabled]):focus{border-color:#4267ff;-webkit-box-shadow:inset 0 0 0 2px #5173ff;box-shadow:inset 0 0 0 2px #5173ff}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--warning:not(:disabled):not([disabled]):active{background-color:#f09b00}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--warning[aria-expanded=true]{font-weight:bold;background-color:#f09b00}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--warning.hs-card__control--active{background-color:#f09b00}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--success{color:#fff;background-color:#74748c;border:1px solid transparent;display:inline-block;max-width:100%;margin:0;padding:0.5em;overflow:hidden;font-size:1em;font-family:inherit;line-height:normal;white-space:nowrap;text-align:center;text-decoration:none;text-overflow:ellipsis;vertical-align:middle;border-radius:4px;outline:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-user-select:none;-ms-user-select:none;-moz-user-select:none;user-select:none;color:#fff;background-color:#088a05;border:1px solid transparent;position:relative;display:block;width:100%;margin:0;padding:0.5em;text-align:inherit;text-decoration:inherit;border:0;border-radius:0}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--success.hs-button--active{background-color:#6d6d84}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--success:not(:disabled):not([disabled]):not(:active):hover{background-color:#7c7c93}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--success:not(:disabled):not([disabled]):focus{border-color:#4267ff;-webkit-box-shadow:inset 0 0 0 2px #5173ff;box-shadow:inset 0 0 0 2px #5173ff}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--success:not(:disabled):not([disabled]):active{background-color:#6d6d84}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--success:disabled,.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--success[disabled]{cursor:not-allowed;opacity:0.5}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--success.hs-button--active{background-color:#077b04}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--success:not(:disabled):not([disabled]):not(:active):hover{background-color:#099906}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--success:not(:disabled):not([disabled]):focus{border-color:#4267ff;-webkit-box-shadow:inset 0 0 0 2px #5173ff;box-shadow:inset 0 0 0 2px #5173ff}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--success:not(:disabled):not([disabled]):active{background-color:#077b04}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--success[aria-expanded=true]{font-weight:bold;background-color:#077b04}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--success.hs-card__control--active{background-color:#077b04}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--error{color:#fff;background-color:#74748c;border:1px solid transparent;display:inline-block;max-width:100%;margin:0;padding:0.5em;overflow:hidden;font-size:1em;font-family:inherit;line-height:normal;white-space:nowrap;text-align:center;text-decoration:none;text-overflow:ellipsis;vertical-align:middle;border-radius:4px;outline:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-user-select:none;-ms-user-select:none;-moz-user-select:none;user-select:none;color:#fff;background-color:#ee0202;border:1px solid transparent;position:relative;display:block;width:100%;margin:0;padding:0.5em;text-align:inherit;text-decoration:inherit;border:0;border-radius:0}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--error.hs-button--active{background-color:#6d6d84}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--error:not(:disabled):not([disabled]):not(:active):hover{background-color:#7c7c93}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--error:not(:disabled):not([disabled]):focus{border-color:#4267ff;-webkit-box-shadow:inset 0 0 0 2px #5173ff;box-shadow:inset 0 0 0 2px #5173ff}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--error:not(:disabled):not([disabled]):active{background-color:#6d6d84}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--error:disabled,.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--error[disabled]{cursor:not-allowed;opacity:0.5}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--error.hs-button--active{background-color:#df0202}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--error:not(:disabled):not([disabled]):not(:active):hover{background-color:#fd0202}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--error:not(:disabled):not([disabled]):focus{border-color:#4267ff;-webkit-box-shadow:inset 0 0 0 2px #5173ff;box-shadow:inset 0 0 0 2px #5173ff}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--error:not(:disabled):not([disabled]):active{background-color:#df0202}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--error[aria-expanded=true]{font-weight:bold;background-color:#df0202}.hs-card--menu[role=menu] .hs-card__control[role=menuitem].hs-card__control--error.hs-card__control--active{background-color:#df0202}.hs-card--accordion .hs-card__control[aria-expanded]{color:#fff;background-color:#74748c;border:1px solid transparent;display:inline-block;max-width:100%;margin:0;padding:0.5em;overflow:hidden;font-size:1em;font-family:inherit;line-height:normal;white-space:nowrap;text-align:center;text-decoration:none;text-overflow:ellipsis;vertical-align:middle;border-radius:4px;outline:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-user-select:none;-ms-user-select:none;-moz-user-select:none;user-select:none;color:#000;background-color:#f2f2f4;border:1px solid transparent;position:relative;display:block;width:100%;margin:0;padding:0.5em;text-align:inherit;text-decoration:inherit;border:0;border-radius:0}.hs-card--accordion .hs-card__control[aria-expanded].hs-button--active{background-color:#6d6d84}.hs-card--accordion .hs-card__control[aria-expanded]:not(:disabled):not([disabled]):not(:active):hover{background-color:#7c7c93}.hs-card--accordion .hs-card__control[aria-expanded]:not(:disabled):not([disabled]):focus{border-color:#4267ff;-webkit-box-shadow:inset 0 0 0 2px #5173ff;box-shadow:inset 0 0 0 2px #5173ff}.hs-card--accordion .hs-card__control[aria-expanded]:not(:disabled):not([disabled]):active{background-color:#6d6d84}.hs-card--accordion .hs-card__control[aria-expanded]:disabled,.hs-card--accordion .hs-card__control[aria-expanded][disabled]{cursor:not-allowed;opacity:0.5}.hs-card--accordion .hs-card__control[aria-expanded].hs-button--active{background-color:#e9e9ed}.hs-card--accordion .hs-card__control[aria-expanded]:not(:disabled):not([disabled]):not(:active):hover{background-color:#fafafb}.hs-card--accordion .hs-card__control[aria-expanded]:not(:disabled):not([disabled]):focus{border-color:#4267ff;-webkit-box-shadow:inset 0 0 0 2px #5173ff;box-shadow:inset 0 0 0 2px #5173ff}.hs-card--accordion .hs-card__control[aria-expanded]:not(:disabled):not([disabled]):active{background-color:#e9e9ed}.hs-card--accordion .hs-card__control[aria-expanded][aria-expanded=true]{font-weight:bold;background-color:#e9e9ed}.hs-card--accordion .hs-card__control[aria-expanded].hs-card__control--active{background-color:#e9e9ed}.hs-card--accordion .hs-card__control[aria-expanded]::after{position:absolute;top:0.5em;right:0.5em;width:1em;height:1em;background-image:url(\"data:image/png;base64,R0lGODlhDwAUAIABAAAAAP///yH5BAEAAAEALAAAAAAPABQAAAIXjI+py+0Po5wH2HsXzmw//lHiSJZmUAAAOw==\");background-repeat:no-repeat;background-position:center;content:\"\"}.hs-card--accordion .hs-card__control[aria-expanded][aria-expanded=true]::after{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.hs-card__item--pane{margin:0;padding:0.5em}.hs-card__control[aria-expanded=false]+.hs-card__item--pane{position:absolute;width:1px;height:1px;overflow:hidden;-webkit-clip-path:inset(50%);clip-path:inset(50%)}";
var HSCardImgHeader = /** @class */ (function () {
    function HSCardImgHeader(hostRef) {
        registerInstance(this, hostRef);
    }
    HSCardImgHeader.prototype.componentWillLoad = function () {
        this.cardHeader = document.getElementById('imgHeader');
        this.imgElem = this.cardHeader.querySelector('img');
        this.imgElem.src = this.imgPath;
        this.overlay = this.cardHeader.querySelector('#imgHeaderOverlay');
        this.overlay.addEventListener('click', function (ev) {
            ev.preventDefault();
            alert('hi');
        });
    };
    HSCardImgHeader.prototype.render = function () {
        return (h("header", { id: "imgHeader", class: "hs-card__img-header" }, h("a", { id: "imgHeaderOverlay", class: "hs-img-header__overlay", href: "#" }, h("img", { src: this.imgPath, class: "hs-img-header-img", alt: "header image", width: "100%" }))));
    };
    Object.defineProperty(HSCardImgHeader.prototype, "imgHeaderElem", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return HSCardImgHeader;
}());
HSCardImgHeader.style = componentsCardsCss;
export { HSCardImgHeader as hs_card_img_header };
