const mongoose = require('mongoose');

const { Schema } = mongoose
const Pageschema = new Schema({

    PageTitle: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, requires: true },
    description: { type: String, rquires: true },


})

module.exports = mongoose.model('Pages', Pageschema)