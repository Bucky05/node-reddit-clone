class AuthenticationResponse {
    constructor(authenticationToken,refreshToken,expiresAt,username) {
        this.authenticationToken = authenticationToken
        this.refreshToken = refreshToken
        this.expiresAt = expiresAt
        this.username = username
    }
}