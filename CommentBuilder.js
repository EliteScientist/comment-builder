/*
	The MIT License (MIT)

	Copyright (c) 2015 Michael Rochelle (@EliteScientist)

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

	 https://github.com/EliteScientist/comment-builder/
*/


function CommentBuilder()
{
	this.blockStart	= "/**";
	this.linePrefix	= " * ";
	this.blockEnd	= " **/";
	this.lf			= "\n";
	this._blocks	= [];
	
	this.newBlock();
}

CommentBuilder.prototype	= Object.create(Object.prototype,
{
	block:
	{
		get: function ()
		{
			return this._block;
		},
		enumerable: false,
		configurable: false
	},
	
	blocks:
	{
		get: function ()
		{
			return this._blocks;
		},
		enumerable: false,
		configurable: false
	},
	
	/**
	 * Write Line
	 * 
	 * Writes a line to the current comment block
	 * 
	 * @param value Line to write to the comment block
	 */
	writeLine:
	{
		value: function(value)
		{
			if (value == null)
				value = ""; // Empty Line
			
			this.block.push(value);
		},
		enumerable: true,
		configurable: false,
		writable: false
	},
	
	/**
	 * New Block
	 * 
	 * Creates a new comment block
	 */
	newBlock:
	{
		value: function ()
		{
			this._block	= [];
			this.blocks.push(this.block);
		},
		enumerable: true,
		configurable: false,
		writable: false
	},
	
	/**
	 * Write Object
	 * 
	 * Write Object to comment block.
	 * 
	 * @param item Object to serialize into a comment block
	 * @param newBlock true to construct a new comment block, false to use current block
	 */
	writeObject:
	{
		value: function (item, newBlock)
		{
			if (newBlock === true)
				this.newBlock();
			
			for (var propertyName in item)
			{
				var value	= item[propertyName];
				
				if (value instanceof Object)
					value	= JSON.stringify(value);
				
				this.block.push("@" + propertyName + " " + value);
			}
		},
		enumerable: true,
		configurable: false,
		writable: false
	},
	
	toString:
	{
		value: function()
		{
			var result	= "";
			
			// Construct Blocks
			this.blocks.forEach(function (block)
			{
				if (block.length < 1)
					return;
				
				// Block Start
				result  += this.lf;
				result	+= this.blockStart + this.lf;			
				
				// Block Body
				result	+= block.map(function (part) 
				{ 
					return this.linePrefix + part;
				}, this).join(this.lf);
				
				// Block End
				result	+= this.lf + this.blockEnd;
				result	+= this.lf;
			}, this);
						
			return result;
		},
		enumerable: true,
		configurable: false,
		writable: false
	}
	
});

module.exports = CommentBuilder;