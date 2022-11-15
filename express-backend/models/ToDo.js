const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  complete: {type: Boolean, default: false},
  dateCreated: {type:String}, //Probably not the best to make this a string here, but we're always converting it...
  dateCompleted: {type: String}
});

//Export model
module.exports = mongoose.model("ToDo", ToDoSchema);