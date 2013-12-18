define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var Marker = Backbone.Model.extend({
        defaults: {
            x: 0,
            y: 0
        },
        reset: function() {
            this.set({x: 0, y: 0});
        }
    });

    return Marker;
});
