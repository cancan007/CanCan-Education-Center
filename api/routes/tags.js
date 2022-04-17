const express = require('express');
const { Tag, validate } = require("../models/tags");
const router = express.Router();
const validateMid = require("../middleware/validate")


router.post("/get", async (req, res) => {
    let tags;
    if (req.body.language === "") {
        tags = await Tag.find({ "category": req.body.category }).sort("name");
    } else {
        tags = await Tag.find({ "language": req.body.language, "category": req.body.category }).sort("name");
    }
    res.json(tags);
})

router.post('/', validateMid(validate), async (req, res) => {
    let tag = new Tag({
        name: req.body.name,
        language: req.body.language,
        category: req.body.category
    })
    await tag.save();
    console.log(`Succeeded to add ${req.body.name} as a new tag!`);
    res.send(`Succeeded to add ${req.body.name} as a new tag!`);
})

router.delete("/", async (req, res) => {
    /*
    let filter = {
        name: req.body.name,
        language: req.body.language,
        category: req.body.category
    }

    await Tag.deleteOne(filter, (err, c) => {
        if (err) throw err;
        else if (!err) {
            console.log(`Succeeded to delete ${filter.name}`);
            res.send(`Succeeded to delete ${filter.name}`);
        }
    })*/

    await Tag.deleteOne({ "_id": req.body._id });
    console.log("Succeeded to delete the tag!");
    res.send("Succeeded to delete the tag!");
})

module.exports = router;