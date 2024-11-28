import React, { useState } from 'react';
import Action from './Action';
import PurchaseCC from './PurchaseCC';

function ParentComponent() {
    const [greenCoin, setGreenCoin] = useState(0); 

    const increaseGreenCoin = (amount) => {
        setGreenCoin((prev) => prev + amount);
    };

    return (
        <div>
            <Action greenCoin={greenCoin} setGreenCoin={increaseGreenCoin} />
            <PurchaseCC greenCoin={greenCoin} setGreenCoin={increaseGreenCoin} />
        </div>
    );
}

export default ParentComponent;
