const express = require('express');
const router = express.Router();

const admin = require('firebase-admin');
const serviceAccount = require('./ServiceAccountKey.json');
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const members = require('../../Members');

//Get all members
router.get('/', (req,res) => {
    console.log(db);
    db.collection('Pages').doc('Article').get().then(doc => {
        res.json(doc.content());
    }).catch(err => {
        res.send('Error occurred');
        process.exit();
    })
});

//Get single member
router.get('/:id', (req,res) => {
    const found = members.some(m => m.id == req.params.id);
    if(found) {
    res.json(members.filter(m => m.id == req.params.id));
    }else {
        res.status(400).json({msg : 'Member not found'})
    }
});

//Create a member
router.post('/create', (req,res) => {
    const newMember = {
        url : req.body.id,
        content: req.body.name
       // age: req.body.age
    }

    if(!newMember.content) {
        res.status(400).json({msg: "Please enter valid name"});
    } else {
        db.collection('Pages').doc('Article').set(newMember);
        members.push(newMember);
        res.json(members);
    }
});



module.exports = router;