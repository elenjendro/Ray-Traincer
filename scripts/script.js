// CANVAS CONSTANTS
const canvas = document.querySelector("canvas"); // Reference to the canvas
const c = canvas.getContext("2d"); // Context from the canvas
let unit; // Unit of a size of default sccreen in contrast to actual size
	 // w: Widht
	 // h: Height


let af; // Animation frame reference

// FPS VARIABLES
let fps = 30; // Default fps
let desiredDelta = 1000/fps; // Value desired for delta
let startDelta = Date.now(); // Time when a rendering starts

let rays = new Set(); // List of rays
let carts = new Set(); // List of carts
let change = false; // Indicates if a change has been made over a ray

// FUNCTION CALLS
canvasSize();


// FUNCTION DECLARATIONS
function canvasSize() // Controls the canvas size and proportions
{
	window.cancelAnimationFrame(af);
	c.clearRect(0,0,canvas.width,canvas.height);

	// CALCULATING CANVAS SIZE
	canvas.width = window.innerWidth - 30;
	canvas.height = window.innerHeight - 30;

	unit = { w: canvas.width/100, h: canvas.height/100 };

	rays.clear()
	generateRays();
	
	carts.clear()
	generateCarts();

	generalCollision();
	generalDraw(1000);

	frame();
}

function frame() // Generates the output of a frame 
{

	// FPS VARIABLES
	let delta = Date.now() - startDelta; // Time passed scine last rendering


	// CHECK RAYS COLLISION


	if(delta > desiredDelta && delta < desiredDelta*2)
	{
		carts.forEach((cart) => 
			{
				cart.fisics()
				if(cart.lines.size <= 0)
				{
					carts.delete(cart);
				}
			});
		generalCollision();
		startDelta = Date.now(); // Reinitialize counter after frame
		if(change)
		{
			generalDraw(delta);
		}
		else if(carts.size <= 0 )
		{
			generateCarts();
		}

		rays.forEach((value) => value.collpos = {x: -1, y: -1});
	} 
	else if (delta > desiredDelta)
		startDelta = Date.now(); // Reinitialize counter when cpu recovers

	






	// REQUEST ANIMATION FRAME
	af = window.requestAnimationFrame(frame);
}

function generateRays() // Generate the rays
{

	for(let i = 180; i <= 360; i+=11.25/2)
	{	
		// TRIANGEL VARIABLES
		let rad = Math.PI * i / 180; // Value in radians of the actual degree
		let a; // Vertical size of the triangle
		let b; // Horizontal size of the triangle

		// CALCULATING SIZES
		//-------------------------------------------------------------
		//|                                                           |
	  	//|  Initial position - Maximun size * sin/cos(radians angle) |
		//|                                                           |
		//-------------------------------------------------------------

		a = 2 - canvas.height * Math.sin(rad);
		a = Math.floor(a); // Simplifies the number
		b = canvas.width/2 - canvas.width/2 * Math.cos(rad);
		b = Math.floor(b);

		// Fixed Point and Size
		//a = 100 - 100 * Math.sin(rad);
		//b = 100 - 100 * Math.cos(rad);

		// ADDING THE RAY
		rays.add(new ray({x: canvas.width/2, y: 2, w: b, h: a})); // Add the ray
	}
}

function generateCarts()
{
	let rand = Math.random() * (10 - 0) + 0; // random * (max - min) + min
	rand = Math.floor(rand);
	for(let i = 0; i <= rand; i++)
	{
		let type = Math.random() * (4 - 2) + 2; // random * (max - min) + min
		type = Math.floor(type);

		carts.add(new cart({pos: {x: canvas.width + 70*unit.w * i, y: 40*unit.h}, type: type}));
	}
}

function generalDraw(delta)
{
	c.beginPath();
	// BACKGROUND DRAW
	c.clearRect(0,0,canvas.width,canvas.height);
	c.fillStyle = "#000000";
	c.fillRect(0,0,canvas.width,canvas.height);

	// CARTS DRAW
	carts.forEach((value) => value.draw());

	// RAYS DRAW
	rays.forEach((value) => value.draw());


	// FPS STATE DRAW
	c.fillStyle = "#32eeba";
	c.font = 2*unit.w+"px Arial";
	c.fillText("fps: " + Math.floor(1000/delta) , 5*unit.w,10*unit.h);
	c.fillText("unit: " + unit.w + " / " + unit.h , 5*unit.w,20*unit.h);
	change = false;
}

function generalCollision()
{
	carts.forEach((cart) =>
		{
			cart.lines.forEach((line) => 
				{
					rays.forEach((ray) => ray.collide(line));
				});
		});

}

// EVENT LISTENERS
window.addEventListener("resize",canvasSize); // Listen for a resize

window.addEventListener("keydown", (event) => // Listen to keyboard
	{

		console.log(event)

		switch(event.key)
		{
			case 'r': // Restore the size
				canvasSize();
				break;
			case 'p': // Pause the animation
				window.cancelAnimationFrame(af);
				break;
			case 's': // Start the animation
				af = window.requestAnimationFrame(frame);
				break;
		}
	});

