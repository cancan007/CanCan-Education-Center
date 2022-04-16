
const tags = require("../routes/tags")
const references = require("../routes/references");

module.exports = function (app) {
    app.use("/api/tags", tags);
    app.use("/api/references", references);
}