const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

/*c.fillStyle = "rgba(255, 0, 0, 0.7)";
c.fillRect(100, 100, 100, 100);


c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.strokeStyle = "#abcdef";
c.stroke();

for (let i = 0; i < 1000; i++){
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let color1 = Math.random() * 255;
    let color2 = Math.random() * 255;
    let color3 = Math.random() * 255;
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    c.strokeStyle = "rgb("+color1+", "+color2+", "+color3+")";
    c.stroke();
}*/

let mouse = {
    x: undefined,
    y: undefined
};
let maxRadius = 40;
let minRadius = 2;

let colorArray = [
    "#2c3e50",
    "#e74c3c",
    "#ecf0f1",
    "#3498db",
    "#2908b9"
];

window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init(100);
})

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.minRadius = minRadius;


    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    this.update = function(){
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y -this.y > -50){
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
            
        }
        else if (this.radius > minRadius){
            this.radius -= 1;
        }


        this.draw();
    }
}

let circleArray = [];

function init(amount){
    circleArray = [];
    for (let i = 0; i < amount; i++){
        let radius = Math.random() * 3 + 1;    
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5);
        let dy = (Math.random() - 0.5);
    
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}   

let orbNumber = document.getElementById("numer");
let orbAmount = document.getElementById("apply-amount-change");
orbAmount.addEventListener("click", function(){
    init(orbNumber.value);
});
init(100);
animate();
