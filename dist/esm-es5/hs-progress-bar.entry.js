import { r as registerInstance, c as createEvent, h } from './index-57471f3a.js';
var componentsProgressCss = ".hs-progress{display:block;overflow:hidden;color:#fff;text-align:center;background-color:#f2f2f4;border:0;border-radius:4px}.hs-progress.hs-progress--rounded{border-radius:30em}.hs-progress .hs-progress__bar[role=progressbar]{color:#fff;background-color:#74748c;display:block;float:left;height:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;border-radius:0}.hs-progress .hs-progress__bar[role=progressbar]::after{color:transparent !important;content:\"-\"}.hs-progress .hs-progress__bar[role=progressbar].hs-progress__bar--brand{color:#fff;background-color:#2c3e50}.hs-progress .hs-progress__bar[role=progressbar].hs-progress__bar--info{color:#fff;background-color:#4267ff}.hs-progress .hs-progress__bar[role=progressbar].hs-progress__bar--warning{color:#000;background-color:#ffa500}.hs-progress .hs-progress__bar[role=progressbar].hs-progress__bar--success{color:#fff;background-color:#088a05}.hs-progress .hs-progress__bar[role=progressbar].hs-progress__bar--error{color:#fff;background-color:#ee0202}";
var HSProgressBar = /** @class */ (function () {
    function HSProgressBar(hostRef) {
        registerInstance(this, hostRef);
        this.min = 0;
        this.max = 100;
        this.onChange = createEvent(this, "changebar", 7);
    }
    HSProgressBar.prototype.watchValue = function (value, oldValue) {
        this.onChange.emit({ value: value, oldValue: oldValue });
    };
    HSProgressBar.prototype.render = function () {
        var typeClass = this.type ? "hs-progress__bar--" + this.type : '';
        var percentage = ((this.value - this.min) / (this.max - this.min)) * 100;
        return (h("div", { role: "progressbar", "aria-valuenow": this.value, "aria-valuemin": this.min, "aria-valuemax": this.max, style: { width: percentage + "%" }, class: "hs-progress__bar " + typeClass }, h("slot", null)));
    };
    Object.defineProperty(HSProgressBar, "watchers", {
        get: function () {
            return {
                "value": ["watchValue"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return HSProgressBar;
}());
HSProgressBar.style = componentsProgressCss;
export { HSProgressBar as hs_progress_bar };
