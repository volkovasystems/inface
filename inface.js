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
			"contributors": [
				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>",
				"Vinse Vinalon <vinsevinalon@gmail.com>"
			],
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
			"clazof": "clazof",
			"diatom": "diatom",
			"falzy": "falzy",
			"fnamed": "fnamed",
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

const clazof = require( "clazof" );
const diatom = require( "diatom" );
const falzy = require( "falzy" );
const fnamed = require( "fnamed" );
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
		blueprint = pyp( wauker( instance ), ( constructor ) => fnamed( constructor, blueprint ) );
	}

	let constructor = instance.constructor;
	let delegate = heredito( constructor, blueprint )( );

	transpher( instance, delegate );
	transym( instance, delegate );

	return methon( delegate ).reduce( ( delegate, method ) => {
		/*;
			@note:
				This may pose a serious rare bug in the future.

				The following rules should apply,
				1. If the instance and the blueprint are related
					then the context should be the instance.
				2. If the instance and the blueprint are related
					and the blueprint owns a specific method then it should use
					that method instead of the overriden method with the instance as the context.
				3. If the instance and blueprint are not related
					then it should prioritize the blueprint prototype method followed
					by the instance constructor prototype method then
					other methods will flow to the delegate.
				4. Following rule 3, for method owned by the instance constructor,
					the context should be the instance, else it should be the delegate.
			@end-note
		*/
		if( clazof( entity, blueprint ) ){
			if( kein( method, blueprint.prototype ) ){
				delegate[ method ] = vound( blueprint.prototype[ method ], entity );

			}else{
				delegate[ method ] = vound( entity[ method ], entity );
			}

		}else if( kein( method, blueprint.prototype ) ){
			delegate[ method ] = vound( blueprint.prototype[ method ], delegate );

		}else if( kein( method, constructor.prototype ) ){
			delegate[ method ] = vound( constructor.prototype[ method ], entity );

		}else{
			delegate[ method ] = vound( delegate[ method ], delegate );
		}

		return delegate;
	}, delegate );
};

module.exports = inface;
