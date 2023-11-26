import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { db } from "./db";


export const hashPassword = async (password) => {
  const saltRounds = 10;

  return await bcrypt.hash(password, saltRounds);
};

// console.log(hashPassword);

//we compare the hashedpassword to the text the user typed in
export const comparePassword = (plainTextPassword, hashedPassword) =>
  bcrypt.compare(plainTextPassword, hashedPassword);

  // console.log(comparePassword);
  

export const createJwt = (user:any) => {
  // return jwt.sign({ id: user.id }, 'cookies')
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

//validate the token
export const validateJWT = async (jwt) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload.payload ;
};

export const getUserFromCookie = async (cookies) => {
  // get the cookies from our header
  const jwt = cookies.get(process.env.COOKIE_NAME);
  // validate the coookie name 
  const { id } = await validateJWT(jwt.value);

  // get the user
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};
