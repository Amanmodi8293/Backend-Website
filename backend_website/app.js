const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express(); 
const port = 80;

// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));// For serving static file
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine','pug');// set the template engine for pug'
app.set('views',path.join(__dirname , 'views'));// set the view directory

// END POINT
app.get('/',(req,res)=>{
    const con = 'This is a content on the interner so far so use wisely'
    const paras = {'title': 'Pubg is the best game' ,'content': con}
    res.status(200).render('index.pug',paras);
});
app.post('/',(req,res)=>{
    name1 = req.body.name1
    age = req.body.age
    gender = req.body.gender
    address = req.body.address
    more = req.body.more
    let outputTowrite = `The name of the client is ${name1},${age} years old ${gender},ressiding at ${address}. More about him/her: ${more}`
    fs.writeFileSync('output.txt',outputTowrite)
    const paras = {'message': 'Your data is submited succesfully'}
    res.status(200).render('index.pug',paras);
})

// START THE SERVER
app.listen(port,()=>{
    console.log(`The application started succsefully on port${port}`)
});