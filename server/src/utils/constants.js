const BASE_IP = process.env.NODE_ENV === "production" ? "192.168.0.138" : "192.168.0.138";
const port = process.env.PORT || 5000;
const BASE_URL = process.env.NODE_ENV === "production" ? `http://${BASE_IP}:${port}` : `http://${BASE_IP}:${port}`;

module.exports = {
  BASE_URL,
  BASE_IP,
};
