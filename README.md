# Local Node Project

This project use Hardhat to run local Ethereum node.

## Docker setup
### Requirements
- Docker
- Git

### Setup
1. Clone this repository
2. Run 
```shell
docker build -t local-node . &&  docker run -e MAINNET_URL={MAINNET_URL} -p 8545:8545 -i -t --name hardhat local-node`
```
For `MAINNET_URL` you can use Infura, Alchemy or Tenderly. 

## Local setup

Please add `.env` file to the root directory with the following content:

```text
BLOCK_NUMBER=1
MAINNET_URL={YOUR_MAINNET_URL}
```
For `MAINNET_URL` you can use Infura, Alchemy or Tenderly.

Then run the following commands:

```shell
yarn 
yarn run start
```
