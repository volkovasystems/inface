
const assert = require( "assert" );
const inface = require( "./inface.js" );

class Hello {
	constructor( ){ }
	sayHello( ){
		return "hello";
	}
}

class Hi {
	constructor( ){ }
}

let hello = inface( new Hi( ), Hello );

assert.equal( hello instanceof Hi, true, "should be true" );

assert.equal( hello instanceof Hello, true, "should be true" );

assert.equal( hello.sayHello( ), "hello", "should be equal" );

console.log( "ok" );
