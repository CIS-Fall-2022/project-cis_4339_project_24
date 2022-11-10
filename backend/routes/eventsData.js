const express = require("express");
const router = express.Router();

//importing data model schemas
let { eventdata } = require("../models/models"); 

//GET all entries
router.get("/", (req, res, next) => { 
    console.log("here")
    eventdata.find( {organization:process.env.ORGANIZATION},
        (error, data) => {
            if (error) {
                console.log(error)
                return next(error);
            } else {
                console.log(data)
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single entry by ID
router.get("/id/:id", (req, res, next) => { 
    eventdata.find({ organization:process.env.ORGANIZATION,
        _id: req.params.id }, 
    (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//GET entries based on search query
//Ex: '...?eventName=Food&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { organization:process.env.ORGANIZATION, 
            eventName: { $regex: `^${req.query["eventName"]}`, $options: "i" } }
    } else if (req.query["searchBy"] === 'date') {
        dbQuery = {
            organization:process.env.ORGANIZATION, 
            date:  req.query["eventDate"]
        }
    };
    eventdata.find( 
        dbQuery, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET events for which a client is signed up
router.get("/client/:id", (req, res, next) => { 
    eventdata.find( 
        { organization:process.env.ORGANIZATION, 
            attendees: req.params.id }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//POST
router.post("/", (req, res, next) => { 
    var data = req.body
    data['organization'] = process.env.ORGANIZATION
    eventdata.create( 
        data, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//PUT
router.put("/:id", (req, res, next) => {
    var data = req.body
    data['organization'] = process.env.ORGANIZATION
    eventdata.findOneAndUpdate(
        { _id: req.params.id },
        data,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});


//PUT add attendee to event
router.put("/addAttendee/:id", (req, res, next) => {
    //only add attendee if not yet signed uo
    eventdata.find( 
        { organization:process.env.ORGANIZATION, 
            _id: req.params.id, 
            attendees: req.body.attendee }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                if (data.length == 0) {
                    eventdata.updateOne(
                        { _id: req.params.id ,
                            organization:process.env.ORGANIZATION, }, 
                        { $push: { attendees: req.body.attendee } },
                        (error, data) => {
                            if (error) {
                                return next(error);
                            } else {
                                res.json(data);
                            }
                        }
                    );
                }
                
            }
        }
    );
    
});


//DELETE event data document based on id param Jacob Hui
router.delete("/:id", (req, res, next) => { 
    eventdata.deleteOne( 
        { _id: req.params.id },
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//DELETE clinet from event Jacob Hui
router.delete("/delAttendee/:id", (req, res, next) => {
    eventdata.find( 
        { _id: req.params.id },
        req.body,
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                eventdata.updateOne({ _id: req.params.id }, {$pull: { attendees: req.body.attendee }}).exec()
                res.json(data);
            }
        }
    );
});

//GET all the events & attendee Ex...Body eventName: "event"
//Also how many clients signed up for each event for the last 2 months
//OscarLopez
router.get("/report", (req, res, next) => { 
    var d = new Date();
    d.setMonth(d.getMonth() - 2); //2 month ago
    eventdata.aggregate([
        {$match:{organization:process.env.ORGANIZATION,
            date:{$gte:d}}},
        {$project:{_id:1, attendee:{$size:"$attendees"}}}
    ] ,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});


module.exports = router;