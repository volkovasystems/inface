
const assert = require( "assert" );
const inface = require( "./inface.js" );

class Hello {
	constructor( ){ }
	sayHello( ){
		return "hello";
	}
	sayHi( ){
		return this;
	}
}

class Hi {
	constructor( value ){
		this.value = value;
	}
}

let hi = new Hi( "yeah" );
let hello = inface( hi, Hello );

assert.equal( hello instanceof Hi, true, "should be true" );

assert.equal( hello instanceof Hello, true, "should be true" );

assert.equal( hello.sayHello( ), "hello", "should be equal" );

assert.equal( hello.value, "yeah", "should be equal" );

assert.equal( hello.sayHi( ) === hi, true, "should be equal" );

console.log( "ok" );
