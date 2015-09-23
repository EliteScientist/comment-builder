# Javascript Comment Block Builder

This library allows you to build comment blocks. 

## Install

> use "npm install comment-builder" to download and install

## Examples
``` javascript
var CommentBuilder = require("comment-builder");

var builder	= new CommentBuilder();

builder.writeLine("Testing");
var comment = builder.toString()

--- Outputs
/**
 * Testing
 **/


var builder	= new CommentBuilder();

var block = {};
block.param   = "input {String} Input Parameter"; 
block.see     = "http://www.google.com";
block.example = "Test example";

builder.writeLine("My Test Example");
builder.writeLine(); // Empty Line
builder.writeObject(block);

builder.newBlock();
builder.writeLine("Test Block");

var comment = builder.toString();

--- Outputs

/**
 * My Test Example
 *
 * @param input {String} Input Parameter
 * @see http://www.google.com
 * @example Test Example
 **/

/**
 * Test Block
 **/

```