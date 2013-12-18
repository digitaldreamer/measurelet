define(['jquery', 'underscore', 'backbone', 'text!templates/markers.html'], function($, _, Backbone, template) {
    var Marker = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this, 'render');
            _.bindAll(this, '_handleMouseDown');
            _.bindAll(this, '_handleMouseUp');

            this.ID = options.ID;
            this.model = options.model;
            this.model.on('change', this.render);
        },
        events: {
            'click': function(event) {
                event.preventDefault();
                event.stopPropagation();
            },
            'mousedown': '_handleMouseDown',
            'mouseup': '_handleMouseUp',
        },
        render: function() {
            var attr = this.model.attributes;

            if (attr.x === 0 && attr.y === 0) {
                this.$el.hide();
            } else {
                this.$el.show();
            }

            this.$el.css({'top': attr.y + 'px', 'left': attr.x + 'px'});
        },
        _handleMouseDown: function(event) {
            event.preventDefault();
            event.stopPropagation();
            window.Measurelet.bookmarklet.startDrag(event, this);
        },
        _handleMouseUp: function(event) {
            event.preventDefault();
            event.stopPropagation();
            window.Measurelet.bookmarklet.stopDrag(event);
        }
    });

    var Markers = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this, 'update');

            this.ID = options.ID;
            this.source = options.source;
            this.target = options.target;
            this.render();

            this.source.on('change', this.update);
            this.target.on('change', this.update);

            var sourceView = new Marker({el: $('#'+this.ID+'-marker-source'),ID: this.ID, model: this.source});
            var targetView = new Marker({el: $('#'+this.ID+'-marker-target'),ID: this.ID, model: this.target});
        },
        render: function() {
            var compiled = _.template(template);
            this.$el.html(compiled({ID: this.ID}));
            this.update();
        },
        update: function() {
            var deltaX = this.target.get('x') - this.source.get('x');
            var deltaY = this.target.get('y') - this.source.get('y');
            var css = 'left: ' + deltaX + 'px;<br>' + 'top: ' + deltaY + 'px;<br>';
            var json = '"left": ' + deltaX + ',<br>' + '"top": ' + deltaY + ',<br>';

            window.Measurelet.models.output.set({css: css, json: json});
        }
    });

    return Markers;
});
