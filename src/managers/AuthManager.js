export default class AuthManager {

    /**
     * Get the access token
     * @returns {string} access token
     */
    static getAccessToken() {
        return localStorage.getItem('access_token')
    }

    /**
     * Set the access token
     * @param token The token to set
     */
    static setAccessToken(token) {
        localStorage.setItem('access_token', token)
    }

    /**
     * Logout the user
     */
    static logout() {
        localStorage.removeItem('access_token')
    }

    /**
     * Check if we're logged in
     * @returns {boolean}
     */
    static isLoggedIn() {
        return this.getAccessToken() != null
    }

}