import React, { useEffect, useState } from "react";
import "./walletnavbar.css";
import blocx from "../assets/image.png";
import axios from "axios";
import QR from "../assets/qrcode.png";
import QRCode from "qrcode.react";
import nodata from "../assets/nodata.png";
import bnb from "../assets/BNB.png";
import eth from "../assets/ETH.png";

function Walletnavbar() {
  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(true);

  const [selectedOption, setSelectedOption] = useState("BLOCX Mainnet");
  const [balance, setBalance] = useState(null);
  const [usd, setUSD] = useState(null);
  const [ethusd, setETHUSD] = useState(null);
  const [bscusd, setBSCusd] = useState(null);
  const [userEthAddress, setuserEthAddress] = useState(null);
  const [EthBalance, setEthBalance] = useState();
  const [BscBalance, setBscBalance] = useState();
  const [transaction, setTransaction] = useState([]);
  const [ETHtransaction, setETHTransaction] = useState([]);
  const [BSCtransaction, setBSCTransaction] = useState([]);
  const [alladd, setAlladd] = useState([]);

  const [ETHcurrentPage, setETHCurrentPage] = useState(1);
  const [BSCcurrentPage, setBSCCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(20);

  function weiToBnb(wei) {
    return (wei / 10 ** 18).toFixed(5);
  }

  const pageNumbers = (ETHcurrentPage, totalPages) => {
    const pageLinksToShow = 5;
    let startPage, endPage;

    if (totalPages <= pageLinksToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrentPage = Math.floor(pageLinksToShow / 2);
      const maxPagesAfterCurrentPage = Math.ceil(pageLinksToShow / 2) - 1;
      if (ETHcurrentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = pageLinksToShow;
      } else if (ETHcurrentPage + maxPagesAfterCurrentPage >= totalPages) {
        // Near the end
        startPage = totalPages - pageLinksToShow + 1;
        endPage = totalPages;
      } else {
        startPage = ETHcurrentPage - maxPagesBeforeCurrentPage;
        endPage = ETHcurrentPage + maxPagesAfterCurrentPage;
      }
    }

    // Create an array of pages
    const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
    return pages;
  };


  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [currentPage, setCurrentPage] = useState(0);
  
  function padZero(num) {
    return num.toString().padStart(2, "0");
  }
  const [currentAddressIndex, setCurrentAddressIndex] = useState(0);

  const handleGenerateAddress = (direction) => {
    if (direction === "next") {
      setCurrentAddressIndex((prevIndex) => prevIndex + 1);
    } else if (direction === "prev") {
      setCurrentAddressIndex((prevIndex) => prevIndex - 1);
    }
  };

  const key = localStorage.getItem("keyW");
  const keyW = key;

  useEffect(() => {
    const address = sessionStorage.getItem("address");
    // console.log("NORMAL VARIABLE ----- ", key)
    console.log("USE STATE VARIABLE ----- ", keyW)
  }, []);

  const fetchData = async (option) => {
    // console.log("KEY --- ", keyW);
    setLoading(true);

    let apiUrl;
    let requestData;
    switch (option) {
      case "BLOCX Mainnet":
        apiUrl = {
          totalBalance: { url: "https://btxt.app/api2/totalbalance", method: "POST", data: { mnemonic: keyW } },
          rateUSD: { url: "https://api.coingecko.com/api/v3/simple/price?ids=blocx-2&vs_currencies=usd", method: "GET" },
          transaction: { url: "https://btxt.app/api2/addresstxall", method: "POST", data: { mnemonic: keyW } },
          addressList: { url: "https://btxt.app/api2/addresslist", method: "POST", data: { mnemonic: keyW } }
        };
        break;
      case "Ethereum Mainnet":
        try {

          const generateWalletResponse = await axios.post("https://btxt.app/api2/generate-ethereum-wallet", { mnemonic: keyW });
          const userEthAddress = generateWalletResponse.data?.address;
          setuserEthAddress(generateWalletResponse.data?.address);

          const ethBalanceUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${userEthAddress}&tag=latest&apikey=PUF6DTZSKG8H8UATWYKZ5RDRY7N29F4MXD`;


          const ethBalanceResponse = await axios.get(ethBalanceUrl);
          const ethBalance = ethBalanceResponse.data.result;
          // console.log("EBALANCE ---- ", ethBalance) ;

          setEthBalance(ethBalance);

          const ethTransactionUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${userEthAddress}&startblock=0&endblock=99999999&page=${ETHcurrentPage}&offset=5&sort=asc&apikey=PUF6DTZSKG8H8UATWYKZ5RDRY7N29F4MXD`;


          const ethTransactionResponse = await axios.get(ethTransactionUrl);
          const ethTransactions = ethTransactionResponse.data.result;

          // console.log("ETRANSACTION ---- ", JSON.stringify(ethTransactions, null, 2));

          setETHTransaction(ethTransactions);

          const ETHrateusd = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`;


          const ethUSD = await axios.get(ETHrateusd);
          const ethUSDData = ethUSD.data["ethereum"].usd;

          setETHUSD(ethUSDData);

          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }

        break;
      case "Binance Smart Chain":
        try {
          const generateWalletResponse = await axios.post("https://btxt.app/api2/generate-ethereum-wallet", { mnemonic: keyW });
          const userEthAddress = generateWalletResponse.data?.address;
          setuserEthAddress(generateWalletResponse.data?.address);

          const bscBalanceUrl = `https://api.bscscan.com/api?module=account&action=balance&address=${userEthAddress}&apikey=K2W86S2MV2MHPHQIMYZUPGG5634QKM3YHW`;


          const bscBalanceResponse = await axios.get(bscBalanceUrl);
          const bscBalance = bscBalanceResponse.data.result;
          // console.log("EBALANCE ---- ", ethBalance) ;

          setBscBalance(bscBalance);

          const bscTransactionUrl = `https://api.bscscan.com/api?module=account&action=txlist&address=${userEthAddress}&startblock=0&endblock=99999999&page=${BSCcurrentPage}&offset=5&sort=asc&apikey=K2W86S2MV2MHPHQIMYZUPGG5634QKM3YHW`;


          const bscTransactionResponse = await axios.get(bscTransactionUrl);
          const bscTransactions = bscTransactionResponse.data.result;

          // console.log("ETRANSACTION ---- ", JSON.stringify(ethTransactions, null, 2));

          setBSCTransaction(bscTransactions);

          const BSCrateusd = `https://api.coingecko.com/api/v3/simple/price?ids=binance-bridged-usdt-bnb-smart-chain&vs_currencies=usd`;


          const bscUSD = await axios.get(BSCrateusd);
          const bscUSDData = bscUSD.data["binance-bridged-usdt-bnb-smart-chain"].usd;

          setBSCusd(bscUSDData);

          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }

        break;
      default:
        // Handle default case or error if needed
        break;
    }

    // Make API calls based on the selected option
    if (apiUrl) {
      try {
        const responses = await Promise.all(
          Object.entries(apiUrl).map(async ([key, value]) => {
            const { url, method, data } = value;
            if (method === "GET") {
              return axios.get(url);
            } else if (method === "POST") {
              return axios.post(url, data);
            }
          })
        );

        responses.forEach((response, index) => {
          const responseData = response.data;
          switch (Object.keys(apiUrl)[index]) {
            case "totalBalance":
              setBalance(responseData.totalBalance);
              break;
            case "rateUSD":
              setUSD(responseData["blocx-2"].usd);
              break;
            case "transaction":
              setTransaction(responseData.transactions);
              break;
            case "addressList":
              setAlladd(responseData.addressList);
              break;

            default:
              // Handle default case or error if needed
              break;
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData(selectedOption);
  }, [selectedOption, userEthAddress, ETHcurrentPage, BSCcurrentPage]);

  const handleOptionChange = (event) => {
    const newOption = event.target.value;
    console.log("Selected option changed to:", newOption);
    setSelectedOption(newOption);
    fetchData(newOption);
  };

  return (
    <div className="wallet_screen">
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="../assets/LOGO.svg" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <select
                  className="form-select nav_button mt-3"
                  aria-label="Default select example"
                  value={selectedOption}
                  onChange={handleOptionChange}
                >
                  <option className="text-dark" value="BLOCX Mainnet">
                    BLOCX Mainnet
                  </option>
                  <option className="text-dark" value="Ethereum Mainnet">
                    Ethereum Mainnet
                  </option>
                  <option className="text-dark" value="Binance Smart Chain">
                    Binance Smart Chain
                  </option>
                </select>
              </li>
            </ul>
          </div>


        </div>
      </nav>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-lg-3">
            <div className="cust-card h-100">
              <div className="cust-card-header">
                <div className="position-relative">
                {selectedOption === "BLOCX Mainnet" && (
      <img src={blocx} alt="BLOCX Mainnet Logo" />
    )}
    {selectedOption === "Ethereum Mainnet" && (
      <img src={eth} alt="Ethereum Mainnet Logo" />
    )}
    {selectedOption === "Binance Smart Chain" && (
      <img src={bnb} alt="Binance Smart Chain Logo" />
    )}
                
                </div>
              </div>
              <div className="cust-card-body position-relative">
              <div className="logocard">
 
      <img src="../assets/LOGO.svg" alt="BLOCX Mainnet Logo" />
  
  </div>
                <div className="col-12 custMT60">
                  <div className="small-card custPT overflow-visible">
                    {selectedOption === "BLOCX Mainnet" && (
                      <div className="row">
                        <div className="col-md-6 col-12 v1">
                          <h3 className="cardh w-break">
                            {balance}
                            <span className="f-13"></span>
                          </h3>
                          <h3 className="cardb">BLOCX</h3>
                        </div>
                        <div className="col-md-6 col-12">
                          <h3 className="cardh w-break">
                            {" "}
                            {usd * balance}
                            <span className="f-13"></span>{" "}
                          </h3>
                          <h3 className="cardb">USD</h3>
                        </div>
                      </div>
                    )}
                    {selectedOption === "Ethereum Mainnet" && (
                      <div className="row">
                        <div className="col-md-6 col-12 v1">
                          <h3 className="cardh w-break">
                            {EthBalance}
                            <span className="f-13"></span>
                          </h3>
                          <h3 className="cardb">ETH</h3>
                        </div>
                        <div className="col-md-6 col-12">
                          <h3 className="cardh w-break">
                            {" "}
                            {EthBalance * ethusd}
                            <span className="f-13"></span>{" "}
                          </h3>
                          <h3 className="cardb">USD</h3>
                        </div>
                      </div>
                    )}
                    {selectedOption === "Binance Smart Chain" && (
                      <div className="row">
                        <div className="col-md-6 col-12 v1">
                          <h3 className="cardh w-break">
                            {BscBalance}
                            <span className="f-13"></span>
                          </h3>
                          <h3 className="cardb">BSC</h3>
                        </div>
                        <div className="col-md-6 col-12">
                          <h3 className="cardh w-break">
                            {" "}
                            {BscBalance * bscusd}
                            <span className="f-13"></span>{" "}
                          </h3>
                          <h3 className="cardb">USD</h3>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="cust-card h-100">
              <div className="wallet-card-header">
                <h4 className="titlecard">Send Coin (BLOCX)</h4>
              </div>
              <div className="send-body">
                <div className="row">
                  <div className="form-group col-12 mb-3">
                    <label htmlFor="name">
                      Address *
                      <i
                        className="bx bx-info-circle cursorp"
                        title=" Fees Amount not Included in this"
                      ></i>
                    </label>
                    <input
                      type="text"
                      className="form-control b_c_input"
                      autoComplete="false"
                    />
                  </div>
                  <div className="form-group col-6 mb-3">
                    <label htmlFor="name">
                      Amount *
                      <i
                        className="bx bx-info-circle cursorp"
                        title=" Fees Amount not Included in this"
                      ></i>
                    </label>
                    <input type="number" className="form-control b_c_input" />
                  </div>
                  <div className="form-group col-6 mb-3">
                    <label htmlFor="name">
                      USD Amount
                      <i
                        className="bx bx-info-circle cursorp"
                        title=" Fees Amount not Included in this"
                      ></i>
                    </label>
                    <input
                      type="number"
                      className="form-control b_c_input"
                      autoComplete="false"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            {/* CUSTOM CARD */}
            <div className="cust-card h-100">
              <div className="wallet-card-header">
                <h4 className="titlecard">Receive Coin (BLOCX)</h4>
              </div>

              {selectedOption === "BLOCX Mainnet" && (
                <div className="receive-body">
                  <div className="row">
                    <div className="col-md-4 col-12 mb-3 d-flex justify-content-center cust-center my-auto col-xl-5 col-lg-5">
                      <div>
                        <QRCode value={alladd[currentAddressIndex]?.address} />
                      </div>
                    </div>
                    <div className="col-md-8 col-12 mb-3 col-xl-7 col-lg-7">
                      <p className="rc-txt mb-3">
                        Scan the QR code or copy the address to receive coin.
                      </p>
                      <div className="input-group address_input">
                        <span className="form-control text-truncate text-center bordernone">
                          {alladd[currentAddressIndex]?.address}
                        </span>
                        <div className="input-group-append bordernone">
                          <span className="input-group-text ">
                            <i className="bx bx-copy" title="Copy Address"></i>
                          </span>
                        </div>
                      </div>
                      <div className="col-12 text-center mt-4">
                        <button
                          className="icon-primary"
                          onClick={() => handleGenerateAddress("prev")}
                          disabled={currentAddressIndex === 0}
                        >
                          <i
                            className="f-25 bx bx-left-arrow-alt"
                            title="Previous Address"
                          ></i>
                        </button>
                        <button
                          className="icon-primary"
                          onClick={() => handleGenerateAddress("next")}
                          disabled={currentAddressIndex === alladd.length - 1}
                        >
                          <i
                            className="f-25 bx bx-right-arrow-alt"
                            title="Next Address"
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}


              {selectedOption === "Ethereum Mainnet" && (
                <div className="receive-body">
                  <div className="row">
                    <div className="col-md-4 col-12 mb-3 d-flex justify-content-center cust-center my-auto col-xl-5 col-lg-5">
                      <div>
                        <QRCode value={userEthAddress} />
                      </div>
                    </div>
                    <div className="col-md-8 col-12 mb-3 col-xl-7 col-lg-7">
                      <p className="rc-txt mb-3">
                        Scan the QR code or copy the address to receive coin.
                      </p>
                      <div className="input-group address_input">
                        <span className="form-control text-truncate text-center bordernone">
                          {userEthAddress}
                        </span>
                        <div className="input-group-append bordernone">
                          <span className="input-group-text ">
                            <i className="bx bx-copy" title="Copy Address"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedOption === "Binance Smart Chain" && (
                <div className="receive-body">
                  <div className="row">
                    <div className="col-md-4 col-12 mb-3 d-flex justify-content-center cust-center my-auto col-xl-5 col-lg-5">
                      <div>
                        <QRCode value={userEthAddress} />
                      </div>
                    </div>
                    <div className="col-md-8 col-12 mb-3 col-xl-7 col-lg-7">
                      <p className="rc-txt mb-3">
                        Scan the QR code or copy the address to receive coin.
                      </p>
                      <div className="input-group address_input">
                        <span className="form-control text-truncate text-center bordernone">
                          {userEthAddress}
                        </span>
                        <div className="input-group-append bordernone">
                          <span className="input-group-text ">
                            <i className="bx bx-copy" title="Copy Address"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12">
            <h4 className="titlecard">Transaction History (BLOCX)</h4>
            <div className="cust-card txtable my-3">
            {transaction.length === 0 ? (
                <div className="no-data-image d-flex justify-content-center align-items-center py-5">
                  <img src={nodata} alt="No Data" />
                </div>
              ) : (
              <div className="table-responsive">
                <table className=" table text-center table-striped mb-0 ">
                  <thead className="cust-head">
                    <tr>
                      <th>#</th>
                      <th>Timestamp</th>
                      <th>Txid</th>
                      <th>Sent</th>
                      <th>Received</th>
                      <th>Balance</th>
                      <th>Amount</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  {selectedOption === "BLOCX Mainnet" && (<tbody>
                    {
                      Array.isArray(transaction) && transaction.length > 0 ? (
                        transaction
                          .slice(currentPage * 5, (currentPage + 1) * 5)
                          .map((ele, index) => {
                            const actualIndex = currentPage * 5 + index + 1;
                            const date = new Date(ele.timestamp * 1000);
                            const formattedDate = `${date.getDate()}, ${monthNames[date.getMonth()]
                              } ${date.getFullYear()} ${padZero(
                                date.getHours()
                              )}:${padZero(date.getMinutes())} ${date.getHours() >= 12 ? "PM" : "AM"
                              }`;

                            return (
                              <tr key={ele.id}>
                                <td>{actualIndex}</td>
                                <td>{formattedDate}</td>
                                <td>{ele.txid}</td>
                                <td>{ele.sent}</td>
                                <td>{ele.received}</td>
                                <td>{ele.balance}</td>
                                <td>{ele.amount}</td>
                                <td>{ele.type}</td>
                              </tr>
                            );
                          })
                      ) : (
                        <tr>
                          <td colSpan="8">No transactions found</td>
                        </tr>
                      )
                    }
                  </tbody>
                  )}
                  {selectedOption === "Ethereum Mainnet" && (<tbody>
                    {Array.isArray(ETHtransaction) && ETHtransaction.length > 0 ? (
                      ETHtransaction.map((ele, index) => {
                        const date = new Date(ele.timeStamp * 1000);
                        const formattedDate = `${date.getDate()}, ${monthNames[date.getMonth()]
                          } ${date.getFullYear()} ${padZero(
                            date.getHours()
                          )}:${padZero(date.getMinutes())} ${date.getHours() >= 12 ? "PM" : "AM"
                          }`;
                        const yourAddress = userEthAddress;
                        const amountHex = ele.input.slice(-64);
                        const amountInWei = BigInt("0x" + amountHex);
                        const amountInEth = amountInWei / BigInt(1e18);
                        const formattedAmount = Number(amountInEth.toString()).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 18 });

                        let type;
                        if (yourAddress.toLowerCase() === ele.from.toLowerCase()) {
                          type = "Sent";
                        } else if (yourAddress.toLowerCase() === ele.to.toLowerCase()) {
                          type = "Receive";
                        } else {
                          type = "Unknown";
                        }

                        return (
                          <tr key={ele.id}>
                            <td>{index + 1}</td>
                            <td>{formattedDate}</td>
                            <td>{ele.hash}</td>
                            <td>{ele.from}</td>
                            <td>{ele.to}</td>
                            <td>-</td>
                            <td>{formattedAmount}</td>
                            <td>{type}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="8">No transactions found</td>
                      </tr>
                    )}
                  </tbody>
                  )}
                  {selectedOption === "Binance Smart Chain" && (<tbody>
                    {Array.isArray(BSCtransaction) && BSCtransaction.length > 0 ? (
                      BSCtransaction
                        .map((ele, index) => {
                          const date = new Date(ele.timeStamp * 1000);
                          const formattedDate = `${date.getDate()}, ${monthNames[date.getMonth()]
                            } ${date.getFullYear()} ${padZero(
                              date.getHours()
                            )}:${padZero(date.getMinutes())} ${date.getHours() >= 12 ? "PM" : "AM"
                            }`;
                          const yourAddress = userEthAddress;
                          const isSent = ele.from.toLowerCase() === yourAddress;
                          const amount = ele.input === "0x" ? (isSent ? `-${weiToBnb(ele.value)}` : `+${weiToBnb(ele.value)}`) : "Token Transfer";

                          let type;
                          if (yourAddress.toLowerCase() === ele.from.toLowerCase()) {
                            type = "Sent";
                          } else if (yourAddress.toLowerCase() === ele.to.toLowerCase()) {
                            type = "Receive";
                          } else {
                            type = "Unknown";
                          }

                          return (
                            <tr key={ele.id}>
                              <td>{index + 1}</td>
                              <td>{formattedDate}</td>
                              <td>{ele.hash}</td>
                              <td>{ele.from}</td>
                              <td>{ele.to}</td>
                              <td>-</td>
                              <td>{amount}</td>
                              <td>{type}</td>
                            </tr>
                          );
                        })
                    ) : (
                      <tr>
                        <td colSpan="8">No transactions found</td>
                      </tr>
                    )}
                  </tbody>
                  )}
                </table>
              </div>
                )}
            </div>
            {selectedOption === "BLOCX Mainnet" && (
              <div className="pagination cd-box">
                <button onClick={() => setCurrentPage(0)}>
                  <span className="ooui--double-chevron-start-ltr"></span>
                </button>
                {Array.from(
                  { length: Math.ceil(transaction.length / 5) },
                  (_, i) => {
                    if (
                      i === 0 ||
                      i === currentPage - 1 ||
                      i === currentPage ||
                      i === currentPage + 1 ||
                      i === Math.ceil(transaction.length / 5) - 1
                    ) {
                      return (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i)}
                          className={currentPage === i ? "active" : ""}
                        >
                          {i + 1}
                        </button>
                      );
                    } else if (
                      i === 1 ||
                      i === currentPage - 2 ||
                      i === currentPage + 2
                    ) {
                      return <span key={i}>..</span>;
                    } else {
                      return null;
                    }
                  }
                )}
                <button
                  onClick={() =>
                    setCurrentPage(Math.ceil(transaction.length / 5) - 1)
                  }
                >
                  <span className="ooui--double-chevron-start-rtl"></span>
                </button>
              </div>
            )}
            {selectedOption === "Ethereum Mainnet" && (
              <div className="pagination cd-box">
                <button onClick={() => setETHCurrentPage(1)} disabled={ETHcurrentPage === 1}>
                  {"<<"}
                </button>
                <button onClick={() => setETHCurrentPage(ETHcurrentPage - 1)} disabled={ETHcurrentPage === 1}>
                  Prev
                </button>
                {
                  pageNumbers(ETHcurrentPage, totalPages).map(page =>
                    <button key={page} className={page === ETHcurrentPage ? 'active' : ''} onClick={() => setETHCurrentPage(page)}>
                      {page}
                    </button>
                  )
                }
                {totalPages > 5 && ETHcurrentPage < totalPages - 2 && (
                  <>
                    <span>...</span>
                    <button onClick={() => setETHCurrentPage(totalPages)}>
                      {totalPages}
                    </button>
                  </>
                )}
                <button onClick={() => setETHCurrentPage(ETHcurrentPage + 1)} disabled={ETHcurrentPage === totalPages}>
                  Next
                </button>
                <button onClick={() => setETHCurrentPage(totalPages)} disabled={ETHcurrentPage === totalPages}>
                  {">>"}
                </button>
              </div>
            )}
            {selectedOption === "Binance Smart Chain" && (
              <div className="pagination cd-box">
                <button onClick={() => setBSCCurrentPage(1)} disabled={BSCcurrentPage === 1}>
                  {"<<"}
                </button>
                <button onClick={() => setBSCCurrentPage(BSCcurrentPage - 1)} disabled={BSCcurrentPage === 1}>
                  Prev
                </button>
                {
                  pageNumbers(BSCcurrentPage, totalPages).map(page =>
                    <button key={page} className={page === BSCcurrentPage ? 'active' : ''} onClick={() => setBSCCurrentPage(page)}>
                      {page}
                    </button>
                  )
                }
                {totalPages > 5 && BSCcurrentPage < totalPages - 2 && (
                  <>
                    <span>...</span>
                    <button onClick={() => setBSCCurrentPage(totalPages)}>
                      {totalPages}
                    </button>
                  </>
                )}
                <button onClick={() => setBSCCurrentPage(BSCcurrentPage + 1)} disabled={BSCcurrentPage === totalPages}>
                  Next
                </button>
                <button onClick={() => setBSCCurrentPage(totalPages)} disabled={BSCcurrentPage === totalPages}>
                  {">>"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Walletnavbar;
