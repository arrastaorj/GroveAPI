import db from "mongoose"



const rateLimitSchema = new db.Schema({

    ip: { type: String },
    count: { type: Number },
    reset: { type: Number },

});

const rateLimit = db.model('rateLimit', rateLimitSchema);


export default rateLimit


