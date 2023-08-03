// servicios del API
require("dotenv").config();
const { default: axios } = require("axios");
const APIKEY = process.env.TRON_API_KEY;

const validateWallet = async (wallet) => {
  const url = "https://api.shasta.trongrid.io/wallet/validateaddress";
  const requestData = {
    address: "TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs",
    visible: true,
  };
  const response = await axios.post(url, requestData, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "TRON-PRO-API-KEY": APIKEY,
    },
  });
  console.log(response.data)
  return response;
};

// Create an account. Uses an already activated account to create a new account
const createAccount = async (wallet) => {
  const url = "https://api.shasta.trongrid.io/wallet/createaccount";

  const requestData = {
    owner_address: process.env.WALLET_ADDRESS,
    account_address: wallet,
    visible: true,
  };

  const response = await axios.post(url, requestData, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "TRON-PRO-API-KEY": APIKEY,
    },
  });
  console.log(response.data)
  return response;
};

const confirmTx = async (txId) => {
  const url = `https://api.shasta.trongrid.io/v1/transactions/${txId}/events`

  const requestData = {
    transactionID: txId,
  };
  
  const response = await axios.get(url);

  console.log(response.data)
  return response.data;
}

const createTx = async (ownerWallet, toAddress, amount) => {
  const url = "https://api.shasta.trongrid.io/wallet/createtransaction";
  const requestData = {
    owner_address: ownerWallet,
    to_address: toAddress,
    amount: amount,
    visible: true,
  };

  const response = await axios.post(url, requestData, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "TRON-PRO-API-KEY": APIKEY,
    },
  });
  console.log(response.data)
  return response.data;
};

const walletInfo = async (wallet) => {
  const url = `https://api.shasta.trongrid.io/v1/accounts/${wallet}`;

  const response = await axios.get(url, {
    headers: {
      Accept: "application/json",
      "TRON-PRO-API-KEY": APIKEY,
    },
  });
  console.log(response.data)
  return response;
};

module.exports = {
  confirmTx,
  createAccount,
  createTx,
  validateWallet,
  walletInfo,
};
