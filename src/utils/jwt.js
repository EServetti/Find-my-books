import jwt from "jsonwebtoken"

function createToken (data) {
  const token = jwt.sign(data, process.env.SECRET_JWT, { expiresIn: 60 * 60})
  return token
}

function verifyToken(token) {
  const data = jwt.verify(token, process.env.SECRET_JWT)
  return data
}


export {createToken, verifyToken}