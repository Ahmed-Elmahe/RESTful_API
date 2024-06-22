//Import The Pachages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//Express Activation
const app = express();

//Connect To The Database
mongoose.connect('mongodb://127.0.0.1:27017/cats')
.then(() => console.log('Connected!'))
.catch(err => console.log(err));

//Body-Parser Used
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//MethodOverride 
app.use(methodOverride('X-HTTP-Method-Override'));

//The Cat Schema
const catsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    code: {
        type: String
    }
});

//model
const Cat_info = mongoose.model("Cat_info", catsSchema);

//Data Review
app.get('/cats', async (req, res)=>{
    try {
        var cat = await Cat_info.find({});
        res.json({cat});
    } catch(err) {
        res.send(`<h1>${err}</h1>`);
    }
});

//Add Data
app.post('/cats/addMoreCats', (req, res) => {
    const addMoreCat = new Cat_info({
        name: req.body.name,
        code: req.body.code
    });
    addMoreCat.save().then(()=>{
        res.send("<h1>Data send seccssfully</h1>")
    });
});

//Update on Data
app.put('/cats/update/:_id', async (req, res)=>{
    try{
        const id = req.params._id;
        var catUpdate = await Cat_info.findByIdAndUpdate(id, {name: req.body.name, code: req.body.code})
        catUpdate.save().then(()=> res.send('<h2>The data has been updating</h2>'));
    }catch(err) {
        res.send(`ther is an error: ${err}`);
    }
});

//Delete Data
app.delete('/cats/remove/:_id', async (req, res)=>{
    try{
        const id = req.params._id;
        await Cat_info.findByIdAndDelete(id).then(()=>res.send('<h2>the cat is Deleting</h2>'));
    } catch(err) {
        res.send(`ther is an error: ${err}`);
    }
});

//localhost:3000
app.listen(3000, ()=> console.log("The express are listen at port 3000 seccessfully!"));












//JWT Part
// let jwt = require('jsonwebtoken');
// let fs = require('fs');

// let privateKey = fs.readFileSync('private.key');
// let token = jwt.sign({name: 'test'}, privateKey, {algorithm: 'HS256'});
// let result = jwt.verify(token, privateKey);