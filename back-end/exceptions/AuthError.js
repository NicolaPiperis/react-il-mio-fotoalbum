class AuthError extends Error {
    constructor(message) {
        super(message);
        this.status = "401";
    }
}
  
  module.exports = AuthError;