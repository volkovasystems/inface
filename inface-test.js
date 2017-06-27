
const assert = require( "assert" );
const diatom = require( "diatom" );
const heredito = require( "heredito" );
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

assert.equal( hello.sayHi( ) === hello, true, "should be equal" );

class Hola {
	constructor( ){ }
	sayHola( ){
		return "hola";
	}
	sayHey( ){
		return this;
	}
}

class Hey extends Hola {
	constructor( value ){
		super( );

		this.value = value;
	}
	sayHey( ){
		return false;
	}
}

let hey = new Hey( "yeah" );
let hola = inface( hey, Hola );

assert.equal( hola instanceof Hey, true, "should be true" );

assert.equal( hola instanceof Hola, true, "should be true" );

assert.equal( hola.sayHola( ), "hola", "should be equal" );

assert.equal( hola.value, "yeah", "should be equal" );

assert.equal( hola.sayHey( ) === hey, true, "should be equal" );

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


let Mango = diatom( "Mango" );
Mango.prototype.getFruit = function getFruit( ){ return "mango"; };

let Avocado = diatom( "Avocado" );
Avocado.prototype.getFruit = function getFruit( ){ return "avocado"; };

Avocado = heredito( Avocado, Mango );

assert.equal( inface( new Avocado( ), "Mango" ).getFruit( ) == "mango", true, "should be true" );

console.log( "ok" );
