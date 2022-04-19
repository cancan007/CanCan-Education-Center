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
    return res.json(tags);
})

router.post('/', validateMid(validate), async (req, res) => {
    let tags;
    tags = await Tag.find({ "language": req.body.language, "category": req.body.category });
    for (let i = 0; i < tags.length; i++) {
        if (req.body.name.toLowerCase() === tags[i].name) {
            return res.status(400).send("The tag name already exists");
        }
    }
    let tag = new Tag({
        name: req.body.name,
        language: req.body.language,
        category: req.body.category
    })
    await tag.save();
    console.log(`Succeeded to add ${req.body.name} as a new tag!`);
    return res.send(`Succeeded to add ${req.body.name} as a new tag!`);
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
    return res.send("Succeeded to delete the tag!");
})

module.exports = router;