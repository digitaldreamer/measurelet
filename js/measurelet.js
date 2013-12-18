/*
 * Measurelet Bookmarklet
 */
requirejs.config({
    paths: {
        'backbone': 'libs/backbone',
        'bootstrap': 'libs/bootstrap',
        'jquery': 'libs/jquery-1.10.2.min',
        'underscore': 'libs/underscore',
        'text': 'libs/text'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            deps: ['jquery'],
            exports: '_'
        }
    }
});

require(['jquery', 'underscore', 'backbone', 'views/bookmarklet'], function($, _, Backbone, Bookmarklet) {
    (function() {
        window.Measurelet = window.Measurelet || new Measurelet();
        window.Measurelet.init();

        function Measurelet() {
            var ID = 'bookmarklet-measurelet';
            var STYLESHEET = 'http://pypi.tspxyz.com/bookmarklets/measurelet/measurelet.min.css';

            var sourcePosition = {x: 0, y:0},
                targetPosition = {x: 0, y:0};

            var $dragging,

                $markerTarget,
                $markerSource;

            this.init = function() {
                window.Measurelet.views = {};
                window.Measurelet.models = {};

                $('head').append('<link rel="stylesheet" type="text/css" href="' + STYLESHEET + '">');
                $dragging = $('body');

                var div = $('<div/>').attr('id', ID);
                $('body').prepend(div);
                window.Measurelet.bookmarklet = new Bookmarklet({el: $('#' + ID), ID: ID});

                setTimeout(show, 100);
            }

            this.show = show;
            this.hide = hide;

            function show() {
                window.Measurelet.bookmarklet.show();
            }

            function hide() {
                window.Measurelet.bookmarklet.hide();
            }
        }
    })();
});

