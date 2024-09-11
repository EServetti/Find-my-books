import {
  readService,
  readOneService,
  createService,
  updateService,
  destroyService,
} from "../service/users.service.js";

//metodo read
async function read(req, res, next) {
  try {
    const { email } = req.query;
    const all = await readService();
    if (all.length === 0) {
      return res.error404();
    }
    const allEmail = all.filter((user) => user.email == email);
    //si existen usuarios con la category ingresada los devuelve
    if (allEmail.length !== 0) {
      return res.message200(allEmail);
    }
    //sino se ingreso una query devuelve todos los usuarios
    else if (!email) {
      return res.message200(all);
    }
    //si no existe la query ingresada devuelve un error
    else {
      return res.error404();
    }
  } catch (error) {
    return next(error);
  }
}
//metodo readOne
async function readOne(req, res, next) {
  try {
    const { nid } = req.params;
    if (nid === ":nid" || !nid) {
      return res.error400("You must enter nid!");
    }
    const one = await readOneService(nid);
    if (!one) {
      return res.error404();
    }
    return res.message200(one);
  } catch (error) {
    return next(error);
  }
}
//metodo update
async function update(req, res, next) {
  try {
    const { nid } = req.params;
    const data = req.body;
    if (nid === ":nid") {
      return res.error400("You must enter nid!");
    }
    const updated = await updateService(nid, data);
    if(!updated){
      return res.error404()
    }
    return res.message200(updated);
  } catch (error) {
    return next(error);
  }
}
//metodo destroy
async function destroy(req, res, next) {
  try {
    const { nid } = req.params;
    if (nid === ":nid") {
      return res.error400("You must enter nid!");
    }
    const eliminated = await destroyService(nid);
    if(!eliminated){
      return res.error404()
    }
    return res.message200(`The user ${eliminated.name} has been deleted`);
  } catch (error) {
    return next(error);
  }
}

export { read, readOne, update, destroy };
