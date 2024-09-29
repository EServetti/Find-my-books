import Joi from "joi";
import JoiOid from "joi-oid";

export const sharedValidate = Joi.object({
  sharedWith: JoiOid.objectId().required().messages({
    "any.required": "please enter who was the book shared with",
  }),
  book: Joi.object({
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
    isbn: Joi.string().required().messages({
      'any.required': "this book can't be added because it doesn't have a isbn",
    }),
    read: Joi.boolean() 
  }),
});
