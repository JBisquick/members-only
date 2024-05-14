const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text: { type: String, required: true, maxLength: 2500 },
  user: { type: Schema.Types.ObjectId, ref: "Person", required: true },
  date: { type: Date }
});

MessageSchema.virtual('date_formatted').get(function() {
  return DateTime.fromJSDate(this.date).toISODate();
});

module.exports = mongoose.model("Message", MessageSchema);