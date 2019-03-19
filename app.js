const axios = require('axios');
const redis = require('redis');

// Base url for api redis
baseUrl = 'http://127.0.0.1:8007/';

// Events Config
let events = require('events');
let eventEmitter = new events.EventEmitter();

// Array to get "inativo" crash status
let newData = [];

// Get all crash in "inativo" status and set in newData
getStatusoff();

function getStatusoff(){
    axios.get(baseUrl, {})
        .then(response => {
            if(response.data){
                for(i=0; i < response.data.length; i++){
                    if(response.data[i].status=="Inativo"){
                        newData.push(response.data[i]);
                    };
                };
                if(!newData.length){
                    return console.log("Todos carros Ativos!");
                } else{
                redisSave(newData);
                };
            };
        })
        .catch(error => {
            console.log(error)
        })
}

// Redi config
let redisClient = redis.createClient({ host: 'redis-16564.c73.us-east-1-2.ec2.cloud.redislabs.com', port: 16564 });
redisClient.auth('XUBIIoEhmZiHwhwq81LIbn3C6Tw0hzo8', function (err, reply){});

//Redis Save function
function redisSave(docs) {
    redisClient.set("carinativo", JSON.stringify(docs), function (err, result) {
      if (err) return console.log(err);
         if(result == "OK"){
             console.log("Salvo 'Inativo' no redis")
            executeEvent(getRandomTime());
         };
        });
};

// Get random time function
function getRandomTime() {
    let min = 30000;
    let max = 60000;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

// Execute a event
function executeEvent(time){
    setTimeout(function(){ 
        console.log(time); 
        eventEmitter.emit('update');
        executeEvent(getRandomTime());
    }, time);

};

// Update event
let updateCrash = function (){

    if(!newData.length){
        return console.log("Todos os carros ativos");
    }
    let aux = newData.shift();
    console.log(aux);
    axios.put(baseUrl + aux._id,{
        name: aux.name,
        status: "Ativo"
    })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error)
        })
    console.log('Update Crash' + aux._id +' Status');
  };
  eventEmitter.on('update', updateCrash);
