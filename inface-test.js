
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
	sayHi( ){
		return false;
	}
}

let hi = new Hi( "yeah" );
let hello = inface( hi, Hello );

assert.equal( hello instanceof Hi, true, "should be true" );

assert.equal( hello instanceof Hello, true, "should be true" );

assert.equal( hello.sayHello( ), "hello", "should be equal" );

assert.equal( hello.value, "yeah", "should be equal" );

assert.equal( hello.sayHi( ) === hi, true, "should be equal" );

class Orange {
	constructor( ){
		this.color = "orange";
	}
	getColor( ){
		return "orange";
	}
}

class Apple extends Orange {
	constructor( ){
		super( );

		this.color = "red";
	}
	getColor( ){
		return this.color;
	}
}

let apple = new Apple( );
orange = inface( apple, "Orange" );

assert.equal( orange instanceof Apple, true, "should be true" );

assert.equal( orange.getColor( ), "orange", "should be equal" );

console.log( "ok" );
