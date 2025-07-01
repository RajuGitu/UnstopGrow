const mongoose = require('mongoose');
const {Schema} = mongoose;

const DomainInterest = new Schema({
    investorId:{
        type: Schema.Types.ObjectId,
        ref:"Investor",
        required: true,
        index:true,
        unique:true,      
    },
    interests: {
        type: [String],
        set: vals => [...new Set(vals.map(v => v.trim()))],
        validate: {
            validator: (arr) => arr.length <= 20,
            message: 'You can save at most 20 interests.',
        },
    }
});

module.exports = mongoose.model("Domain", DomainInterest);   