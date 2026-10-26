import Event from '../models/Event.js';

// @desc    Fetch all events
// @route   GET /api/v1/events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 });
    res.status(200).json({ success: true, count: events.length, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error fetching events', error: error.message });
  }
};

// @desc    Fetch single event details
// @route   GET /api/v1/events/:id
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving event record', error: error.message });
  }
};

// @desc    Create a new event
// @route   POST /api/v1/events
export const createEvent = async (req, res) => {
  try {
    const { title, description, eventDate, venue, totalRegistrations } = req.body;

    if (!title || !description || !eventDate || !venue) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    const newEvent = await Event.create({
      title,
      description,
      eventDate,
      venue,
      totalRegistrations: totalRegistrations || 0,
    });

    res.status(201).json({ success: true, message: 'Event created successfully', data: newEvent });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create event', error: error.message });
  }
};

// @desc    Update existing event
// @route   PUT /api/v1/events/:id
export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ success: false, message: 'Event not found for update' });
    }

    res.status(200).json({ success: true, message: 'Event updated successfully', data: updatedEvent });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Update operation failed', error: error.message });
  }
};

// @desc    Delete event record
// @route   DELETE /api/v1/events/:id
export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ success: false, message: 'Event record not found' });
    }

    res.status(200).json({ success: true, message: 'Event record removed successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Deletion failed', error: error.message });
  }
};