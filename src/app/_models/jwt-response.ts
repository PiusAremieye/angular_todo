export interface JwtResponse {
    loggin_details:{
        user_details:{
            id: number,
            name: string, 
            email: string,
            password_digest: string
        },
        auth_token: string
    }
}
