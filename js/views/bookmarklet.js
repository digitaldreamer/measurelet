define(['jquery', 'underscore', 'backbone',
        'models/output',
        'models/marker',
        'views/measurelet-views',
        'text!templates/measurelet.html'], function($, _, Backbone, Output, Marker, views, template) {
    var Bookmarklet = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this, 'show');
            _.bindAll(this, 'hide');
            _.bindAll(this, 'startDrag');
            _.bindAll(this, 'stopDrag');
            _.bindAll(this, '_handleMouseMove');
            _.bindAll(this, '_handleClick');

            this.dragging = undefined;
            this.ID = options.ID;
            this.render();
        },
        events: {
            'click': '_handleClick',
            'mousemove': '_handleMouseMove'
        },
        render: function() {
            var compiled = _.template(template);
            this.$el.html(compiled({ID: this.ID}));

            // models
            window.Measurelet.models.markerSource = new Marker();
            window.Measurelet.models.markerTarget = new Marker();
            window.Measurelet.models.output = new Output();

            // views
            window.Measurelet.views.controls = new views.Controls({
                el: $('#' + this.ID + '-controls'),
                ID: this.ID
            });

            window.Measurelet.views.content = new views.Content({
                el: $('#' + this.ID + '-content'),
                ID: this.ID
            });

            window.Measurelet.views.output = new views.Output({
                el: $('#' + this.ID + '-output'),
                ID: this.ID,
                model: window.Measurelet.models.output
            });

            var markers = new views.Markers({
                el: $('#' + this.ID + '-content'),
                ID: this.ID,
                source: window.Measurelet.models.markerSource,
                target: window.Measurelet.models.markerTarget
            });

        },
        _handleClick: function(event) {
            // TODO: generalize to different mode types
            if (event.shiftKey) {
                window.Measurelet.models.markerSource.set({
                    x: event.clientX,
                    y: event.clientY
                });
            } else {
                window.Measurelet.models.markerTarget.set({
                    x: event.clientX,
                    y: event.clientY
                });
            }
        },
        _handleMouseMove: function(event) {
            if (typeof this.dragging === 'undefined') { return; }
            var offset = this.dragging.$el.data('offset');

            this.dragging.model.set({
                y: event.clientY - offset.y,
                x: event.clientX - offset.x
            });
        },
        show: function() {
            window.Measurelet.models.markerSource.reset();
            window.Measurelet.models.markerTarget.reset();

            this.$el.addClass('active');
            this.$('#'+this.ID+'-container').stop(true, true).fadeIn();
            window.Measurelet.views.controls.show();
        },
        hide: function() {
            var that = this;

            this.$('#'+this.ID+'-container').stop(true, true).fadeOut(function() {
                that.$el.removeClass('active');
            });

            window.Measurelet.views.controls.hide();
        },
        startDrag: function(event, dragging) {
            var position = dragging.$el.position();

            dragging.$el.data('offset', {
                x: event.clientX - position.left,
                y: event.clientY - position.top
            });

            this.dragging = dragging;
        },
        stopDrag: function(event) {
            this.dragging = undefined;
        }
    });

    return Bookmarklet;
});
