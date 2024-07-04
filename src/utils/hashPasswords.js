import bcrypt from "bcrypt";
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePassword(password, userPassword) {
  const match = await bcrypt.compare(password, userPassword);
  return match;
}
