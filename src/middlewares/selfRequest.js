async function selfRequest(req, res, next) {
  try {
    let { _id } = req.user;
    _id = _id.toString()
    const {receiver} = req.params;

    if (_id === receiver) {
      return res.error400("You cannot add yourself!");
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

export default selfRequest