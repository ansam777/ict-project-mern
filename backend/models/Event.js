import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      trim: true,
    },
    eventDate: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    venue: {
      type: String,
      required: [true, 'Venue location is required'],
      trim: true,
    },
    totalRegistrations: {
      type: Number,
      default: 0,
      min: [0, 'Registrations cannot be negative'],
    },
  },
  {
    timestamps: true,
  }
);

// Virtual field for a clean formatted Event ID
eventSchema.virtual('eventId').get(function () {
  return `EVT-${this._id.toString().slice(-6).toUpperCase()}`;
});

eventSchema.set('toJSON', { virtuals: true });
eventSchema.set('toObject', { virtuals: true });

export default mongoose.model('Event', eventSchema);