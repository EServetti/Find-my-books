import jwt from "jsonwebtoken"

function createToken (data) {
  const token = jwt.sign(data, process.env.SECRET_JWT, { expiresIn: 60 * 60})
  return token
}

function verifyToken(token) {
  const data = jwt.verify(token, process.env.SECRET_JWT)
  return data
}

function updateToken(currentToken, newToken) {
  const token = verifyToken(currentToken);

  if (token && token.exp) {
    // Firmar el nuevo token con la misma fecha de expiración que el token original
    const { exp } = token;
    newToken.exp = exp
    const updatedToken = jwt.sign(newToken, process.env.SECRET_JWT);
    return updatedToken;
  } else {
    const error = new Error("The current token doesn't have a valid exp date")
    error.statusCode = 400
    throw error
  }
}


export {createToken, verifyToken, updateToken}