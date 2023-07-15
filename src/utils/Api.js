import { url, token } from "./initials";

class Api {
  constructor({ baseUrl, headers }) {
    this.headers = headers;
    this.baseUrl = baseUrl;
  }

  async getInitialCards() {
    const res = await fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
      method: "GET",
    });
    return this._getResposeData(res);
  }

  async getUserData() {
    const res = await fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
      method: "GET",
    });
    return this._getResposeData(res);
  }

  async patchUserData({ name, about }) {
    const res = await fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),
    });
    return this._getResposeData(res);
  }

  async updateAvatar({ avatar }) {
    const res = await fetch(`${this.baseUrl}/users/me/avatar`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar,
      }),
    });
    return this._getResposeData(res);
  }

  async postCard({ name, link }) {
    const res = await fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({
        name,
        link,
      }),
    });
    return this._getResposeData(res);
  }

  async deleteCard(_id) {
    const res = await fetch(`${this.baseUrl}/cards/${_id}`, {
      headers: this.headers,
      method: "DELETE",
    });
    return this._getResposeData(res);
  }

  async changeLikeCardStatus(_id, newLikeStatus) {
    let res;
    if (newLikeStatus) {
      res = await fetch(`${this.baseUrl}/cards/${_id}/likes`, {
        headers: this.headers,
        method: "PUT",
      });
    } else {
      res = await fetch(`${this.baseUrl}/cards/${_id}/likes`, {
        headers: this.headers,
        method: "DELETE",
      });
    }
    return this._getResposeData(res);
  }

  async _getResposeData(res) {
    if (res.ok) {
      return await res.json();
    }
    throw new Error(res.statusText);
  }
}

export const api = new Api({
  baseUrl: url,
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});
