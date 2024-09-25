import { createService, readFriedRequestService } from '../service/friends.service.js';
import {createService as createNotification } from "../service/notification.service.js"

async function sendFriendRequest(req, res, next) {
  try {
    const userId = req.user._id;  
    const { receiver } = req.params;

    const existingRequest = await readFriedRequestService(userId, receiver)

    if (existingRequest) {
      return res.error400("Friend request already sent");
    }

    const request = await createService({ sender: userId, receiver })
    await createNotification({sender: userId, receiver, type: "friendRequest", friendRequest: request._id})

    return res.message200("Friend request sent successfully");
  } catch (error) {
    return next(error);
  }
}

export default sendFriendRequest
