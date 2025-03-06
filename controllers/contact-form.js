const ContactForm = require("../models/ContactForm");
const { createCustomError } = require("../errors/custom-error");

const getAllContactForms = async (req, res) => {
  const contactForms = await ContactForm.find(req.query);

  res.status(200).json({ contactForms, nbHits: contactForms.length });
};

const updateContactForm = async (req, res, next) => {
  const contactForm = await ContactForm.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!contactForm) {
    return next(
      createCustomError(`No contact form with id: ${req.params.id}`, 404),
    );
  }

  res.status(200).json({ contactForm });
};

const createContactForm = async (req, res) => {
  const contactForm = await ContactForm.create(req.body);

  res.status(201).json({ contactForm });
};

const deleteContactForm = async (req, res, next) => {
  const contactForm = await ContactForm.findByIdAndDelete(req.params.id);

  if (!contactForm) {
    return next(
      createCustomError(`No contact form with id: ${req.params.id}`, 404),
    );
  }

  res.status(200).json({ contactForm });
};

module.exports = {
  getAllContactForms,
  updateContactForm,
  createContactForm,
  deleteContactForm,
};
