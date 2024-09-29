import Manager from "../Manager.mongo.js";
import FriendRequest from "../models/friendRequest.js";

const friendRequestsManager = new Manager(FriendRequest);

export default friendRequestsManager;