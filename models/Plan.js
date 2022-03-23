const mongoose = require('mongoose');

const planSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },

        discount: {
            type: Number
        },

        discountExpireAt: Date,

        totalEngagement: {
            type: Number,
        },

        totalActivation: {
            type: Number,
        },

        isActive: {
            type: Boolean,
            default: false
        },

        link: {
            type: String
        },

        tokens: [
            {
              token: {
                type: String,
                required: true,
              },
            },
        ],

    },
    {
        timestamps: true,
    }
);

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;