class line
{
	constructor(data)
	{
		this.pos = data; // Value of the Position and Size
				   // x: Start Point Horizontaly
				   // y: Vertical Star Point
				   // w: Width
	}
	draw()
	{

		c.strokeStyle = "#ffffff";
		c.moveTo(this.pos.x, this.pos.y);
		c.lineTo(this.pos.w, this.pos.h);
		c.stroke();
	}
	fisics()
	{

		this.pos.x -= 20;
		this.pos.w -= 20;
		
		/*if(this.pos.x <= -200 * unit.w)
		{
			this.pos.w = canvas.width + Math.abs(this.pos.x - this.pos.w) + 10*unit.w;
			this.pos.x = canvas.width + 10*unit.w;
		}*/
		if(-100 <= this.pos.w && this.pos.x <= canvas.width)
		{
			change = true;
		}

	}

}
