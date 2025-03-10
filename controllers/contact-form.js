const ContactForm = require("../models/ContactForm");

const createContactForm = async (req, res) => {
  const contactForm = await ContactForm.create(req.body);

  res.status(201).json({ contactForm });
};

module.exports = {
  createContactForm,
};
