import React, { Component } from "react";
import axios from "axios";
import { get } from "lodash";

import Emitter from "@collaboratory/craft-service-emitter";
import Storage from "@collaboratory/craft-service-storage";

const authObserver = Emitter.get("auth");
const authStorage = Storage.get("auth");

export class AuthService {
  observer = false;

  _token = false;
  _user = false;
  _err = false;

  observer = false;

  constructor({ user = false, token = false, observer = false, ...config }) {
    this.config = config;
    this.observer = observer;
    this._user = user;
    this._token = token;
  }

  observe(event, data = null) {
    if (this.observer) {
      return this.observer.emit(event, data);
    }

    return false;
  }

  async signedRequest(request = {}) {
    const token = await this.token();
    if (token && token.length) {
      request.headers = Object.assign(
        {
          authorization: `Bearer ${token}`
        },
        request.headers || {}
      );
    }

    return request;
  }

  async user() {
    if (this._user === false) {
      const {
        userField = "user",
        tokenField = "user.access_token",
        errorField = "error",
        userEndpoint = "/api/user"
      } = this.config;
      this._user = axios
        .get(userEndpoint, await this.signedRequest())
        .then(res => {
          if (res.data && res.data[userField]) {
            this._user = res.data[userField];
            this.observe("user_change");

            if (res.data[tokenField]) {
              this._token = res.data[tokenField];
              this.observe("token_change");
            }

            return this._user;
          } else if (res.data && res.data[errorField]) {
            this.observe("auth_failure", { error: res.data[errorField] });
          } else {
            this.observe("auth_failure", { error: "user not found" });
          }
        })
        .catch(err => {
          this._user = false;
          this._token = false;
          this.observe("auth_failure", { error: err });
          this.observe("user_change");
          this.observe("token_change");
          return this._user;
        });
    }

    return this._user;
  }

  async token() {
    if (this._token === false && this._user !== false) {
      await this._user;
      return this._token;
    } else if (this._token !== false) {
      return this._token;
    }

    return false;
  }

  async login(payload) {
    const {
      userField = "user",
      tokenField = "user.access_token",
      loginSuccessField = "success",
      loginEndpoint = "/api/auth/login",
      errorField = "error"
    } = this.config;

    this._user = await axios
      .post(loginEndpoint, payload)
      .then(res => {
        const success = get(res.data, loginSuccessField);
        if (success) {
          const token = get(res.data, tokenField);
          const user = get(res.data, userField);
          if (token) {
            this._token = token;
            this.observe("token_change");
          }

          if (user) {
            this._user = user;
            this.observe("user_change");
          }
        } else {
          const error = get(res.data, errorField);
          if (error) {
            this.observe("auth_failure", { error });
          } else {
            this.observe("auth_failure", { error: "loginSuccessField failed" });
          }
        }

        return res.data[tokenField];
      })
      .catch(err => {
        this.observe("auth_failure", { error: err });
        return false;
      });
  }

  async logout() {
    const {
      logoutEndpoint = "/api/auth/logout",
      logoutSuccessField = "success"
    } = this.config;

    return axios
      .get(logoutEndpoint, await this.signedRequest())
      .then(res => {
        if (res.data[logoutSuccessField]) {
          this._user = false;
          this._token = false;
          return true;
        } else {
          return false;
        }
      })
      .catch(() => false);
  }

  isAuthenticating() {
    return this._user !== false && typeof this._user.then === "function";
  }

  async hasUser() {
    return !!await this._user;
  }

  async hasToken() {
    return !!await this._token;
  }
}

authObserver.on("auth_failure", error => {
  console.log("Auth failure", error);
});

authObserver.on("user_change", async data => {
  await authStorage.setItem("user", auth._user);
});

authObserver.on("token_change", async data => {
  await authStorage.setItem("token", auth._token);
});

const auth = new AuthService({
  user: authStorage.getItem("user"),
  token: authStorage.getItem("token"),
  observer: authObserver
});
export default auth;

export const withAuth = Wrapped => {
  return class AuthComponent extends Component {
    render() {
      return <Wrapped auth={auth} {...this.props} />;
    }
  };
};
