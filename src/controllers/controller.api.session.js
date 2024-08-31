import { readByEmailService, updateService } from "../service/users.service.js";

async function register(req, res, next) {
  try {
    return res.message200(`We've sent you a verification email!`)
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    return res.cookie("token", req.token, { secure: true, sameSite: 'None', signedCookie: true, maxAge:3600000 }).message200("You're welcome!");
  } catch (error) {
    return next(error);
  }
}

async function data(req, res, next) {
    try {
      return res.message200(req.body)
    } catch (error) {
      return next(error);
    }
  }
  

async function logout(req, res, next) {
  try {
   return res.clearCookie("token", { secure: true, sameSite: "None"}).message200("Loged out")
  } catch (error) {
    return next(error);
  }
}

async function verify(req, res, next) {
  try {
   const {email, verifyCode} = req.params
   const one = await readByEmailService(email)
   if (!one) {
    return res.error404()
   }
   const correct = one.verifyCode === verifyCode
   if (!correct) {
    return res.error400("Invalid Credentials")
   } else {
    await updateService(one._id, {
      verify: true
    })
    return res.message200(`The account ${one.email} is ready to be used!`)
   }
  } catch (error) {
    return next(error);
  }
}

export {login,logout,register,data, verify}