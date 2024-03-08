const Joi = require("joi");
const authValidate = {

  register: Joi.object().keys({
    id: Joi.required().messages({
      "any.required": "Id is mandatory.",
      "Number.empty": "iD is mandatory",
    }),
    name: Joi.string()
      .min(2)
      .required()
      .pattern(new RegExp(/^[a-zA-Z]+$/))
      .messages({
        "any.required": "Name is mandatory.",
        "string.empty": "Name is mandatory",
        "string.min": "Name contains at least 2 character.",
        "string.pattern.base": "Only Character allowed.",
      }),
    email: Joi.string()
      .min(2)
      .required()
      .messages({
        "any.required": "email is mandatory.",
        "string.empty": "email is mandatory",
        "string.min": "email contains at least 2 character.",
      }),
    userName: Joi.string().required().messages({
      "any.required": "Username is mandatory.",
      "string.empty": "Username is mandatory",
    }),

    categoryId: Joi.array(),
    image: Joi.string().allow(''),
  }),

};

module.exports = {
  authValidate,
};
