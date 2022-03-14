const mongoose = require('mongoose');


const afkSchema = mongoose.Schema({
    Guild: String,
    User: String,
    Reason: String,
    Date: String
});

module.exports = mongoose.model("afk", afkSchema)