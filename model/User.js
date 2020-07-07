const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    min: [10, 'Number should be 10 digits'],
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

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
