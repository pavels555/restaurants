const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String }
});

const schema: any = mongoose.model("users", userSchema);

export default schema;