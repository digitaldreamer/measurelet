define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var Output = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this, 'render');

            this.ID = options.ID;
            this.model = options.model;
            this.model.on('change', this.render, this);
        },
        events: {
            'click': '_handleClick'
        },
        render: function() {
            this.$('#'+this.ID+'-css').html(this.model.get('css'));
            this.$('#'+this.ID+'-json').html(this.model.get('json'));
        },
        _handleClick: function(event) {
            event.preventDefault();
            event.stopPropagation();
        }
    });

    return Output;
});

