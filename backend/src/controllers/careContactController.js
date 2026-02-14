import CareContact from '../models/CareContact.js';

// @desc    Get all care contacts
// @route   GET /api/care-contacts
// @access  Private
export const getCareContacts = async (req, res) => {
  try {
    const contacts = await CareContact.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create care contact
// @route   POST /api/care-contacts
// @access  Private
export const createCareContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const contact = await CareContact.create({
      userId: req.user._id,
      name,
      email,
      phone
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update care contact
// @route   PUT /api/care-contacts/:id
// @access  Private
export const updateCareContact = async (req, res) => {
  try {
    const contact = await CareContact.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    const { name, email, phone } = req.body;

    if (name) contact.name = name;
    if (email) contact.email = email;
    if (phone !== undefined) contact.phone = phone;

    await contact.save();
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete care contact
// @route   DELETE /api/care-contacts/:id
// @access  Private
export const deleteCareContact = async (req, res) => {
  try {
    const contact = await CareContact.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    await contact.deleteOne();
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
