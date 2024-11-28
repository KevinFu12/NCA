import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import '../style/Action.css';

import imgColor1 from '../assets/action/actionWalking.png'
import imgProg1 from '../assets/action/actionWalkingProg.png'

import imgColor2 from '../assets/action/actionTransport.png'
import imgProg2 from '../assets/action/actionTransportProg.png'

import imgColor3 from '../assets/action/actionVehicle.png'
import imgProg3 from '../assets/action/actionVehicleProg.png'

import imgColor4 from '../assets/action/actionCycing.png'
import imgProg4 from '../assets/action/actionCycingProg.png'

function Action({ greenCoin, setGreenCoin, actionName, imgColorUrl, imgProgressUrl, actionTarget, actionGradient, actionMode}) {
    const [active, setActive] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setProgress(() => Math.floor(Math.random() * actionTarget) + 1);
    }, [active]);

    function actionActiveHandling() {
        setActive((a) => (1 - a));
    }

    function handleGreenCoinIncrease() {
        setGreenCoin(0.1); // Example: Increase Green Coin by 0.1
    }

    return (
        <>
            {active === 0 ? (
                <div className="card-container card-non-active" onClick={actionActiveHandling} style={{ backgroundImage: actionGradient }}>
                    <div className="card-left">
                        <h1>{actionName}</h1>
                    </div>
                    <div className="card-right">
                        {
                            actionMode == 1 ? 
                                <img src={imgColor1} alt="Action Img" />
                            : actionMode == 2 ? 
                                <img src={imgColor2} alt="Action Img" />
                            : actionMode == 3 ?
                                <img src={imgColor3} alt="Action Img" /> 
                            :
                                <img src={imgColor4} alt="Action Img" />
                        }
                    </div>
                </div>
            ) : (
                <div className="card-container card-active" style={{ backgroundImage: actionGradient }}>
                    <div className="card-progress">
                        <h1>Progress</h1>
                    </div>
                    <div className="card-progress-bottom">
                        <div className="card-progress-img">
                            <div className="card-img-blank" style={{ width: `${(progress * 100) / actionTarget}%` }}></div>
                            <div className="card-img-wrapper">
                                {
                                    actionMode == 1 ? 
                                        <img src={imgProg1} alt="Action Img" />
                                    : actionMode == 2 ? 
                                        <img src={imgProg2} alt="Action Img" />
                                    : actionMode == 3 ?
                                        <img src={imgProg3} alt="Action Img" /> 
                                    :
                                        <img src={imgProg4} alt="Action Img" />
                                }
                            </div>
                        </div>
                        <div className="card-progress-bar-outside">
                            <div className="card-progress-bar" style={{ width: `${(progress * 100) / actionTarget}%` }}></div>
                        </div>
                    </div>
                    <div className="card-progress-information">
                        <div className="card-progress-desc">
                            <h1>{progress}km / {actionTarget}km</h1>
                        </div>
                        <div className="card-button">
                            <button onClick={actionActiveHandling}>0.1 Green Coin</button>
                            <button onClick={handleGreenCoinIncrease}>Increase Green Coin</button> {/* Add button to increase coin */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

Action.propTypes = {
    greenCoin: PropTypes.number,
    setGreenCoin: PropTypes.func,
    actionName: PropTypes.string,
    imgColorUrl: PropTypes.string,
    imgProgressUrl: PropTypes.string,
    actionTarget: PropTypes.number,
    actionGradient: PropTypes.string
}

export default Action;
