# Local Node Project

This project use Hardhat to run local Ethereum node.

## Docker setup
### Requirements
- Docker
- Git

> If you run it before, please remove the old container with `docker rm hardhat`

### Setup
1. Clone this repository

2. Run 
```shell
docker build -t local-node . &&  docker run -e MAINNET_URL={MAINNET_URL} -p {PORT}:8545 -i -t --name hardhat --rm local-node`
```
For `MAINNET_URL`, you can use Infura, Alchemy, or Tenderly. If you want to fork a network other than Ethereum mainnet, simply provide a RPC endpoint to the desired chain.
For `CHAIN_ID`, use your preferred number. The default is `2137`, which is our legacy number for the Ethereum mainnet fork. If you want to fork a different network, use a different `CHAIN_ID`.
For the `PORT`, use the port you want for the local node. We use `8545` in our other repositories. However, if you need to have multiple RPC nodes for multiple networks, use different ports.
## Local setup

Please add `.env` file to the root directory with the following content:

```text
BLOCK_NUMBER=1
MAINNET_URL={YOUR_MAINNET_URL}
CHAIN_ID={YOUR_CHAIN_ID}
```
`MAINNET_URL` and `CHAIN_ID` are explained earlier.

Then run the following commands:

```shell
yarn 
yarn run start
```
