import axios from "axios";

const API_URL = "https://backend.amirhoseinizadjou.com/";

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(API_URL + "api/auth/signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string, name: string) {
    return axios.post(API_URL + "api/auth/signup", {
      username,
      email,
      password,
      name
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
