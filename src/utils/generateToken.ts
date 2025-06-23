import Jwt from "jsonwebtoken";
export type payload = {
  id: string,
  username: string,
  email: string
  isAdmin: boolean
}
export const generateToken = (jwtPayload: payload)=> {
  const secret = process.env.JWT_SECRET as string
  const token = Jwt.sign(jwtPayload, secret,{
    expiresIn: '30d'
  })
  return token

}