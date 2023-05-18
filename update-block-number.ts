import fetch from "node-fetch";
import { existsSync, writeFileSync, readFileSync } from "fs";
import process from "process";
import { ethers } from "ethers";

const envFile = `${process.cwd()}/.env`;
const newLine = "\n";
const blockNumberOffset = 10;

const updateNumber = async () => {
  const rpcUrl = process.env.MAINNET_URL!;

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const currentBlockNumber = await provider.getBlockNumber();
  const forkingBlockNumber = currentBlockNumber - blockNumberOffset;
  if (!currentBlockNumber) {
    console.error("❌ Block height not found");
    return;
  } else {
    console.log("😊 Found block height:", currentBlockNumber);
  }

  process.env.BLOCK_NUMBER = `${forkingBlockNumber}`;

  console.log(`🙌 Updated the block number with ${forkingBlockNumber}`);

  if (!existsSync(envFile)) {
    console.log(`✨ Creating .env file at ${envFile}`);
    writeFileSync(envFile, "", { flag: "w" });
  }

  const envFileContents = readFileSync(envFile, "utf8");
  const envFileContentLines = envFileContents
    .split(newLine)
    .filter((line: string) => !line.startsWith("BLOCK_NUMBER"));
  envFileContentLines.push(`BLOCK_NUMBER=${forkingBlockNumber}`);

  writeFileSync(envFile, envFileContentLines.join(newLine));

  try {
    writeFileSync(envFile, envFileContentLines.join(newLine));

    console.log(`🙌 Updated the block number with ${forkingBlockNumber}`);
  } catch (error) {
    console.error(`❌ Could not update the block number (${error})`);
  }
  console.log("");
};
updateNumber();
