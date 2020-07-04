import { r as registerInstance, h } from './index-57471f3a.js';
var componentsTimelinesCss = ".hs-timeline{margin:0.55em 0 0;padding:0}.hs-timeline .hs-timeline-item{position:relative;padding:0 0 1.5em;list-style:none}.hs-timeline .hs-timeline-item::before{position:absolute;top:0;left:0.25em;height:100%;margin-left:-1px;border-left:1px solid #85859a;content:\"\"}.hs-timeline .hs-timeline-item--last::before,.hs-timeline .hs-timeline-item--loading::before{border-left-style:none;content:\"\"}.hs-timeline .hs-timeline-item::after{position:absolute;top:0;width:0.5em;height:0.5em;background-color:#74748c;border-radius:100%;-webkit-box-shadow:0 0 0 4px #fff;box-shadow:0 0 0 4px #fff;content:\"\"}.hs-timeline .hs-timeline-item__body{position:relative;top:-0.55em;margin:0 0 0 1em}.hs-timeline .hs-timeline-item.hs-timeline-item--brand::after{background-color:#2c3e50;content:\"\"}.hs-timeline .hs-timeline-item.hs-timeline-item--info::after{background-color:#4267ff;content:\"\"}.hs-timeline .hs-timeline-item.hs-timeline-item--warning::after{background-color:#ffa500;content:\"\"}.hs-timeline .hs-timeline-item.hs-timeline-item--success::after{background-color:#088a05;content:\"\"}.hs-timeline .hs-timeline-item.hs-timeline-item--error::after{background-color:#ee0202;content:\"\"}.hs-timeline.hs-timeline--alternate .hs-timeline-item::before,.hs-timeline.hs-timeline--alternate .hs-timeline-item::after{left:50%;content:\"\"}.hs-timeline.hs-timeline--alternate .hs-timeline-item::after{margin:0 0 0 -0.25em}.hs-timeline.hs-timeline--alternate .hs-timeline-item__body{left:50%;width:50%}.hs-timeline.hs-timeline--alternate .hs-timeline-item--left .hs-timeline-item__body{left:0;margin:0 0 0 -1em;text-align:right}.hs-timeline.hs-timeline--loading .hs-timeline-item--last::before{border-left-style:dashed;content:\"\"}.hs-timeline.hs-timeline--loading .hs-timeline-item--loading::after{background-color:transparent;border:2px solid #85859a}.hs-timeline.hs-timeline--loading .hs-timeline-item--loading .hs-timeline-item__body{color:#74748c}";
var TimelineItem = /** @class */ (function () {
    function TimelineItem(hostRef) {
        registerInstance(this, hostRef);
    }
    TimelineItem.prototype.render = function () {
        var typeClass = this.type ? "hs-timeline-item--" + this.type : '';
        var lastClass = this.last ? "hs-timeline-item--last" : '';
        var leftClass = this.left ? "hs-timeline-item--left" : '';
        var loadingClass = this.loading && !this.last ? "hs-timeline-item--loading" : '';
        return (h("li", { class: "hs-timeline-item " + typeClass + " " + leftClass + " " + lastClass + " " + loadingClass }, h("div", { class: "hs-timeline-item__body" }, h("slot", null))));
    };
    return TimelineItem;
}());
TimelineItem.style = componentsTimelinesCss;
export { TimelineItem as hs_timeline_item };
