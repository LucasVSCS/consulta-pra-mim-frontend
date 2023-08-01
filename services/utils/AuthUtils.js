import {parseCookies} from 'nookies'

export const getUserToken = (ctx) => {
    const cookies = parseCookies(ctx)
    return cookies.token
}