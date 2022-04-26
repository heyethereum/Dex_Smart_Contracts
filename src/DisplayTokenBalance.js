import { React, useEffect, useState } from "react";
import tokenAbi from "./artifacts/NUSMoneyToken.json";
import bankAbi from "./artifacts/NUSBank.json";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useWeb3React } from "@web3-react/core";
import Button from "@mui/material/Button";

export const TokenAddress = "0x7186721d6C40ddefa4C8E151964b02a4D24E3131";
export const BankAddress = "0xB61271d05D13A29e6379E18D533f6c1B110d46Db";

const TokenAmount = "100";

const DisplayTokenBalance = () => {
  //connector, library, chainId, account, activate, deactivate
  const web3reactContext = useWeb3React();
  const [provider, setProvider] = useState(undefined);
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [balance, setBalance] = useState(0);
  const [bankContract, setBankContract] = useState(undefined);
  const [isLoading, setLoading] = useState(false);

  const toBytes32 = (text) => ethers.utils.formatBytes32String(text);
  // Useful conversion Functions
  // const toString = (bytes32) => ethers.utils.parseBytes32String(bytes32);
  const toWei = (ether) => ethers.utils.parseEther(ether);
  // const toEther = (wei) => ethers.utils.formatEther(wei.toString());
  // const toRound = (num) => Number(num).toFixed(2);

  console.log("account now is:", web3reactContext.account);
  console.log("Bytes32 is:", toBytes32("NUSMoney"));

  useEffect(() => {
    const init = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      console.log("I am in init function");
      const signer = await provider.getSigner();
      const bankContract = await new ethers.Contract(
        BankAddress,
        bankAbi.abi,
        signer
      );
      setBankContract(bankContract);

      const contract = new ethers.Contract(
        TokenAddress,
        tokenAbi.abi,
        provider
      );
      contract.symbol().then((val) => setTokenSymbol(val));
      contract
        .balanceOf(web3reactContext.account)
        .then((val) => setBalance(formatEther(val)));
      console.log("Wallet Balance:", balance);
    };
    init();
  }, [web3reactContext.account, balance]);

  const requestTokens = async (e) => {
    e.preventDefault();

    setLoading(true);
    console.log("Bank Contract", bankContract);
    const transactionHash = await bankContract.sendTokens(
      toWei(TokenAmount),
      toBytes32(tokenSymbol)
    );
    console.log(`Loading - ${transactionHash.hash}`);
    await transactionHash.wait();
    console.log(`Success - ${transactionHash.hash}`);

    setLoading(false);
    setBalance(balance);

    window.location.reload();
  };

  const switchNetwork = async () => {
    try {
      console.log("chain id", `0x${Number(3).toString(16)}`);
      await web3reactContext.library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${Number(3).toString(16)}` }],
      });
    } catch (switchError) {
      // 4902 error code indicates the chain is missing on the wallet
      if (switchError.code === 4902) {
        try {
          await web3reactContext.library.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${Number(3).toString(16)}`,
                rpcUrls: ["https://ropsten.infura.io/v3/"],
                chainName: "Ropsten Test Network",
                nativeCurrency: { name: "ETH", decimals: 18, symbol: "ETH" },
                blockExplorerUrls: ["https://ropsten.etherscan.io"],
              },
            ],
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <div>
      {web3reactContext.active && web3reactContext.chainId !== 3 ? (
        <Button onClick={switchNetwork} variant="contained" color="primary">
          Switch to Ropsten Testnet
        </Button>
      ) : null}
      {web3reactContext.active &&
      balance > 0 &&
      web3reactContext.chainId === 3 ? (
        <h3>
          Balance: {balance} {tokenSymbol}
        </h3>
      ) : (
        <></>
      )}
      {web3reactContext.active && web3reactContext.chainId === 3 ? (
        <div>
          <Button
            onClick={requestTokens}
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            Request for $NUSMoney
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default DisplayTokenBalance;
