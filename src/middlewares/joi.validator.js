function validator(schema) {
  return (req, res, next) => {
    try {
      const validation = schema.validate(req.body, { abortEarly: false });
      if (validation.error) {
        console.log(validation.error.details.map((error) => error.message));
        const message = validation.error.details.map((error) => error.message);
        const error = new Error(message);
        error.statusCode = 400;
        throw error;
      }
      return next();
    } catch (error) {
      return next(error);
    }
  };
}

export default validator;
