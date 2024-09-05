import Joi from "joi";
import JoiOid from "joi-oid"

//Validador de creación
export const booksValidate = Joi.object({
  user_id: JoiOid.objectId().required().messages({
    'any.required': "please enter the user_id",
    'string.pattern.name': "product_id must be a ObjectId"
  }),
  title: Joi.string().required().messages({
    'any.required': "please enter the title",
  }),
  authors: Joi.string().required().messages({
    'any.required': "please enter the authors",
  }),
  publisher: Joi.string().required().messages({
    'any.required': "please enter the publisher",
  }),
  publishedDate: Joi.string().required().messages({
    'any.required': "please enter the date",
  }),
  description: Joi.string().required().messages({
    'any.required': "please enter the description",
  }),
  infoLink: Joi.string().required().messages({
    'any.required': "please enter the infoLink",
  }),
  coverImage: Joi.string().required().messages({
    'any.required': "please enter the coverImage",
  }),
  isbn: Joi.number().required().messages({
    'any.required': "please enter the isbn",
  }),
  read: Joi.boolean()
});

