const apiBaseUrl = process.env.LARAVEL_APP_URL || "http://localhost:8000/api";
const config = {
  userResourceApi: apiBaseUrl + "/users",
};

export default config;
