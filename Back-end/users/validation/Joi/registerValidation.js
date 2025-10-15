const Joi = require("joi");

const registerValidation = (user) => {
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

    email: Joi.string()
      .ruleset.regex(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      )
      .rule({ message: "Email must be a valid email address" })
      .required(),

    password: Joi.string()
      .ruleset.regex(
        /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
      )
      .rule({
        message:
          "Password must contain at least one uppercase letter, lowecase letter, number and one special character. min 7 characters",
      })
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
    
    isCook: Joi.boolean().required()
  });

  return schema.validate(user)
};

module.exports = registerValidation;