define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var Content = Backbone.View.extend({
        clear: function() {
            this.$el.html('');
        }
    });

    return Content;
});
