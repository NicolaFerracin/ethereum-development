# neighborhood-voting

Visit site: https://neighborhood-voting.vercel.app/

Create a system for residents in your neighborhood to vote for projects

- As a manager you can create a neighborhood, verify residents and create proposals.
- Verified residents can contribute and vote on their neighborhood's proposals.
- At the end of the voting process, managers can either
  - finalize a proposal receiving the collected funds
  - reject it giving each contributor the possibility to withdraw their contribution to that proposal

## Solidity

### Setup

- `cd ./ethereum && yarn`

### Local

- compile with `yarn compile`
- start a local node with `yarn start-node`
- deploy with `yarn deploy`

### Deploy

- set the `defaultNetwork` in `hardhat.config.js`
- ensure the `.env` file contains `MNEMONIC` and `INFURA_PROJECT_ID`
- run `yarn deploy`

## Frontend

### Setup

- `cd ./app && yarn`

### Local

- you need to deploy the contracts and get the address
- replace the address in `neighborhoodFactory.js`
- run with `yarn dev`

### Using a public network

- create an `.env.local` file and set `NEXT_PUBLIC_INFURA_PROJECT_ID`
- run with `yarn dev`
