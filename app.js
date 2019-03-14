const axios = require('axios');
let newData = [];

baseUrl = 'http://127.0.0.1:8007';
axios.get(baseUrl, {})
        .then(response => {
            if(response.data){
                for(i=0; i < response.data.length; i++){
                    if(response.data[i].status=="Inativo"){
                        newData.push(response.data[i]);
                    }
                }
                console.log(newData);
            };
        })
        .catch(error => {
            console.log(error)
        })


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