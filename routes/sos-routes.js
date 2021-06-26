var express = require('express');
var router = express.Router();
const {MongoClient} = require('mongodb');
const reactDom = require('react-dom');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    //res.header("Access-Control-Allow-Origin", "https://fashion-post.herokuapp.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//var url = "mongodb://localhost:27017/covidsos";
const uri = "mongodb+srv://amit916:india123@clustersos.apyon.mongodb.net/covidsos?retryWrites=true&w=majority";
const dbName = 'covidsos';


function connectDB(colName, callback){
    MongoClient.connect(uri, async function(err, client) {
        const col = await client.db(dbName).collection(colName);
        callback(col);
        client.close();
    });
}


    // fetch all Providers
    router.get('/providers', function(req, res){
        connectDB('providers', function(col){
            col.find({}).toArray(function(err, items) {
                if(err){
                    res.send("Error retrieving Providers");
                }else{
                    res.json(items);
                } 
            });
        });
    });
    
   // Post Providers
    router.post('/post_providers', function(req, res){
        connectDB('providers', function(col){
            col.insert(req.body, function(err, items){
                if(err){
                    res.send("Error saving Providers");
                }else{
                    res.send(items.ops); 
                } 
            });
        });
    });


    // fetch all Feedback
    router.get('/feedbacks', function(req, res){
        connectDB('feedback', function(col){
            col.find({}).toArray(function(err, items) {
                if(err){
                    res.send("Error retrieving feedbacks");
                }else{
                    res.json(items);
                } 
            });
        });
    });

    // Post Feedback
    router.post('/post_feedback', function(req, res){
        connectDB('feedback', function(col){
            col.insertOne(req.body, function(err, items){
                if(err){
                    res.send("Error saving feedback");
                }else{
                    res.send(items.ops); 
                } 
            });
        });
    });

  

module.exports = router;