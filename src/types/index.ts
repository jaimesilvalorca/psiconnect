import {z} from 'zod'

export const authSchema = z.object({
    firstName: z.string(),
    lastName:z.string(),
    email:z.string(),
    password:z.string(),
    password_confirmation:z.string(),
    role: z.string(),
    description:z.string()
})

type Auth = z.infer<typeof authSchema>

export type UserRegisterForm = Pick<Auth, 'firstName' | 'lastName' | 'password' | 'email' | 'password_confirmation' | 'role' | 'description'>

export type UserRegisterSend = Pick<Auth, 'firstName' | 'lastName' | 'password' | 'email' | 'role' | 'description'>
export type UserLogin = Pick<Auth, 'email' | 'password'>


