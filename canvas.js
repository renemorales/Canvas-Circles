var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = "lightgreen";
// c.fillRect(100, 60, 100, 100);
// c.fillStyle = "gold";
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = "lightpink";
// c.fillRect(300, 310, 100, 100);
// console.log(canvas);

// Line

// c.beginPath();
// c.moveTo(10, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.lineTo(10, 300);
// c.strokeStyle = "purple";
// c.stroke();


// ARC / CIRCLE

// c.beginPath();
// c.arc(500, 300, 50, 0, Math.PI * 2, false);
// c.strokeStyle = "red";
// c.stroke();

// for (var i = 0; i < 10; i++) {
// 	var x = Math.random() * window.innerWidth;
// 	var y = Math.random() * window.innerHeight;

// 	c.beginPath();
// 	c.arc(x, y, 50, 0, Math.PI * 2, false);
// 	c.strokeStyle = "red";
// 	c.stroke();
// }

//ANIMATING THE CANVAS

var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 40;
// var minRadius = 2;

var colorArray = [
	'#8C2B45',
	'#222226',
	'#464E59',
	'#869AA6',
	'#BFD1D9',
];

window.addEventListener('mousemove', function(event) {
	
	mouse.x = event.x;
	mouse.y = event.y;
	console.log(mouse);
	});

window.addEventListener('resize', function(){

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();

})

function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.draw = function(){

		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}

	this.update = function (){

		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {

			this.dx = -this.dx;
		}

		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {

			this.dy = - this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;


		// INTERACTIVITY
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50
			&& mouse.y - this.y < 50 && mouse.y - this.y > -50){
			
			if (this.radius < maxRadius){

				this.radius += 1;
			}
		}
		else if (this.radius > this.minRadius) {

			this.radius -= 1;
		}

		this.draw();
	}
}

var circleArray = [];

function init(){

	circleArray = [];

	for (var i = 0; i < 900; i++) {

		var radius = Math.random() * 3 + 1;
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius * 2) + radius;
		var dx = (Math.random() - 0.5);
		var dy = (Math.random() - 0.5);
		circleArray.push(new Circle(x, y, dx, dy, radius));

	}
}

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	for(var i = 0; i < circleArray.length; i++){

		circleArray[i].update();
	}


}

init();
animate();