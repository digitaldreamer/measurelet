/*
 * Measurelet Bookmarklet
 *
 * shift click to place source
 * click to place target
 * once shown click hide to get access to the original web page
 * click show to reset the markers back to (0, 0)
 * the source marker defaults to (0, 0)
 *
 * javascript:(function(){if(window.Measurelet!==undefined){window.Measurelet.init();}else{document.body.appendChild(document.createElement('script')).src='http://pypi.tspxyz.com/bookmarklets/measurelet/measurelet.min.js';}})();
 *
 * <a href="javascript:(function(){if(window.Measurelet!==undefined){window.Measurelet.init();}else{document.body.appendChild(document.createElement('script')).src='http://pypi.tspxyz.com/bookmarklets/measurelet/measurelet.min.js';}})();">Measurelet</a>
 */

(function(){
    var v = "1.10.2";
    var console = window.console;

    // init scripts
    if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
        var done = false;
        var script = document.createElement("script");
        script.src = "https://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
        script.onload = script.onreadystatechange = function(){
            if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                done = true;

                window.Measurelet= new Measurelet();
                window.Measurelet.init();
            }
        };
        document.getElementsByTagName("head")[0].appendChild(script);
    } else {
        window.Measurelet = new Measurelet();
        window.Measurelet.init();
    }

    // TODO: perhaps refactor into Backbone
    function Measurelet() {
        var $ = jQuery;
        var ID = 'bookmarklet-measurelet';
        var sourcePosition = {x: 0, y:0},
            targetPosition = {x: 0, y:0};
        var $body,
            $bookmarklet,
            $controls,
            $content,
            $output,
            $dragging,

            $markerTarget,
            $markerSource;

        this.init = function() {
            $body = $('body');
            $dragging = $body;
            $('head').append('<link rel="stylesheet" type="text/css" href="http://pypi.tspxyz.com/bookmarklets/measurelet/measurelet.min.css">');
            html();
            events();
            text();

            setTimeout(show, 100);
        }

        this.show = show;
        this.hide = hide;
        this.reset = reset;

        function show() {
            $controls.find('li.active').removeClass('active');
            $controls.find('#bookmarklet-show').parent('li').addClass('active');
            $bookmarklet.addClass('active');
            $content.stop(true, true).fadeIn();

            reset();
        }

        function hide() {
            $controls.find('li.active').removeClass('active');
            $controls.find('#bookmarklet-hide').parent('li').addClass('active');

            $content.stop(true, true).fadeOut(function() {
                $bookmarklet.removeClass('active');
            });
        }

        function reset() {
            sourcePosition.x = sourcePosition.y = 0;
            targetPosition.x = targetPosition.y = 0;
            $markerTarget.hide();
            $markerSource.hide();
            text();
        }

        function text() {
            var deltaX = targetPosition.x - sourcePosition.x;
            var deltaY = targetPosition.y - sourcePosition.y;
            $output.find('#bookmarklet-css').html('left: ' + deltaX + 'px;<br>' + 'top: ' + deltaY + 'px;<br>');
            $output.find('#bookmarklet-json').html('"left": ' + deltaX + ',<br>' + '"top": ' + deltaY + ',<br>');
        }

        function startDrag(event, $el, callback) {
            var position = $el.position();

            $el.data('dragging', true);
            $el.data('callback', callback);
            $el.data('offset', {
                x: event.clientX - position.left,
                y: event.clientY - position.top
            });

            $dragging = $el;
        }

        function stopDrag(event, $el) {
            $el.data('dragging', false);
        }

        function events() {
            $bookmarklet.click(function(event) {
                if (event.shiftKey) {
                    sourcePosition.x = event.clientX;
                    sourcePosition.y = event.clientY;

                    $markerSource.css({
                        'top': sourcePosition.y + 'px',
                        'left': sourcePosition.x + 'px'
                    });
                    $markerSource.show();
                } else {
                    targetPosition.x = event.clientX;
                    targetPosition.y = event.clientY;

                    $markerTarget.css({
                        'top': targetPosition.y + 'px',
                        'left': targetPosition.x + 'px'
                    });
                    $markerTarget.show();
                }

                text();
            });

            $('#bookmarklet-hide').click(function(event) {
                event.preventDefault();
                event.stopPropagation();
                hide();
            });

            $markerTarget.click(function(event) {
                event.preventDefault();
                event.stopPropagation();
            });

            $markerTarget.mousedown(function(event) {
                event.preventDefault();
                event.stopPropagation();

                startDrag(event, $markerTarget, markerTargetUpdate);
            });

            $markerTarget.mouseup(function(event) {
                event.preventDefault();
                event.stopPropagation();
                stopDrag(event, $markerTarget);
                text();
            });

            $markerSource.click(function(event) {
                event.preventDefault();
                event.stopPropagation();
            });

            $markerSource.mousedown(function(event) {
                event.preventDefault();
                event.stopPropagation();

                startDrag(event, $markerSource, markerSourceUpdate);
            });

            $markerSource.mouseup(function(event) {
                event.preventDefault();
                event.stopPropagation();
                stopDrag(event, $markerSource);
                text();
            });

            $bookmarklet.mousemove(function(event) {
                var offset = $dragging.data('offset');
                var callback = $dragging.data('callback');

                if ($dragging.data('dragging')) {
                    $dragging.css({
                        'top': (event.clientY - offset.y) + 'px',
                        'left': (event.clientX - offset.x) + 'px'
                    });

                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            });

            $('#bookmarklet-show').click(function(event) {
                event.preventDefault();
                event.stopPropagation();
                show();
            });

            $output.click(function(event) {
                event.preventDefault();
                event.stopPropagation();
            });

            $output.find('.selectable').click(function(event) {
                this.select();
            });
        }

        function markerTargetUpdate() {
            var position = $markerTarget.position();
            targetPosition.x = position.left;
            targetPosition.y = position.top;
            text();
        }

        function markerSourceUpdate() {
            var position = $markerSource.position();
            sourcePosition.x = position.left;
            sourcePosition.y = position.top;
            text();
        }

        function html() {
            // TODO: this can be templatized
            $body.prepend('<div id="' + ID + '">' +
                    // controls
                    '<ul id="bookmarklet-controls"><li><a id="bookmarklet-show" href="#">Show</a></li><li><a id="bookmarklet-hide" href="#">Hide</a></li></ul>' +

                    // contents
                    '<div id="bookmarklet-contents">' +
                        // markers
                        '<div id="bookmarklet-marker-source" class="bookmarklet-marker"><div></div></div>' +
                        '<div id="bookmarklet-marker-target" class="bookmarklet-marker"><div></div></div>' +
                        '<div id="bookmarklet-output">' +
                            '<div id="bookmarklet-css"></div>' +
                            '<div id="bookmarklet-json"></div>' +
                        '</div>' +
                    '</div>' +

                    '<div>');

            $bookmarklet = $('#' + ID);
            $controls = $('#bookmarklet-controls');
            $content = $('#bookmarklet-contents');
            $output = $('#bookmarklet-output');
            $markerTarget = $('#bookmarklet-marker-target');
            $markerSource = $('#bookmarklet-marker-source');
        }
    }
})();
