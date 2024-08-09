import { User } from ".";

declare global {
  interface CustomJwtSessionClaims extends User {}
}
