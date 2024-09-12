import { createService, readFriedRequestService } from '../service/friends.service.js';

async function sendFriendRequest(req, res, next) {
  try {
    const userId = req.user._id;  
    const { receiver } = req.params;

    const existingRequest = await readFriedRequestService(userId, receiver)

    if (existingRequest) {
      return res.error400("Friend request already sent");
    }

    await createService({ sender: userId, receiver })

    return res.message200("Friend request sent successfully");
  } catch (error) {
    return next(error);
  }
}

export default sendFriendRequest
