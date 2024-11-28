import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import '../style/Action.css';

function Action({ greenCoin, setGreenCoin, actionName, imgColorUrl, imgProgressUrl, actionTarget, actionGradient }) {
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
                        <img src={`/NCA/${imgColorUrl}`} alt="Action Img" />
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
                                <img src={`/NCA/${imgProgressUrl}`} alt="Img Progress" />
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
