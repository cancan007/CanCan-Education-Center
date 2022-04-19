const express = require('express');
const router = express.Router();
const { Reference, validate } = require("../models/references")
const { Tag } = require("../models/tags")
const validateMid = require("../middleware/validate")

router.post("/", async (req, res) => {
    let references = [];
    if (req.body.filter) {
        if (req.body.language === "") {
            references = await Reference.find(
                {
                    $and: [
                        {
                            $and: [{

                                "category": req.body.category
                            }]
                        },
                        {
                            $or: [{
                                "title": { "$regex": req.body.filter },
                                //"description": { "$regex": req.body.filter }
                            }]
                        }
                    ]
                }
            ).catch(err => console.error(err));
        } else {
            references = await Reference.find(
                {
                    $and: [
                        {
                            $and: [{
                                "language": req.body.language,
                                "category": req.body.category
                            }]
                        },
                        {
                            $or: [{
                                "title": { "$regex": req.body.filter },
                                //"description": { "$regex": req.body.filter }
                            }]
                        }
                    ]
                }
            ).catch(err => console.error(err));
        }

    }
    else if (!req.body.filter) {
        if (req.body.language === "") {
            references = await Reference.find({ "category": req.body.category })
        }
        else {
            references = await Reference.find({ "language": req.body.language, "category": req.body.category })
        }

    }

    res.json(references);
})

router.post("/tag", async (req, res) => {
    let references = [];
    let datas;
    if (req.body.language) {
        datas = await Reference.find({ "language": req.body.language, "category": req.body.category });
    }
    else {
        datas = await Reference.find({ "category": req.body.category });
    }

    await Promise.all(datas.map(async i => {
        let tags = i.tags;
        for (let m = 0; m < tags.length; m++) {
            let tag = tags[m];

            if (tag.name === req.body.tag) {
                references.push(i)
            }
        }
    }))
    return res.json(references);
})

router.get("/language", async (req, res) => {
    let langs = [];
    let refes = await Reference.find();
    for (let i = 0; i < refes.length; i++) {
        if (!langs.includes(refes[i].language)) {
            langs.push(refes[i].language)
        }
    }
    langs.sort()
    langs = { "languages": langs }
    return res.json(langs)
})

router.post("/add", validateMid(validate), async (req, res) => {
    let refes = []
    for (let i = 0; i < req.body.tags.length; i++) {
        let refe = await Tag.findById(req.body.tags[i]);
        refes.push(refe);
    }


    let newrefe = new Reference({
        url: req.body.url,
        title: req.body.title,
        description: req.body.description,
        language: req.body.language,
        category: req.body.category,
        tags: refes
    })
    newrefe = await newrefe.save();
    return res.send("Succeeded to add new reference!");
})

router.delete("/", async (req, res) => {
    let refe = await Reference.deleteOne({ "_id": req.body._id });
    console.log(`Succeeded to delete reference!`);
    return res.send(`Succeeded to delete reference!`);
})

module.exports = router;