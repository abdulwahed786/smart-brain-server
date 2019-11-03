const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: 'f1c8cc047be14baa91bf3c24397667f6'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage=(req,res,db)=>{
const { id }=req.body;
	
	db('users').where('id', '=', id)
	.increment('entries',1)
	.returning('entries')								//returns entries for the user with id entered			
	.then(entries=>{
		res.json(entries[0]);
	})
	.catch(err=>{
		res.status(400).json("Error not possible");
	})
}
module.exports = {
  handleImage,
  handleApiCall
}