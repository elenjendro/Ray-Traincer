class cart
{
	constructor(data)
	{
		this.pos = data.pos;
		
		this.lines = new Set();

		switch(data.type)
		{
			case 2:
				this.lines.add( new line
					({
						x: this.pos.x,
						y: this.pos.y + 5*unit.h, 
						w: this.pos.x,
						h:  this.pos.y + 55*unit.h
					}));

				this.lines.add( new line
					({
						x: this.pos.x,
						y: this.pos.y + 5*unit.h, 
						w: this.pos.x + 2*unit.w, 
						h:  this.pos.y
					}));

				this.lines.add( new line
					({
						x: this.pos.x + 2*unit.w,
						y: this.pos.y,
						w: this.pos.x + 8*unit.w, 
						h:  this.pos.y
					}));

				this.lines.add( new line
					({
						x: this.pos.x + 8*unit.w,
						y: this.pos.y,
						w: this.pos.x + 10*unit.w, 
						h: this.pos.y + 5*unit.h 
					}));

				this.lines.add( new line
					({
						x: this.pos.x + 10*unit.w, 
						y: this.pos.y + 5*unit.h,
						w: this.pos.x + 50*unit.w, 
						h: this.pos.y + 5*unit.h
					}));

				this.lines.add( new line
					({
						x: this.pos.x + 50*unit.w, 
						y: this.pos.y + 5*unit.h, 
						w: this.pos.x + 52*unit.w, 
						h: this.pos.y
					}));

				this.lines.add( new line
					({
						x: this.pos.x + 52*unit.w,  
						y: this.pos.y,
						w: this.pos.x + 58*unit.w,  
						h:  this.pos.y
					}));

				this.lines.add( new line
					({
						x: this.pos.x + 58*unit.w, 
						y:  this.pos.y,
						w:  this.pos.x + 60*unit.w, 
						h:  this.pos.y + 5*unit.h
					}));

				this.lines.add( new line
					({
						x: this.pos.x + 60*unit.w, 
						y:  this.pos.y + 5*unit.h,
						w:  this.pos.x + 60*unit.w, 
						h:  this.pos.y + 55*unit.h
					}));

				break;
			case 3:
				this.lines.add( new line
					({
						x: this.pos.x,
						y: this.pos.y + 10*unit.h, 
						w: this.pos.x,
						h:  this.pos.y + 55*unit.h
					}));

				this.lines.add( new line
					({
						x: this.pos.x,
						y: this.pos.y + 10*unit.h, 
						w: this.pos.x - 3*unit.w, 
						h:  this.pos.y + 10*unit.h, 

					}));

				this.lines.add( new line
					({
						x: this.pos.x - 3*unit.w,
						y: this.pos.y + 5*unit.h,
						w: this.pos.x - 3*unit.w,
						h:  this.pos.y + 10*unit.h 
					}));

				this.lines.add( new line
					({
						x: this.pos.x - 3*unit.w,
						y: this.pos.y + 5*unit.h,
						w: this.pos.x,
						h: this.pos.y - 5*unit.h 
					}));

				this.lines.add( new line
					({
						x: this.pos.x,
						y: this.pos.y - 5*unit.h,
						w: this.pos.x + 50*unit.w, 
						h: this.pos.y - 5*unit.h
					}));

				this.lines.add( new line
					({
						x: this.pos.x + 50*unit.w, 
						y: this.pos.y - 5*unit.h,
						w: this.pos.x + 58*unit.w, 
						h: this.pos.y
					}));


				this.lines.add( new line
					({
						x: this.pos.x + 58*unit.w, 
						y:  this.pos.y,
						w:  this.pos.x + 60*unit.w, 
						h:  this.pos.y + 5*unit.h
					}));

				this.lines.add( new line
					({
						x: this.pos.x + 60*unit.w, 
						y:  this.pos.y + 5*unit.h,
						w:  this.pos.x + 60*unit.w, 
						h:  this.pos.y + 55*unit.h
					}));

				break;
		}
	}
	draw()
	{

		this.lines.forEach((value) => {value.draw()});
	}
	fisics()
	{
		this.lines.forEach((value) => 
			{
				value.fisics();
				if(value.pos.x <= -100 * unit.w)
				{
					this.lines.delete(value);
				}
			});
	}

}
