define(['jquery', 'underscore', 'backbone', 'text!templates/controls.html'], function($, _, Backbone, template) {
    var HideButton = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this, '_handleClick');
            this.controls = options.controls;
        },
        events: {
            'click': '_handleClick'
        },
        _handleClick: function(event) {
            event.preventDefault();
            window.Measurelet.hide();
        }
    });

    var ShowButton = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this, '_handleClick');
            this.controls = options.controls;
        },
        events: {
            'click': '_handleClick'
        },
        _handleClick: function(event) {
            event.preventDefault();
            window.Measurelet.show();
        }
    });

    var Controls = Backbone.View.extend({
        initialize: function(options) {
            this.ID = options.ID;
            this.render();
        },
        events: {
            'click': '_handleClick'
        },
        render: function() {
            var that = this;
            var compiled = _.template(template);
            this.$el.html(compiled({ID: this.ID}));

            var showButton = new ShowButton({el: $('#'+this.ID+'-show'), controls: this});
            var hideButton = new HideButton({el: $('#'+this.ID+'-hide'), controls: this});
        },
        _handleClick: function(event) {
            event.preventDefault();
            event.stopPropagation();
        },
        reset: function() {
            this.$('li.active').removeClass('active');
        },
        show: function() {
            this.reset();
            this.$('#'+this.ID+'-show').parent('li').addClass('active');
        },
        hide: function() {
            this.reset();
            this.$('#'+this.ID+'-hide').parent('li').addClass('active');
        }
    });

    return Controls;
});
