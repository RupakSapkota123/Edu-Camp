import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter the name'],
  },
});

const User = mongoose.model('User', userSchema);

export default User;
