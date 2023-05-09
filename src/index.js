// Fluxo por codigo
require("dotenv").config();
const TronWeb = require("tronweb");
const {
  validateWallet,
  ativateWallet,
  walletInfo,
  createTx,
} = require("./services/tronGrid");
const HttpProvider = TronWeb.providers.HttpProvider; // No se aun para que se usa esto
const fullNode = new HttpProvider("https://api.shasta.trongrid.io");
// const fullNode = "https://testhttpapi.tronex.io/wallet/";
const solidityNode = new HttpProvider("https://api.shasta.trongrid.io");
// const solidityNode = "https://testhttpapi.tronex.io";
const eventServer = new HttpProvider("https://api.shasta.trongrid.io");
// const eventServer = "https://testhttpapi.tronex.io";

const sideOptions = {
  fullNode: "https://suntest.tronex.io",
  solidityNode: "https://suntest.tronex.io",
  eventServer: "https://suntest.tronex.io",
  mainGatewayAddress: "TFLtPoEtVJBMcj6kZPrQrwEdM3W3shxsBU",
  sideGatewayAddress: "TRDepx5KoQ8oNbFVZ5sogwUxtdYmATDRgX",
  sideChainId: "413AF23F37DA0D48234FDD43D89931E98E1144481B",
};

/* const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, {
  fullNode: sideOptions.fullNode,
  solidityNode: sideOptions.solidityNode,
  eventServer: sideOptions.eventServer,
  mainGatewayAddress: sideOptions.mainGatewayAddress,
  sideGatewayAddress: sideOptions.sideGatewayAddress,
  sideChainId: sideOptions.sideChainId,
}); */

const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, process.env.PRIVATE_KEY);

tronWeb.setHeader({ "TRON-PRO-API-KEY": process.env.TRON_API_KEY });

// Cria uma nova wallet
let newWallet = async () => {
  const w = await tronWeb.createAccount();
  const wallet = JSON.parse(JSON.stringify(w));
  console.log(wallet);
  return wallet;
};

// newWallet();

// validateWallet(process.env.WALLET_ADDRESS)
// ativateWallet(process.env.WALLET_ADDRESS);
// walletInfo(process.env.WALLET_ADDRESS);

const main = async () => {
  const to = "TUw7BRkwvCnfKbsmnQZUUXiwaTPQ1hMYar";

  const unSignedTxn = await tronWeb.transactionBuilder.sendTrx(to, 1000000, process.env.WALLET_ADDRESS).catch((e) => {
    console.log(e);
  });

  const signedTxn = await tronWeb.trx.sign(unSignedTxn).catch((e) => {
    console.log(e);
  });

  const broadCast = await tronWeb.trx.sendRawTransaction(signedTxn).catch((e) => {
    console.log(e);
  });

  console.log(broadCast);

};

main();