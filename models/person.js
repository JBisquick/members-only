const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  full_name: { type: String, required: true, maxLength: 200 },
  user_name: { type: String, required: true, maxLength: 64 },
  password: { type: String, required: true },
  member_status: { type: Boolean },
  admin_status: { type: Boolean},
});

module.exports = mongoose.model("Person", PersonSchema);