import React, { useState } from 'react'

import Header from "./Header.jsx";
import Supported from "./Supported.jsx";
import LatestNews from "./LatestNews.jsx";
import Footer from "./Footer.jsx";

import '../style/PurchaseCC.css'

import vect1 from '../assets/index/vector1.png';
import vect2 from '../assets/index/vector2.png';

import GreenCoin from '../assets/purchaseCC/greenCoin.png'
import CarbonCredit from '../assets/purchaseCC/carbonCredit.png'
import ArrowRight from '../assets/purchaseCC/arrowRight.png'

function PurchaseCC({ greenCoin, setGreenCoin }) {
    document.title = "Purchase CC Page | NCA";

    const [carbonCredit, setCarbonCredit] = useState(0);
    const [currCarbonCredit, setCurrCarbonCredit] = useState(0);
    const [errorMessage, setErrorMessage] = useState(""); // To hold error messages

    const currCarbonCreditHandling = (e) => {
        const enteredAmount = e.target.value;
        setCurrCarbonCredit(enteredAmount / 10); // Convert to Carbon Credit
    };

    const carbonCreditClickHandling = () => {
        // Validate if the entered Green Coin amount is less than or equal to the available balance
        if (currCarbonCredit * 10 > greenCoin) {
            setErrorMessage("Insufficient Green Coin balance.");
        } else {
            setCarbonCredit((c) => c + currCarbonCredit); // Add to Carbon Credit if sufficient balance
            setGreenCoin((prev) => prev - currCarbonCredit * 10); // Deduct Green Coin from balance
            setErrorMessage(""); // Clear error message
        }
    };

    return (
        <>
            <Header />

            <div className="margin-page-container">
                <div className="background-vector-container">
                    <div className="vector-container vector-up">
                        <img src={vect1} alt="Vector 1" className='vect1' />
                    </div>

                    {/* Content */}
                    <div className="background-vector-content">
                        {/* Description */}
                        <div className="cc-container">
                            <div className="cc-description-container">
                                <div className="cc-description-top">
                                    <div className="cc-description-left">
                                        <h1>TRADE YOUR GREEN COINS</h1>
                                    </div>
                                    <div className="cc-description-right">
                                        <img src={GreenCoin} alt="Green Coin" />
                                    </div>
                                </div>
                                <div className="cc-description-bottom">
                                    <p>Green Coins are the rewards you earn for participating in eco-friendly activities through NCA. These tokens represent your commitment to sustainability and can be traded for Carbon Credits, which contribute to various environmental initiatives. Simply select the number of Green Coins you wish to trade, and let your actions help build a more sustainable future. Together, we can make a significant impact!</p>
                                    <p><b>What is Carbon Credit?</b></p>
                                </div>
                            </div>
                        </div>

                        {/* Conversion Description */}
                        <div className="cc-container">
                            <div className="cc-conversion-container">
                                <h1>10 </h1>
                                <img src={GreenCoin} alt="Green Coin" />
                                <h1>= 1 </h1>
                                <img src={CarbonCredit} alt="Carbon Credit" />
                            </div>
                        </div>

                        <div className="cc-container">
                            <div className="cc-input-container">
                                <p className='cc-input-info'>Your Current Carbon Credit: <b>{carbonCredit}</b></p>

                                <div className="cc-container">
                                    <div className="cc-input-group">
                                        <div className="cc-input-part">
                                            <h1>Green Coin</h1>
                                        </div>
                                        <div className="cc-input-img" style={{ visibility: 'hidden' }}>
                                            <img src={ArrowRight} alt="Arrow Right" />
                                        </div>
                                        <div className="cc-input-part">
                                            <h1>Carbon Credit</h1>
                                        </div>
                                    </div>
                                </div>

                                <div className="cc-container">
                                    <div className="cc-input-group">
                                        <div className="cc-input-part cc-white">
                                            <input
                                                type="number"
                                                name="cc-input-number"
                                                id="cc-input-number"
                                                placeholder="Enter Amount"
                                                onChange={(e) => currCarbonCreditHandling(e)}
                                            />
                                        </div>
                                        <div className="cc-input-img">
                                            <img src={ArrowRight} alt="Arrow Right" />
                                        </div>
                                        <div className="cc-input-part cc-white">
                                            <h1>{currCarbonCredit}</h1>
                                        </div>
                                    </div>
                                </div>

                                {/* Display error message if any */}
                                {errorMessage && <p className="error-message">{errorMessage}</p>}

                                <div className="cc-container">
                                    <button className="cc-button" onClick={carbonCreditClickHandling}>TRADE</button>
                                </div>

                                <p className="cc-input-note">
                                    To ensure the transaction is secure, <b>blockchain technology</b> uses decentralized and immutable ledgers, providing <b>transparent, tamper-resistant records</b> that validate each step of the process.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="vector-container vector-low">
                        <img src={vect2} alt="Vector 2" className="vect2" />
                    </div>
                </div>

                <Supported />
                <LatestNews />
            </div>

            <Footer />
        </>
    );
}

export default PurchaseCC;
