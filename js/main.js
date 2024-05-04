var run = false;
var work = false;
var collision = false;
var heart = 3;
var point = 0;
var record = 0;

const man = document.getElementById("player");
const bird = document.getElementById("bird");
const START = document.querySelector('button');

let speed = 1000; 
function button(el){
    
    START.style.display = "none";
    setTimeout(function() {
        run = true;
        start()
        heart = 3;
        document.getElementById("heart").textContent = "❤❤❤"; 
        document.getElementById("point").textContent = "Point: 0";
        if (point >= record ){
            document.getElementById("record").textContent = "Record: " + point;
            record = point;
        }
        point = 0;
        }
    ,50);
    
}

function jump(){

    if(!work && run){
        work = true;
        man.style.transition = "all 400ms ease-in-out";
        man.style.bottom = "200px";
        setTimeout(function() {
            man.style.bottom = "0px";
            setTimeout(function() {
                work = false;
            }, 500); 
        }, 400); 
    }
}

document.getElementById("bird").addEventListener("animationiteration", function(event) {
    point += 1;
    document.getElementById("point").textContent = "Point: " + point;
    var randomNum = Math.floor(Math.random() * (200 - 0 + 1)) + 0;
    bird.style.bottom = randomNum + "px";
    var styleSheet = document.styleSheets[0];
    styleSheet.insertRule("@keyframes fly { 0% { left: 100%; bottom: " + randomNum + "px; } 100% { left: 0%; bottom: " + randomNum + "px; } }", styleSheet.cssRules.length);
    bird.style.animation = "fly "+ speed  + "ms  infinite linear";
});

function start(){
    var randomNum = Math.floor(Math.random() * (200 - 0 + 1)) + 0;
    bird.style.bottom = randomNum + "px";
    var styleSheet = document.styleSheets[0];
    styleSheet.insertRule("@keyframes fly { 0% { left: 100%; bottom: " + randomNum + "px; } 100% { left: 0%; bottom: " + randomNum + "px; } }", styleSheet.cssRules.length);
    bird.style.display = "block";
    bird.style.animation = "fly "+ speed + "ms  infinite linear";
}

setInterval(function() {
    if (detectCollision(man, bird)) {

        if (!collision) {
            collision = true;
            heart -= 1;
            console.log("-1");
            
            if(heart == 0){
                console.log("Luser");
                run = false;
                bird.style.animation = "";
                bird.style.display = "none";
                START.style.display = "block";
                START.textContent = "Game Over";
                START.style.fontSize = "50px";
            }

            switch (heart){
                case 0:
                    heart = 3;
                    document.getElementById("heart").textContent = " ";
                    break;
                case 1:
                    document.getElementById("heart").textContent = "❤";
                    break;
                case 2:
                    document.getElementById("heart").textContent = "❤❤";
                    break;
                default:
                }
            }
            setTimeout(function() {
                collision = false;
            }, 1000); // 20000 мілісекунд (20 секунд)
        }
}, 20);

function detectCollision(block1, block2) {
    // Отримання координат та розмірів блоків
    var rect1 = block1.getBoundingClientRect();
    var rect2 = block2.getBoundingClientRect();

    // Перевірка на перетин координат та розмірів
    if (rect1.right >= rect2.left && 
        rect1.left <= rect2.right && 
        rect1.bottom >= rect2.top && 
        rect1.top <= rect2.bottom) {
        // Якщо блоки перетинаються, повертаємо true
        return true;
    } else {
        // Якщо блоки не перетинаються, повертаємо false
        return false;
    }
}
