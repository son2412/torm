import jwt from "jsonwebtoken";
export const AuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization || "";
  if (!token) {
    throw new Error("Token not found");
  }
  const access_token = token.split(" ")[1];
  console.log(access_token);
  req.token = token;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Token not found");
  }
  if (!decoded) {
    throw new Error("Token invalid");
  }
  req.member = decoded;
  next();
};
