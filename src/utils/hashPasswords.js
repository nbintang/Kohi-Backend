import bcrypt from "bcrypt";
export async function hashPassword(password, confirmPassword, res) {
  const salt = await bcrypt.genSalt();
  if (password !== confirmPassword) {
    res.status(400).json({
      message: "Passwords does not match",
    });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePassword(password, userPassword) {
  const match = await bcrypt.compare(password, userPassword);
  return match;
}
