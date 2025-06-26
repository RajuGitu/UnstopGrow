const mongoose = require('mongoose');

const DomainInterest = new mongoose.Schema({
    investorId: {
        type: Schema.Types.ObjectId,
        ref: 'Investor',
        required: true,
    },
    interests: {
        type: [String],
        default: ["AI", "EdTech", "FinTech", "HealthTech"],
        set: vals => [...new Set(vals.map(v => v.trim()))],
        validate: {
            validator: (arr) => arr.length <= 20,
            message: 'You can save at most 20 interests.',
        },
    }
});

module.export = mongoose.model("Domain", DomainInterest);   