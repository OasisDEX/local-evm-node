import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import process from "process";
import * as dotenv from "dotenv";

dotenv.config({ path: `${process.cwd()}/.env` });

const blockNumber = process.env.BLOCK_NUMBER!;
const chainId = process.env.CHAIN_ID ?? "2137";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    local: {
      url: "http://127.0.0.1:8545",
      timeout: 1000000,
      chainId: Number(chainId),
    },
    hardhat: {
      forking: {
        url: process.env.MAINNET_URL!,
        blockNumber: parseInt(blockNumber),
      },
      chainId: Number(chainId),
      mining: {
        auto: true,
      },
      hardfork: "london",
      gas: "auto",
      initialBaseFeePerGas: 1000000000,
      allowUnlimitedContractSize: true,
    },
  },
};

export default config;
