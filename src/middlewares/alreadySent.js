import { readService } from "../service/friends.service.js";

async function alreadySent(req, res, next) {
  try {
    let { _id } = req.user;
    const { receiver } = req.params;
    const friendsRequests = await readService({ sender: _id });
    if (!friendsRequests) {
      return next();
    }
    const exist = friendsRequests.find(
      (f) => f.receiver.toString() === receiver
    );
    if (exist) {
      return res.error400("You've already sent a request to this user");
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

export default alreadySent