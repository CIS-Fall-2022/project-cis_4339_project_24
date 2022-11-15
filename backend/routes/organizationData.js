// file created by jislam2

const express = require("express");
const router = express.Router();

//importing data model schemas
let { organizationData } = require("../models/models"); 

//GET organization name 
router.get("/", (req, res, next) => { 
    organizationData.find( {_id:process.env.ORGANIZATION},
        (error, data) => {
            if (error) {
                console.log(error)
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});


module.exports = router ;