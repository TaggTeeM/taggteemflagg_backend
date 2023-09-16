import * as jwt from 'jsonwebtoken'

export interface ExtendedJwtPayload extends jwt.JwtPayload {
    phoneNumber: string
}