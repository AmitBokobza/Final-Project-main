const Joi = require("joi");

const recipeValidate = (recipe) => {
  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

  const schema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    web: Joi.string()
      .ruleset.regex(urlRegex)
      .rule({ message: "Web must be valid url address" })
      .allow(""),
    image: Joi.object()
      .keys({
        url: Joi.string()
          .ruleset.regex(urlRegex)
          .rule({ message: "Url must be valid" })
          .allow(""),
        alt: Joi.string().min(2).max(256).allow(""),
      })
      .required(),
  });

  return schema.validate(recipe);
};

module.exports = recipeValidate;
