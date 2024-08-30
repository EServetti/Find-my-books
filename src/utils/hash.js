import { hashSync, genSaltSync, compareSync } from "bcrypt";

function createHash (password) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt)
  return hash
}

function compareHash (reqPass, dbPass) {
  const compare = compareSync(reqPass, dbPass);
  return compare
}

export {createHash, compareHash}