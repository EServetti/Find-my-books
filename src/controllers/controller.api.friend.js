import { createService, readFriedRequestService, updateService } from '../service/friends.service.js';
import {createService as createNotification } from "../service/notification.service.js"
import { updateService as updateUser } from '../service/users.service.js';

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

async function answerFriendRequest(req, res, next) {
  try {
    const {nid} = req.params
    const {status, sender_id, receiver_id} = req.body
    await updateUser(sender_id, { $addToSet: { friends: receiver_id } })
    await updateUser(receiver_id, { $addToSet: { friends: sender_id } })
    const one = await updateService(nid, {status})
    return res.message200(`The request was ${status}`)
  } catch (error) {
    return next(error);
  }
}

export {sendFriendRequest, answerFriendRequest}
