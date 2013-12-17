##########
MEASURELET
##########

Bookmarklet to help measure.

Usage
#####

* shift click to place source
* click to place target
* once shown click hide to get access to the original web page
* click show to reset the markers back to (0, 0)
* the source marker defaults to (0, 0)

.. <a href="javascript:(function(){if(window.Measurelet!==undefined){window.Measurelet.init();}else{document.body.appendChild(document.createElement('script')).src='http://pypi.tspxyz.com/bookmarklets/measurelet/measurelet.min.js';}})();">Measurelet</a>

Create a bookmarklet out of the code bellow::

    javascript:(function(){if(window.Measurelet!==undefined){window.Measurelet.init();}else{document.body.appendChild(document.createElement('script')).src='http://pypi.tspxyz.com/bookmarklets/measurelet/measurelet.min.js';}})();

