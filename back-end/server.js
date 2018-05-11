const express = require ('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '@Zo!kou92@',
    database : 'faceboto'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get ('/', (req, res)=>{
	res.send(database.users);
})
app.post('/signin', (req, res)=>{
	db.select('email', 'hash').from('login')
	.where('email','=', req.body.email)
	.then(data =>{
		const validPassword= bcrypt.compareSync(req.body.password, data[0].hash);
		if(validPassword){
			return db.select('*').from('users')
			  .where('email', '=', req.body.email)
			  .then(user =>{
			  	res.json(user[0])
			  })
			  .catch(err => res.status(400).json('unable to get User'))	
		}else{
			res.status(400).json('wrong password or username')
		}
	})
    .catch(err => res.status(400).json('wrong password or username'))
})

app.post('/signup', (req, res)=>{
	const {email, name, password} = req.body;
	const hash = bcrypt.hashSync(password);
	//more than two things than once
	db.transaction(trx =>{
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
			.returning('*')
			.insert({
				email: loginEmail[0],
				name: name,
				joined: new Date()
			})
			.then(user => {
				res.json(user[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err=> res.status(400).json('unable to sign Up'))
})

app.put('/image', (req,res)=>{
	const{id} = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);;
	})
	.catch(err => res.status(400).json('unable to get entries'))
})

app.listen(3000, ()=>{
	console.log('app is running on port 3000');
})


/*
/ route --> res =this is working
/signin --> POST request (success/fail)
/signup POST rewuest(user)
/profile/: userId --> GET(user)
/image --> PUT(count)
*/