import { authUrl } from "./initials"

class Auth {
  constructor(baseUrl){
    this.baseUrl = baseUrl
    this.headers = { 'Content-Type': 'application/json' }
  }

  async register({ email, password }) {
    const res = await fetch(`${this.baseUrl}/signup`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return this._getResposeData(res);
  }

  async authorize({ email, password }) {
    const res = await fetch(`${this.baseUrl}/signin`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await this._getResposeData(res);
    if (data.token){
      localStorage.setItem('token', data.token);
    }
  }

  async checkTokenValidity(token) {
    const res = await fetch(`${this.baseUrl}/users/me`, {
      headers: {...this.headers, "Authorization" : `Bearer ${token}`},
      method: "GET",
    });
    const data = await this._getResposeData(res);
    return data
  }

  async _getResposeData(res) {
    if (res.ok) {
      return await res.json();
    }
    throw new Error(res.statusText);
  }
}

export const auth = new Auth(authUrl)