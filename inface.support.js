"use strict";

/*;
              	@module-license:
              		The MIT License (MIT)
              		@mit-license
              
              		Copyright (@c) 2017 Richeve Siodina Bebedor
              		@email: richeve.bebedor@gmail.com
              
              		Permission is hereby granted, free of charge, to any person obtaining a copy
              		of this software and associated documentation files (the "Software"), to deal
              		in the Software without restriction, including without limitation the rights
              		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
              		copies of the Software, and to permit persons to whom the Software is
              		furnished to do so, subject to the following conditions:
              
              		The above copyright notice and this permission notice shall be included in all
              		copies or substantial portions of the Software.
              
              		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
              		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
              		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
              		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
              		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
              		SOFTWARE.
              	@end-module-license
              
              	@module-configuration:
              		{
              			"package": "inface",
              			"path": "inface/inface.js",
              			"file": "inface.js",
              			"module": "inface",
              			"author": "Richeve S. Bebedor",
              			"eMail": "richeve.bebedor@gmail.com",
              			"repository": "https://github.com/volkovasystems/inface.git",
              			"test": "inface-test.js",
              			"global": true
              		}
              	@end-module-configuration
              
              	@module-documentation:
              		Class entity interface.
              	@end-module-documentation
              
              	@include:
              		{
              			"diatom": "diatom",
              			"falzy": "falzy",
              			"heredito": "heredito",
              			"methon": "methon",
              			"portel": "portel",
              			"protype": "protype",
              			"transpher": "transpher",
              			"transym": "transym",
              			"vound": "vound",
              			"wauker": "wauker"
              		}
              	@end-include
              */

var diatom = require("diatom");
var falzy = require("falzy");
var heredito = require("heredito");
var methon = require("methon");
var portel = require("portel");
var protype = require("protype");
var transpher = require("transpher");
var transym = require("transym");
var vound = require("vound");
var wauker = require("wauker");

var inface = function inface(entity, blueprint) {
	/*;
                                                 	@meta-configuration:
                                                 		{
                                                 			"entity:required": "object",
                                                 			"blueprint:required": [
                                                 				"function",
                                                 				"string"
                                                 			]
                                                 		}
                                                 	@end-meta-configuration
                                                 */

	if (falzy(entity)) {
		throw new Error("invalid entity");
	}

	if (falzy(blueprint) || !protype(blueprint, FUNCTION + STRING)) {
		throw new Error("invalid blueprint");
	}

	var instance = portel(entity);

	if (protype(blueprint, STRING)) {
		blueprint = wauker(instance).
		filter(function (constructor) {return constructor.name === blueprint;}).
		pop();
	}

	var delegate = heredito(instance.constructor, blueprint)();

	transpher(instance, delegate);
	transym(instance, delegate);

	return methon(delegate).reduce(function (delegate, method) {
		delegate[method] = vound(delegate[method], entity);

		return delegate;
	}, delegate);
};

module.exports = inface;

//# sourceMappingURL=inface.support.js.map