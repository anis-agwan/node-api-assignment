const mongoose = require("mongoose");

const ShopkeeperSchema = mongoose.Schema({
  mobile: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// export model user with ShopkeeperSchema
module.exports = mongoose.model("shopkeeper", ShopkeeperSchema);
