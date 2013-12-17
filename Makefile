.PHONY: build

build:
	mkdir -p build
	lessc css/measurelet.less > build/measurelet.css
	java -jar utils/yuicompressor-2.4.8.jar build/measurelet.css -o build/measurelet.min.css
	cp js/measurelet.js build/measurelet.js
	java -jar utils/yuicompressor-2.4.8.jar build/measurelet.js -o build/measurelet.min.js

clean:
	rm -rf build
