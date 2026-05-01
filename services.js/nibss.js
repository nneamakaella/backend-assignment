const axios = require("axios");

const baseURL = "https://nibssbyphoenix.onrender.com";

const loginNibss = async () => {
  const response = await axios.post(`${baseURL}/api/auth/token`, {
    apiKey: process.env.NIBSS_API_KEY,
    apiSecret: process.env.NIBSS_API_SECRET
  });

  return response.data.token;
};

const transferFunds = async (token, from, to, amount) => {
  const response = await axios.post(
    `${baseURL}/api/transfer`,
    { from, to, amount },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

module.exports = { loginNibss, transferFunds };