const ContactForm = require("../models/ContactForm");

const createContactForm = async (req, res) => {
  try {
    const contactForm = await ContactForm.create(req.body);

    res
      .status(201)
      .json({ message: "Contact form successfully created", contactForm });
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

module.exports = {
  createContactForm,
};
