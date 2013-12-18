.PHONY: build css js

build: css js

css: dir
	lessc css/measurelet.less > build/measurelet.css
	java -jar utils/yuicompressor-2.4.8.jar build/measurelet.css -o build/measurelet.min.css
	rm build/measurelet.css

js: dir
	node js/libs/r.js -o js/build.js
	cat js/libs/require.js build/measurelet-build.js > build/measurelet-combined.js
	java -jar utils/yuicompressor-2.4.8.jar build/measurelet-combined.js -o build/measurelet.min.js
	rm build/measurelet-build.js build/measurelet-combined.js

debug: dir
	lessc css/measurelet.less > build/measurelet.min.css
	node js/libs/r.js -o js/build.js optimize=none
	cat js/libs/require.js build/measurelet-build.js > build/measurelet.min.js
	rm build/measurelet-build.js

dir:
	mkdir -p build

clean:
	rm -rf build
