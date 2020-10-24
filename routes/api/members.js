const express = require('express');
const members = require('../../data/members');
const uuid = require('uuid'); 
const e = require('express');
const router = express.Router();


/////// router /////////
// getting all the members
router.get('/', (req, res) => {
    res.json(members); 
})

// get a  single member
router.get('/:id', (req, res) => {

    // bad request for no parameter
    if (req.params.id === undefined) return res.status(400).json({message: 'missing parameter id'});

    const member = members.filter(member => member.id === parseInt(req.params.id))

    // bad request for invalid parameter
    if (member.length === 0) return res.status(400).json({message: `No member with the id of ${req.params.id}`});

    res.json(member); 
})

// Create Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(), 
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({message: 'please include a name and email'}); 
    }

    members.push(newMember);
    return res.json(members);
})

// Update Member
router.put('/:id', (req, res) => {

    // bad request for no parameter
    if (req.params.id === undefined) return res.status(400).json({message: 'missing parameter id'});

    const found = members.some(member => member.id === parseInt(req.params.id))

    // bad request for invalid parameter
    if (!found) {
        return res.status(400).json({message: `No member with the id of ${req.params.id}`});
    }
    else {
        const updMember = req.body;
        var updateSuccess = false;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {

                if (updMember.name) member.name = updMember.name; 
                if (updMember.email) member.email = updMember.email;
                updateSuccess = true;
                return res.json({ message: 'Member updated', member });
            }
        });

        if (!updateSuccess)
        {
            return res.json({ message: 'did not update member'}); 
        }
    }
})

// Delete Member
router.delete('/:id', (req, res) => {

    // bad request for no parameter
    if (req.params.id === undefined) return res.status(400).json({message: 'missing parameter id'});

    const found = members.some(member => member.id === parseInt(req.params.id)); 
    
    if (found) 
    {
        // need to implement code to actually remove it

        // response
        res.json({ 
            message: 'Member deleted', 
            members: members.filter(member => member.id !== parseInt(req.params.id)),
        }); 
    }
    else {
        return res.status(400).json({message: `No member with the id of ${req.params.id}`});
    }
})

module.exports = router;