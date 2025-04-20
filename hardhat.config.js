require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
    iitbh: {
      url: "http://10.10.6.203:8552",
      accounts: [
        "86daa121b47180ac3057fd50851a5df7e7128030a592dd09d096657fad04275c",
      ],
      chainId: 491002,
    },
  },
};
