class ray extends line
{
	constructor(data)
	{
		super(data);
		this.collpos = {x:-1, y:-1}; // Contains the last collision point (if there's none it equals (-1, -1))
	}
	draw()
	{

		c.strokeStyle = "#ffffff";
		c.moveTo(this.pos.x, this.pos.y);
		if(this.collpos.x == -1 || this.collpos.y == -1) // if ray dose'nt collide.
			c.lineTo(this.pos.w, this.pos.h);
		else
			c.lineTo(this.collpos.x, this.collpos.y);
		c.stroke();
	}
	collide(line)
	{
		let pcollpos = this.collpos;
		/*if(this.collpos.x != -1 || this.collpos.y != -1) // if ray wasnt default value
		{
			change = true;
			this.collpos = {x: -1, y: -1}; // Reset the collision point to none
		}*/


		let o = line.pos; // Abreviation of the line posieions matrix.
		let r = this.pos; // Abreviation of the ray posieions matrix.
		let denom = (r.x - r.w) * (o.y - o.h) - (r.y - r.h) * (o.x - o.w);

		if(denom == 0) // The lines are parallel theres no collision.
			return;

		let t = ((r.x - o.x) * (o.y - o.h) - (r.y - o.y) * (o.x - o.w)) / denom;
		let u = ((r.x - o.x) * (r.y - r.h) - (r.y - o.y) * (r.x - r.w)) / denom;

		if( !((0 <= t && t <= 1) && (0 <= u && u <= 1))) // No collision unless 0 <= t >= 1 and 0 <= u >= 1. 
			return;

		let Px = r.x + t * (r.w - r.x); // Position x of the collision point.
		Px = Math.floor(Px);
		let Py = r.y + t * (r.h - r.y); // Position y of the collision point.
		Py = Math.floor(Py);

		if(pcollpos.x != -1 && pcollpos != -1 && pcollpos.y <= Py) // if ray wasnt default value
		{
			change = true;
			this.collpos = pcollpos;
			return;
		}
		this.collpos = {x: Px, y: Py};
	}

}
