define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var Output = Backbone.Model.extend({
        defaults: {
            json: '',
            css: ''
        },
        reset: function() {
            this.set({css: '', json: ''});
        }
    });

    return Output;
});
