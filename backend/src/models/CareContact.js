import mongoose from 'mongoose';

const careContactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Index for faster queries
careContactSchema.index({ userId: 1 });

const CareContact = mongoose.model('CareContact', careContactSchema);

export default CareContact;
