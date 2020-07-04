/**
 * Draganddrop Module
 */
(function ($) {
    var Draganddrop = function (el) {
        this.$el = el;
        this.dragSrcEl = null;
        this.init();
    };
    Draganddrop.prototype.init = function () {
        this.dragStartHandler();
        this.dragOverHandler();
        this.dragEnterHandler();
        this.dragLeaveHandler();
        this.dropHandler();
        this.dragEndHandler();
    };
    Draganddrop.prototype.dragStartHandler = function () {
        var _this = this;
        _this.$el.on('dragstart', function (e) {
            var dt = e.originalEvent.dataTransfer, $this = $(this);
            $this.addClass('drag');
            ;
            _this.dragSrcEl = this;
            dt.effectAllowed = 'move';
            // dt.setData('text/html', $this.html());
        });
    };
    Draganddrop.prototype.dragOverHandler = function () {
        this.$el.on('dragover', function (e) {
            e.preventDefault();
            e.originalEvent.dataTransfer.dropEffect = 'move';
        });
    };
    Draganddrop.prototype.dragEnterHandler = function () {
        var _this = this;
        _this.$el.on('dragenter', function (e) {
            if (_this.dragSrcEl !== this) {
                $(this).addClass('over');
            }
        });
    };
    Draganddrop.prototype.dragLeaveHandler = function () {
        this.$el.on('dragleave', function (e) {
            $(this).removeClass('over');
        });
    };
    Draganddrop.prototype.dropHandler = function () {
        var _this = this;
        _this.$el.on('drop', function (e) {
            if (_this.dragSrcEl !== this) {
                var dragSrcClone = $(_this.dragSrcEl).clone(true).removeClass('drag over'), dragDestClone = $(this).clone(true).removeClass('drag over'), $dragSrcEl = $(_this.dragSrcEl), $this = $(this);
                $dragSrcEl.replaceWith(dragDestClone);
                $this.replaceWith(dragSrcClone);
            }
            e.stopPropagation();
        });
    };
    Draganddrop.prototype.dragEndHandler = function () {
        var _this = this;
        _this.$el.on('dragend', function (e) {
            _this.$el.removeClass('over drag');
        });
    };
    $.fn.draganddrop = function () {
        var data = this.data('draganddrop');
        if (!data)
            this.data('draganddrop', new Draganddrop(this));
        return this;
    };
})(jQuery);
//initialize
$(function () {
    $('.columns > .column').draganddrop();
});
