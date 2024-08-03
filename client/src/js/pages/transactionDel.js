import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for making HTTP requests

function TransactionComponent() {
  const [mnemonic, setMnemonic] = useState("");
  const [totalBalance, setTotalBalance] = useState("");
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [utxo, setUtxo] = useState([]);
  const [receiverAddress, setReceiverAddress] = useState("");
  const [ammount, setAmmount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");

  useEffect(() => {
    setMnemonic(
      "snake swamp wrong draw latin force swamp boring mixture need talk toast control hood fork supply diet betray"
    );

    // Step 1: Get Total Balance
    const getTotalBalance = async () => {
      try {
        const response = await axios.post(
          "https://btxt.app/api2/totalbalance",
          {
            mnemonic: mnemonic,
          }
        );
        setTotalBalance(response.data.totalBalance);
      } catch (error) {
        console.error("Error fetching total balance:", error);
      }
    };

    // Step 2: Get Address List
    const getAddressList = async () => {
      try {
        const response = await axios.post("https://btxt.app/api2/addresslist", {
          mnemonic: mnemonic,
        });
        setAddressList(response.data.addressList);
      } catch (error) {
        console.error("Error fetching address list:", error);
      }
    };

    getTotalBalance();
    getAddressList();
  });

  const getUtxo = async (senderAddress) => {
    console.log("FUNCTION CALLED ::: ", senderAddress);
    try {
      const response = await axios.get(
        `https://btxt.app/api2/utxo/${senderAddress}`
      );
      setUtxo(response.data);
      console.log("RESPONSE ::: ", response.data);
    } catch (error) {
      console.error("Error fetching UTXO:", error);
    }
  };

  useEffect(() => {
    getUtxo(selectedAddress)
  }, [selectedAddress]);

  // Step 5: Verify Transaction
  const verifyTransaction = async (txHASAH) => {
    try {
      const response = await axios.get(
        `https://btxt.app/api2/sendtransaction/${txHASAH}`
      );
      console.log(
        "Transaction verification:",
        JSON.stringify(response.data, null, 2)
      );
      setTransactionStatus(response.data.result);
    } catch (error) {
      console.error("Error verifying transaction:", error);
    }
  };

  // Step 4: Perform Transaction
  const performTransaction = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.13:3000/transaction",
        {
          RAddress: selectedAddress,
          tAddress: receiverAddress,
          pKey: getAddressPrivateKey(selectedAddress), // Implement this function
          sAmount: parseInt(ammount),
          txid: utxo.map((item) => item.txid),
          vout: utxo.map((item) => parseInt(item.vout)),
          vinamount: utxo.map((item) => parseInt(item.value)),
        }
      );

      console.log("TRANSACTION HASH ::: ", response.data);
      console.log("TRANSACTION HASH ::: ", response.data.txHashes);
      verifyTransaction(response.data.txHashes);
    } catch (error) {
      console.error("Error performing transaction:", error);
    }
  };

  

  // Helper function to get private key from selected address
  const getAddressPrivateKey = (address) => {
    const selectedAddressObj = addressList.find(
      (item) => item.address === address
    );
    return selectedAddressObj ? selectedAddressObj.privateKey : "";
  };

  return (
    <div>
      <h1>Transaction Component</h1>
      <p>Total Balance: {totalBalance}</p>
      <select onChange={(e) => setSelectedAddress(e.target.value)}>
        {addressList.map((addressObj, index) => (
          <option key={index} value={addressObj.address}>
            {addressObj.address}
          </option>
        ))}
      </select>

      {/* <button onClick={() => getUtxo(selectedAddress)}>Get UTXO</button> */}
      <input
        type="text"
        value={receiverAddress}
        onChange={(e) => {
          setReceiverAddress(e.target.value);
        }}
        placeholder="Enter Receiver Address"
      />

      <input
        type="number"
        value={ammount}
        onChange={(e) => {
          setAmmount(e.target.value);
        }}
        placeholder="Enter Amount"
      />
      <p>Transaction Status: {transactionStatus}</p>
      <button onClick={performTransaction}>Perform Transaction</button>
    </div>
  );
}

export default TransactionComponent;
// alladd