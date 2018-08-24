var express = require('express'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb').MongoClient;
    cors = require('cors');
    var app = express();
// ## connection string where the mongodb us running
mongo_conn = 'mongodb://localhost/';
var db = '';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors({
    origin:"http://localhost:4200"
}));

app.get('/', function(req,res){
    res.send('Hello');    
});

app.post('/login', function(req, res){
    db.collection('users').findOne()

    
});


app.post('/register', function(req, res){
    db.collection('users').insert(req.body, function(err){
        if(!err){
           res.send({
               flag: true
           });
        }
        else{
            res.send({
                flag: false
            });
        }
    });
    
});

// ## getting data from database
// app.get('/register', function(req,res){
     
//     db.collection('users').find({}).toArray( function(err, docus){
//         if(!err){
//             res.send(docus);
//             console.log('success');
//         }
//         else{
//             res.send('Error');
//         }
//     });
// });

// ## connecting to the database
mongodb.connect(mongo_conn, function(err, client){
    if(!err){
        console.log('Database Connected');
        app.listen(3000, function(){
            console.log('Server Started');
        });
        db = client.db('mydatabase'); // database name
    }
    else{
        console.log(err);
    }
});
