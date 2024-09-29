import { readOneService } from "../service/users.service.js";
import cloudinary from "../utils/cloudinary.js";

async function saveImage(req, res, next) {
  try {
    const { photo } = req.body;
    const { nid } = req.params;
    if (!photo) {
      return next();
    }

    const base64Data = photo.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "image" }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(buffer);
    });

    req.body.photo = result.secure_url;

    //borro la foto anterior del usuario
    const user = await readOneService(nid);
    let oldPhoto = user.photo;
    if (oldPhoto === "/img/user.png") return next();
    else {
      oldPhoto = oldPhoto.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(oldPhoto, { resource_type: "image" });
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

export default saveImage;
