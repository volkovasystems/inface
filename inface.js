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
			"fname": "fname",
			"heredito": "heredito",
			"kein": "kein",
			"methon": "methon",
			"portel": "portel",
			"protype": "protype",
			"pyp": "pyp",
			"transpher": "transpher",
			"transym": "transym",
			"vound": "vound",
			"wauker": "wauker"
		}
	@end-include
*/

const diatom = require( "diatom" );
const falzy = require( "falzy" );
const fname = require( "fname" );
const heredito = require( "heredito" );
const kein = require( "kein" );
const methon = require( "methon" );
const portel = require( "portel" );
const protype = require( "protype" );
const pyp = require( "pyp" );
const transpher = require( "transpher" );
const transym = require( "transym" );
const vound = require( "vound" );
const wauker = require( "wauker" );

const inface = function inface( entity, blueprint ){
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

	if( falzy( entity ) ){
		throw new Error( "invalid entity" );
	}

	if( falzy( blueprint ) || !protype( blueprint, FUNCTION + STRING ) ){
		throw new Error( "invalid blueprint" );
	}

	let instance = portel( entity );

	if( protype( blueprint, STRING ) ){
		blueprint = pyp( wauker( instance ), ( constructor ) => ( fname( constructor ) == blueprint ) );
	}

	let delegate = heredito( instance.constructor, blueprint )( );

	transpher( instance, delegate );
	transym( instance, delegate );

	return methon( delegate ).reduce( ( delegate, method ) => {
		/*;
			@note:
				It should use the original blueprint prototype method
					if the method exists because that is the purpose of this function.
			@end-note
		*/
		if( kein( method, blueprint.prototype ) ){
			delegate[ method ] = vound( blueprint.prototype[ method ], entity );

		}else{
			delegate[ method ] = vound( delegate[ method ], entity );
		}

		return delegate;
	}, delegate );
};

module.exports = inface;
