import Manager from "../Manager.mongo.js";
import SharedBook from "../models/sharedBooks.js"

const sharedManager = new Manager(SharedBook);

export default sharedManager;