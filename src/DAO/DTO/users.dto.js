import crypto from "crypto"
import { createHash } from "../../utils/hash.js";


class UserDTO {
    constructor(data) {
        this.email = data.email;
        this.password = createHash(data.password);
        this.photo = data.photo || "/img/user.png";
        this.name = data.name;
        this.role = data.role || "user";
        this.verify = data.verify || false;
        this.verifyCode = crypto.randomBytes(6).toString("hex");
        this.resetPasswordToken = ""
        this.resetPasswordExpires = 0
    }
}

export default UserDTO