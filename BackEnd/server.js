var express = require('express'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb').MongoClient,
    cors = require('cors'),
    jwt =  require('jsonwebtoken');

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
       
    db.collection('users').findOne({username: req.body.username, password: req.body.password}, function(err, user){
        var token = jwt.sign({'uname': req.body.username}, 'my-secret-key', {
            expiresIn: '1h'
        });
    
        if (err) {
            res.send(err);
            console.log(err);
          }
          if(user) {
          res.send({
              flag: true,
              token: token,
              userDetails: user
          }
        );
          console.log(user);
          }
          else{
              res.send( {
                flag: false
              }
            );
              console.log('failed');
          }
    });    
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


app.use(function(req, res, next){
    var token = req.body.authtoken || req.query.authtoken || req.headers['authtoken'];
    jwt.verify(token, 'my-secret-key', function(err, decoded){
        if(err){    
            res.send({
                err: true,
                msg: 'Invalid request'
            });
        }else{
            req.decoded = decoded;
            next();
        }
    });
});




app.post('/createblog', function(req, res){
    
    db.collection('blogs').insert(req.body, function(err){
        if(!err){
            console.log('success');
           res.send({
               flag: true               
           });           
        }
        else{
            console.log('failed');
            res.send({
                flag: false
            });            
        }
    });
});

app.post('/insertcomment', function(req, res){
       console.log(req.body);

 db.collection('blogs').updateOne({title: req.body.title},{$push: {comment: req.body.comment}},function(err, blog){
              if(!err){
                
              db.collection('blogs').findOne({title: req.body.title}, function(err, blog){      
                if (err) {
                    res.send(err);
                    console.log(err);
                  }
                  if(blog) {
                  res.send({
                      flag: true,              
                      blogDetails: blog.comment
                  }
                );
             
                  }
                  else{
                      res.send( {
                        flag: false
                      }
                    );
                      console.log('failed');
                  }
            });

            }
            else{
                res.send({
                 flag: false
              });
            }
          });                                
        }
      );

app.post('/likeblog', function(req, res){    
    db.collection('blogs').updateOne({title: req.body.title},   {$push: {likedBy: req.body.username},$inc: {likes: 1}},function(err, blog){
            if (err) {
              console.log(err);
            }else{
                
                db.collection('blogs').findOne({title: req.body.title}, function(err, blog){      
                    if (err) {
                        res.send(err);
                        console.log(err);
                      }
                      if(blog) {
                      res.send({
                          flag: true,              
                          LikeDetails: blog.likedBy,
                          likes: blog.likes
                      }
                    );
                 
                      }
                      else{
                          res.send( {
                            flag: false
                          }
                        );
                          console.log('failed');
                      }
                });

            }      
          });
});
    
app.get('/blogs', function(req, res){    
    db.collection('blogs').find().toArray(function(err, blogs) {
        if (err) {
          console.log(err);
        }
         res.send(blogs);        
      });
});


app.get('/blog/:title', function(req, res){   
    console.log(req.params.title);

    db.collection('blogs').findOne({title: req.params.title}, function(err, blog){      
        if (err) {
            res.send(err);
            console.log(err);
          }
          if(blog) {
          res.send({
              flag: true,              
              blogDetails: blog
          }
        );
     
          }
          else{
              res.send( {
                flag: false
              }
            );
              console.log('failed');
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
