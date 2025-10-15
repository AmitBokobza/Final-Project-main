const Joi = require("joi");

const updateValidation = (user) => {
  const schema = Joi.object({
    name: Joi.object()
      .keys({
        first: Joi.string().min(2).max(256).required(),
        middle: Joi.string().max(256).allow(""),
        last: Joi.string().min(2).max(256).required(),
      })
      .required(),

    phone: Joi.string()
      .ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
      .rule({ message: "Phone must be a valid israeli phone number" })
      .required(),

    image: Joi.object()
      .keys({
        url: Joi.string()
          .ruleset.regex(
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
          )
          .rule({ message: "must be valid url" })
          .allow(""),
        alt: Joi.string().max(256).allow(""),
      })
      .required(),

    address: Joi.object()
      .keys({
        country: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
      })
      .required(),
  });

  return schema.validate(user)
};

module.exports = updateValidation;