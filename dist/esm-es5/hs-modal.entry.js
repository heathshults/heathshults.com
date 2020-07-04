var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, c as createEvent, h, g as getElement } from './index-57471f3a.js';
var objectsModalsCss = ".hs-modal[role=dialog]{position:fixed;top:50%;left:50%;z-index:500;display:block;width:75%;overflow:hidden;background-color:#fff;border:0 solid #74748c;border-radius:4px;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);visibility:hidden;opacity:0}.hs-modal[role=dialog]>.hs-card{background-color:transparent;-webkit-box-shadow:none;box-shadow:none}.hs-modal[role=dialog]>.hs-card .hs-card__body{position:relative}.hs-modal[role=dialog].hs-modal--ghost{color:#fff;background-color:transparent}.hs-modal[role=dialog].hs-modal--ghost .hs-heading{color:#fff}.hs-modal[role=dialog].hs-modal--full{top:1em;left:1em;width:calc(100% - 2em);height:calc(100% - 2em);-webkit-transform:none;transform:none}.hs-modal[role=dialog].hs-modal--full .hs-card__body{position:absolute;top:3.5em;bottom:4em;width:100%;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}.hs-modal[role=dialog].hs-modal--full .hs-card__footer{position:absolute;bottom:0;width:100%}.hs-modal[role=dialog].hs-modal--visible{visibility:visible;opacity:1}.hs-button--close{top:0.5em}";
var Modal = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this.ghost = false;
        this.full = false;
        this.open = false;
        this.dismissible = false;
        this._isOpen = false;
        this.onClose = createEvent(this, "close", 7);
    }
    class_1.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._isOpen = false;
                this.onClose.emit();
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.show = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._isOpen = true;
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.isOpen = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._isOpen];
            });
        });
    };
    class_1.prototype.componentWillLoad = function () {
        this._isOpen = this.open;
    };
    class_1.prototype.dismiss = function () {
        if (this.dismissible)
            this.close();
    };
    class_1.prototype.render = function () {
        var _this = this;
        var ghostClass = this.ghost ? "hs-modal--ghost" : '';
        var fullClass = this.full ? "hs-modal--full" : '';
        var modalIsOpenClass = this._isOpen ? 'hs-modal--visible' : '';
        var overlayIsOpenClass = this._isOpen ? 'hs-overlay--visible' : '';
        return [
            h("div", { "aria-hidden": true, onClick: function () { return _this.dismiss(); }, class: "hs-overlay hs-overlay--fullpage " + overlayIsOpenClass }),
            h("div", { role: "dialog", class: "hs-modal " + ghostClass + " " + fullClass + " " + modalIsOpenClass }, this.dismissible && (h("button", { type: "button", class: "hs-button hs-button--close", onClick: function () { return _this.close(); } }, "\u00D7")), h("slot", null))
        ];
    };
    Object.defineProperty(class_1.prototype, "elem", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
Modal.style = objectsModalsCss;
export { Modal as hs_modal };
