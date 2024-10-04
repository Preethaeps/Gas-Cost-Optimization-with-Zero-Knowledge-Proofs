
let web3;
let contract;

const contractAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"; // Replace with the contract address
const contractABI = []; // Replace with the contract's ABI from Remix

window.addEventListener('load', async () => {
    // Check if the web3 instance is injected (e.g., by MetaMask)
    web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

    // Initialize the contract using ABI and address
    contract = new web3.eth.Contract(contractABI, contractAddress);
});

document.getElementById('healthForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const glucose = document.getElementById('glucose').value;
    const cholesterol = document.getElementById('cholesterol').value;
    const min_glucose = document.getElementById('min_glucose').value;
    const max_glucose = document.getElementById('max_glucose').value;
    const min_cholesterol = document.getElementById('min_cholesterol').value;
    const max_cholesterol = document.getElementById('max_cholesterol').value;

    // Prepare the proof (dummy values, you'll need real proof)
    const proof = {
        a: [0x0b78e550a1a24751982472f98d1c2de9b0225b24af9623798afecd9e407c529a,
            0x00ebb1863fdbe278b86638bb468e601e13fc7b6e148684c1fae00708f8861b21], // Replace with real proof values
        b: [[0x257b896e09930e74425135150fc542635a8e74caaedee2a73bb310718e3d7093, 0x275df91b144ec8a3e9773496627c5aa860fa9ad99e3628db46673e130bcb2eff], [0x2cff9d0a362214b1dd513f3b2bf20529d851995638b349bcf06887e004f8f6a1, 0x0f037dbe962893c08ed8d1cb1241a2b112772ad2c049d13418342760df00919b]], // Replace with real proof values
        c: [0x18f447e1a155e83268030058e8cfdb79a3dff8743eb7e01bf6e568a5dcb90c06, 0x0f6929b6298c9ce76c1aeba88ad542b4a4b905a0c26c26fa98d04bb1198334d7], // Replace with real proof values
        input: [glucose, cholesterol] // Inputs for your verifier contract
    };
    try {
        const result = await contract.methods.verifyProof(proof.a, proof.b, proof.c, proof.input).call({from: accounts[0]});
        document.getElementById('result').innerHTML = `Verification Result: ${result}`;
    } catch (error) {
        console.error("Error verifying proof:", error);
        document.getElementById('result').innerHTML = "Error verifying proof.";
    }
});