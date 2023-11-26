import db from "mongoose"



const rateLimitSchema = new db.Schema({

    ip: { type: String, required: true },
    requests: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },

});

const rateLimit = db.model('rateLimit', rateLimitSchema);


export default rateLimit


