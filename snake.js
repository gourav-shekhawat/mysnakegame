const canvas = document.querySelector('#myboard');
const ctx = canvas.getContext('2d');
document.addEventListener('keydown',keyDown);
let s = document.getElementById('score');
const resetButton = document.getElementById('reset');
document.addEventListener('click',reset);

const fps = 15;
let foodx;
let foody;
let score=0;

const head = {
	unitSize: 25,
	speed: 25,
	isRight: false,
	isLeft: false,
	isUp: false,
	isDown: false
}

const x  = [25];
const y  = [25];

const n = [10,2,3,4,5,6];
n.length = 1;
console.log(n);

function keyDown(e) {

		if(e.key === 'ArrowRight' && head.isLeft === false) {
			head.isRight = true;
			head.isLeft = false;
			head.isUp = false;
			head.isDown = false;
		}
		else if(e.key === 'ArrowLeft' && head.isRight === false) {
			head.isRight = false;
			head.isLeft = true;
			head.isUp = false;
			head.isDown = false;
		}
		if(e.key === 'ArrowUp' && head.isDown === false) {
			head.isRight = false;
			head.isLeft = false;
			head.isUp = true;
			head.isDown = false;
		}
		else if(e.key === 'ArrowDown' && head.isUp === false) {
			head.isRight = false;
			head.isLeft = false;
			head.isUp = false;
			head.isDown = true;
		}

		if (e.key === 'n' || e.key  === 'N') {
			createTail();
			console.log(x);
			console.log(y);
		}

}

function removeTail() {

	for(i=1;i<x.length;i++){
		if(x[0] === x[i] && y[0] === y[i]){
			for(k=x.length-1;k>=i;k--){
				x.pop();
				y.pop();
			}
		}
	}

}


function food() {

	foodx = parseInt(Math.random() * canvas.width/head.unitSize) * head.unitSize;
	foody = parseInt(Math.random() * canvas.height/head.unitSize) * head.unitSize;

	for(i=0;i<x.length;i++) {
		if(x[i] === foodx && y[i] === foody){
			food();
		}
	}


}

function drawFood() {

	ctx.fillStyle = 'red';
	ctx.fillRect(foodx,foody,head.unitSize,head.unitSize);		


}

function createTail(){

		x.push(undefined);
		y.push(undefined);


}

function reset(){

		head.isRight = false;
		head.isLeft = false;
		head.isUp = false;
		head.isDown = false;
		x.length = 0;
		y.length = 0;
		x.push(25);
		y.push(25);
		score =  0;
		scoreChange();

}


function newPos() {


	for(i=x.length-1; i > 0 ; i--){

		x[i] = x[i-1];
		y[i] = y[i-1];


	}


	if(head.isRight === true){
		x[0]  += head.speed;
	}
	else if(head.isLeft === true){
		x[0]  -= head.speed;
	}
	else if(head.isUp === true){
		y[0]  -= head.speed;
	}
	else if(head.isDown === true){
		y[0]  += head.speed;
	}



	if(x[0] === -head.unitSize) {
		x[0] = canvas.width + head.unitSize;
	}
	else if(x[0] === canvas.width + head.unitSize) {
		x[0] = -head.unitSize;
	}
	else if(y[0] === -head.unitSize) {
		y[0] = canvas.height + head.unitSize;
	}
	else if(y[0] === canvas.height + head.unitSize) {
		y[0] = -head.unitSize;
	}


}

function scoreChange(){

	s.innerHTML = 'Score : ' + score;

}

function eat(){
	if(x[0] === foodx && y[0] === foody) {
		food();
		createTail();
		score++;
		scoreChange()
	}
}

function drawSnake(){


	ctx.fillStyle = "green";
	ctx.strokeStyle = 'black';
	for(i= 0;i < x.length ; i++){
			ctx.fillRect(x[i],y[i],head.unitSize,head.unitSize);
			ctx.strokeRect(x[i],y[i],head.unitSize,head.unitSize);
	}

}

function update(){

	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawSnake();
	newPos();
	removeTail();
	drawFood();
	eat();
	setTimeout(() => {requestAnimationFrame(update)},1000/fps);
}


food();
update();

