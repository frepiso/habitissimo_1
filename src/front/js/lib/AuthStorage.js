'use strict';

/**
 * Auth Storage
 */
class AuthStorage {
  /**
   * constructor
   */
  constructor() {
    this.accessToken = '';
  }
  /**
   * setAccesToken
   * @param {string} token
   */
  setAccesToken(token) {
    this.accessToken = token;
  }
  /**
   * getAccesToken
   * @return {string}
   */
  getAccesToken() {
    return this.accessToken;
  }
}

export default AuthStorage;
