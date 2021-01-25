function dragStart(ev) {
    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
    ev.dataTransfer.setDragImage(ev.target, 0, 0);
    return true;
}

function dragEnter(ev) {
    event.preventDefault();
    return true;
}

function dragOver(ev) {
    return false;
}

function dragDrop(ev) {
    var src = ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(src));
    ev.stopPropagation();

    document.getElementById('innerText').style.display = 'block';
    document.getElementById('box').style.display = "none";
    return false;
}

// Bouncing ball
var context;
var x = 100;
var y = 200;
var xsq = 200;
var ysq = 100;

var dx = 5;
var dy = 5;
var dxsq = 8;
var dysq = 8;


var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
console.log(windowWidth, windowHeight);
function init() {
    context = myCanvas.getContext('2d');
    setInterval(draw, 10);
}

function draw() {
    context.clearRect(0, 0, 500, 300);
    context.beginPath();
    context.fillStyle = "#0000ff";

    context.arc(x, y, 20, 0, Math.PI * 2, true);

    context.rect(xsq, ysq, 20, 20);


    context.closePath();
    context.fill();
    // Boundary Logic
    if (x < 0 || x > 500) dx = -dx;
    if (y < 0 || y > 300) dy = -dy;
    if (xsq < 0 || xsq > 500) dxsq = -dxsq;
    if (ysq < 0 || ysq > 300) dysq = -dysq;

    x += dx;
    y += dy;
    xsq += dxsq;
    ysq += dysq;
}

function submitForm() {
    if (document.getElementById("fname").value == "" ||
        document.getElementById("femail").value == "" ||
        document.getElementById("fphone").value == "") {
        alert("Please input all fields.");
        
    } else {
        alert("Thank you for submitting.");
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");

    }
}