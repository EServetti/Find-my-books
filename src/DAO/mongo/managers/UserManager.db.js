import Manager from "../Manager.mongo.js";
import User from "../models/users.model.js";

const userManager = new Manager(User);

export default userManager;