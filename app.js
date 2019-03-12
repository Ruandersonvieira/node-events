
function getRandomTime() {
    let min = 30000;
    let max = 60000;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
 };


function executeEvent(time){
    setTimeout(function(){ console.log(time); }, time);
}

setInterval(function(){executeEvent(getRandomTime()); }, 1000);