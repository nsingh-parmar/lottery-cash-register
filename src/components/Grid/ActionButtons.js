import React from 'react'

const ActionButtons = (props) => {

    return (
        <div id="action-container" className="d-flex justify-content-center">
            <button id="cash-button" className={props.numbers.length === 5 ? "pills" : "pills-disabled"} onClick={props.encash}>Cash</button>
            <button id="clear-button" className="pills" onClick={props.reset}>Clear</button>
            <button id="random-button" className="pills" onClick={props.randomize}>Random</button>
        </div>
    )
}

export default ActionButtons;
