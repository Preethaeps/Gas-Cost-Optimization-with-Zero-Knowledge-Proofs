pragma solidity ^0.8.0;

import "truffle/Assert.sol"; // Optional: only if you want to use Assert functions
import "./verifier.sol"; // Replace with your actual contract name
function testGasConsumption() public {
        uint256 gasStart = gasleft();
        
        // Call your proof generation function
        yourContract.generateProof(/* parameters */);
        
        uint256 gasAfterGeneration = gasleft();
        
        // Call your proof verification function
        yourContract.verifyProof(/* parameters */);
        
        uint256 gasAfterVerification = gasleft();

        uint256 gasUsedForGeneration = gasStart - gasAfterGeneration;
        uint256 gasUsedForVerification = gasAfterGeneration - gasAfterVerification;

        // Assert that the gas usage is within acceptable limits (you can define your own limits)
        Assert.isTrue(gasUsedForGeneration < 300000, "Gas consumed for proof generation exceeds limit");
        Assert.isTrue(gasUsedForVerification < 200000, "Gas consumed for proof verification exceeds limit");
    }
}
