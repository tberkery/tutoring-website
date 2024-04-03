import mongoose = require("mongoose")

const ViewSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true
    },
    durationInSeconds: {
        type: Number,
        required: true
    }
});

export = ViewSchema