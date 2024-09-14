import Joi from "joi";
import JoiOid from "joi-oid";

export const sharedValidate = Joi.object({
  sharedWith: JoiOid.objectId().required().messages({
    "any.required": "please enter who was the book shared with",
  }),
  book_id: JoiOid.objectId().required().messages({
    "any.required": "please enter the book_id",
  }),
});
