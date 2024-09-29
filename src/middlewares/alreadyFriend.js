function alreadyFriend(req, res, next) {
  try {
    let { user } = req;
    const { receiver } = req.params;
    const already = user.friends.find((f) => f.toString() === receiver)
    if (already) {
        return res.error400("This user is already your friend")
    }
    return next()
  } catch (error) {
    return next(error);
  }
}

export default alreadyFriend