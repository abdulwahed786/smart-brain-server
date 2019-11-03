const express=require('express');
const app=express();

const bodyParser=require('body-parser');

const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');

//CORS is a node.js package for providing a Connect/Express middleware 
// that can be used to enable CORS with various options
// Cross-origin resource sharing (CORS) allows AJAX requests to skip the Same-origin policy and access resources from remote hosts.
// https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b

const register=require("./controllers/register");
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

const knex = require('knex');
const db=knex({										//function knex. creating a variable postgres
  client: 'pg',
  connection: {
    host : '127.0.0.1',								//localhost
    user : 'postgres',
    password : '11314',
    database : 'smart-brain'
  }
});
	
// db.select('*').from('users').then(data=>{					//then returns a promise and we get our response
// 	console.log(data);
// })				
//OR
// console.log(db.select('*').from('users'));

app.use(bodyParser.json());
app.use(cors());

/*const database={

	users:[
		{
		  name:    "wahed",
		  id:      '123',
		  email:   'abdul.wahed11314@gmail.com',
		  password: 'aw',
		  entries:  0,
		  joined:   new Date()

		},
		{
		name:    'akhil',
		id:      '124',
		email:   'akhil14@gmail.com',
		password: 'banana',
		entries: 0,
		joined:  new Date()	
		}
	],
	login:[
			{
				id: "",
				hash: " ",
				email: "akhil14@gmail.com"
			}
	   ]	
	}
*/

app.get('/',(req,res)=>{
	res.send(database.users);      //abrar removed
})
app.post('/signin',(req,res)=>{signin.handleSignIn(req,res,db,bcrypt)});

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)});

app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)});


app.put('/image',(req,res)=>{image.handleImage(req,res,db)});

//added abrar removed
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})


// bcrypt.hash("bacon", null, null, function(err, hash) {				//To create hash of password
//     // Store hash in your  password DB.
// });

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(process.env.PORT || 3000, ()=>{
	console.log(`server is working and app running on port ${process.env.PORT || 3000}` );
})