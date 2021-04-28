//server setup
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = 3000;
//start server
app.listen(PORT,()=> console.log(`app listening on port: ${PORT}`));


//database setup
const Sequelize= require('sequelize');
const sequelize = new Sequelize({
    // host:'localhost',
    dialect:'sqlite',
    storage: './database.sqlite'
});


//authenticate database
sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully');
})
.catch(err => {
    console.error('Unable to connect to the database:',err);
});

//set up model for mapping
const Note=sequelize.define('notes', {
    note: Sequelize.TEXT,
    tag:Sequelize.STRING,
    name: Sequelize.STRING,
    age: Sequelize.INTEGER
});

//Authenticate database
//create notes
//.sync is syncronizing/adding all the defined models to the database
//similar to insert in sql
//adding all of the information we put in teh database
sequelize.sync({force:true})
.then(()=>{
    console.log('Database and tables have been created')
    

    Note.bulkCreate([
        {note:'Note for XXX XXX XXXXX', tag:'noteONe',name:'noteOneName',age: 20},
        {note:'Note two description',tag:'noteTwoTag',}
    ]).then(function(){
        return Note.findAll();
    }).then(function(notes){
        console.log(notes)
    });
});




//routes
//reading entities
app.get('/', (req,res)=>
    res.send('This is the homepage/////'));

app.get('/notes',function(req,res) {
    // res.send('NOTE PAGE');
    Note.findAll().then(notes => res.json(note));
});

app.get('/notes/search',function(req,res){
    Note.findAll({
        where:{
            note: req.query.note,
            tag: req.query.tag,
            name: req.query.name,
            age: req.query.age
        }
    }).then(notes=> res.json(notes));
})
//write route to get id parameter


//read all entities
app.get('/notes:id', function(req,res){
    Note.findAll({
        where:{id:req.params.id}}).then(notes =>res.json(notes));
});


// const Op = Sequelize 
app.get('/notes/search', function(req,res){
    Note.findAll({
        where:{tag:{[Op.or]: [].concat(req.query.tag)
        }
    }}
    ).then(notes =>res.json(notes));
});

//read entities limit
//set limits/constraints
app.get('notes/search', function(req,res){
    Note.find({
        limit:2,
        where:{
            tag:{
                [Op.or]: [concat(req.query.tag)]
            }
        }
    }).then(notes=>res.json(notes));
});


//insert entities
//POST method
//bodyparser

app.post('/notes', function(req,res){
    Notes.create({
        note:req.body.note,
        tag: req.body.tag,
        name:req.body.name,
        age: req.body.age
    }).then(function(note){
        res.json(note)
    })
});

//update entities
app.put('/notes/:id', function(req,res){
    Note.findByPk(req.params.id).then(function(note){
        node.update({
            note: req.body.note,
            tag: req.body.tag
        }).then((note)=>{
            res.json(note);
        });
    });
});


//modift entity
// .destroy methos
// findbypk is used to find specific note by iD and modify
app.delete('/notes/:id',function(req,res){
    Note.findByPk(req.params.id).then(function(note){
        note.destroy();
    }).then((note)=>
    res.sendStatus(200));
});