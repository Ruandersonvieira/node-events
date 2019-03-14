const axios = require('axios');
const redis = require('redis');
let newData = [];




baseUrl = 'http://127.0.0.1:8007';

getStatusoff();

function getStatusoff(){
    axios.get(baseUrl, {})
        .then(response => {
            if(response.data){
                for(i=0; i < response.data.length; i++){
                    if(response.data[i].status=="Inativo"){
                        newData.push(response.data[i]);
                    }
                }
                redisSave(newData);
            };
        })
        .catch(error => {
            console.log(error)
        })
}

let redisClient = redis.createClient({ host: 'redis-16564.c73.us-east-1-2.ec2.cloud.redislabs.com', port: 16564 });
redisClient.auth('XUBIIoEhmZiHwhwq81LIbn3C6Tw0hzo8', function (err, reply){});


function redisSave(docs) {
    redisClient.set("carinativo", JSON.stringify(docs), function (err, result) {
      if (err) return console.log(err);
        redisClient.get("carinativo", function (err, result) {
          if (err) { return console.log(err) };
          console.log(result);
        });
    });
};

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