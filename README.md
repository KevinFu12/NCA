<p align="center"><a href="https://identity.ic0.app" target="_blank" rel="noopener noreferrer"><img src="../NCA/src/NCA_frontend/public/assets/header/logo-NCA.png" alt="Internet Identity"></a></p>

## Introduction

Nature Call for Action (NCA) is a decentralized platform that motivate users to maintain a healthy and green environment through several green activities. It is built on the Internet Computer and uses the Motoko programming language. The platform is designed to be decentralized, secure, and scalable. It is also designed to be easy to use and accessible to everyone.

## Features
- Track your green activities and progress towards rewards.
- Daily Challenges, which is basically daily green actions with manageable targets with Green Coin as reward.
- Leaderboard to see how you are doing compared to others.
- Act, Submit, Earn, and Exchange! Your actions towards the reduction of CO2 emissions will be handsomely rewarded.
- NCA Hub Network: Connect with our community to learn, grow, and share knowledges among users in the world.
- NCA Wallet: Manage your Green Coins and other assets securely.

* Green Coins as in-app currencies for exchange in Carbon Credit.

## Pre-requisites

- Node.js (v20)
- DFX (v0.17.0)
- NPM (v7.24.0)
- WSL2 (Windows Subsystem for Linux)
- Ubuntu-22.04 LTS (WSL2)

## Getting Started (for Windows)

1. Run command 

Video Installation Guide and Demo
- [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [Motoko Programming Language Guide](https://internetcomputer.org/docs/current/motoko/main/motoko)
- [Motoko Language Quick Reference](https://internetcomputer.org/docs/current/motoko/main/language-manual)

If you want to start working on your project right away, you might want to try the following commands:

```bash
cd NCA/
dfx help
dfx canister --help
```

## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:4943?canisterId={asset_canister_id}`.

If you have made changes to your backend canister, you can generate a new candid interface with

```bash
npm run generate
```

at any time. This is recommended before starting the frontend development server, and will be run automatically any time you run `dfx deploy`.

If you are making frontend changes, you can start a development server with

```bash
npm start
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 4943.

### Note on frontend environment variables

If you are hosting frontend code somewhere without using DFX, you may need to make one of the following adjustments to ensure your project does not fetch the root key in production:

- set`DFX_NETWORK` to `ic` if you are using Webpack
- use your own preferred method to replace `process.env.DFX_NETWORK` in the autogenerated declarations
  - Setting `canisters -> {asset_canister_id} -> declarations -> env_override to a string` in `dfx.json` will replace `process.env.DFX_NETWORK` with the string in the autogenerated declarations
- Write your own `createActor` constructor

Contact:
Phone:
Email: 
# NCA
