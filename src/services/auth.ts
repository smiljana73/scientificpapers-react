export const auth = { login, logout, isAuthenticated, getToken };

function login(token: string) {
  localStorage.setItem("token", token);
}

function logout() {
  localStorage.removeItem("token");
}

function isAuthenticated() {
  return localStorage.getItem("token") ? true : false;
}

function getToken() {
  return localStorage.getItem("token");
}
