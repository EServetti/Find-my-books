import Manager from "../Manager.mongo.js";
import Notification from "../models/notification.model.js";

const notificationManager = new Manager(Notification);

export default notificationManager;