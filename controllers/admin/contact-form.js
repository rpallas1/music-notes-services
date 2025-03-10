const ContactForm = require("../../models/ContactForm");
const { createCustomError } = require("../../errors/custom-error");

const getAllContactForms = async (req, res, next) => {
  const contactForms = await ContactForm.find(req.query);

  res.status(200).json({ contactForms, nbHits: contactForms.length });
};

const updateContactForm = async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  const allowedUpdates = ["reviewed"];
  const actualUpdates = Object.keys(updates);

  const isValidOperation = actualUpdates.every((update) =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    return next(
      createCustomError(
        `Invalid updates. Updates attempted: [${actualUpdates.toString()}]`,
        400,
      ),
    );
  }

  const contactForm = await ContactForm.findById(id);

  if (!contactForm) {
    return next(createCustomError(`No contact form found with id: ${id}`, 404));
  }

  actualUpdates.forEach((update) => {
    contactForm[update] = updates[update];
  });

  if (updates.reviewed) {
    contactForm.dateReviewed = updates.reviewed ? new Date() : null;
  }

  await contactForm.save();

  res.status(201).json({
    message: "Contact form updated successfully",
    contactForm,
  });
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
  deleteContactForm,
};
