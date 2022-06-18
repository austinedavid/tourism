const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
let totalBalls = 500;

let mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;

   
})



class Particle {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.speedX = 0;
        this.speedY = 0;
        this.density = Math.random()*30 + 1
    }

    draw(){
        ctx.fillStyle = 'white';
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.closePath()
        ctx.fill()
    }
    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        let directionX = dx/distance;
        let directionY = dy/distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance)/distance;
        let displacementX = force*directionX*this.density;
        let displacementY = force*directionY*this.density;
        if(distance < maxDistance){
          this.x -= displacementX;
          this.y -= displacementY;
        }
     else{
         if(this.x !== this.baseX){
             let dx = this.x - this.baseX;
             this.x -= dx/10;
         }
         if(this.y !== this.baseY){
             let dy =  this.y - this.baseY;
            this.y -= dy/10;
         }
     }
    }
}

function init(){
    particleArray= [];
    for(let i = 0; i < totalBalls; i++){
        let x = Math.random()*canvas.width;
        let y = Math.random()*canvas.height;
        particleArray.push(new Particle(x,y));
    }
}
init()

function circleDrawing(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particleArray.length; i++){
        particleArray[i].draw();
        particleArray[i].update();
    }
}

function animate(){
    circleDrawing()
    requestAnimationFrame(animate)
}
animate();