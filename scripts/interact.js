const { ethers, network } = require("hardhat");
const hre = require("hardhat");

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const constract = require('../artifacts/contracts/HelloWorld.sol/HelloWorld.json');
console.log(JSON.stringify(constract.abi));

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider("goerli", API_KEY);

//Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

//Contract
const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, constract.abi, signer);

async function main() {
    const message = await helloWorldContract.message();
    console.log("The message is:" + message);
    const tx = await helloWorldContract.update("kaka world!");
    await tx.wait();

    const newMessage = await helloWorldContract.message();
    console.log("The newMessage is:" + newMessage);

}
main();