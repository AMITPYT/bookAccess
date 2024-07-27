const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcryptjs');


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Author', 'Reader'],
    default: 'Reader'
  }
});

// userSchema.pre('save', async function(next) {
//   if (this.isModified('password') || this.isNew) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });

// userSchema.methods.comparePassword = async function(password) {
//   return bcrypt.compare(password, this.password);
// };

const User = mongoose.model('User', userSchema);
module.exports = User;
