import Joi from "joi";


//Validador de creación
export const usersValidate = Joi.object({
  name: Joi.string().min(4).max(12).alphanum().required().messages({
    "any.required": "please enter a username",
    "string.min": "the name must have 4 characters min",
    "string.max": "the name can have 12 characters max",
    "string.alphanum": "name must be alpha-numeric",
  }),
  photo: Joi.string().uri().messages({
    "string.uri": "photo must be a real url",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "please enter your email",
    "string.email": "email must be valid",
  }),
  password: Joi
    .string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
    .required()
    .min(4)
    .max(12)
    .messages({
      "any.required": "please enter a password",
      "string.min": "the password must have 4 characters min",
      "string.max": "the password can have 12 characters max",
      "string.pattern.base":
        "the password must have at least one upper case, one lower case and one number.",
    }),
  role: Joi.string().valid('user', 'premium', 'admin'),
  verify: Joi.boolean(),
});

//Validador de actualización
export const updateUsersValidate = Joi.object({
  name: Joi.string().min(4).max(12).alphanum().messages({
    "any.required": "please enter a username",
    "string.min": "the name must have 4 characters min",
    "string.max": "the name can have 12 characters max",
    "string.alphanum": "name must be alpha-numeric",
  }),
  photo: Joi.string().uri().messages({
    "string.uri": "photo must be a real url",
  }),
  email: Joi.string().email().messages({
    "any.required": "please enter your email",
    "string.email": "email must be valid",
  }),
  password: Joi
    .string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
    .min(4)
    .max(12)
    .messages({
      "any.required": "please enter a password",
      "string.min": "the password must have 4 characters min",
      "string.max": "the password can have 12 characters max",
      "string.pattern.base":
        "the password must have at least one upper case, one lower case and one number.",
    }),
  role: Joi.string().valid('user', 'premium', 'admin'),
  verify: Joi.boolean(),
});

//Validador de actualización de password( recuperar tu contraseña)
// export const updatePassValidator = Joi.object({
//   uid: Joi.objectId(),
//   password: Joi
//     .string()
//     .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
//     .min(4)
//     .max(12)
//     .required()
//     .messages({
//       "any.required": "please enter a password",
//       "string.min": "the password must have 4 characters min",
//       "string.max": "the password can have 12 characters max",
//       "string.pattern.base":
//         "the password must have at least one upper case, one lower case and one number.",
//     }),
// });
