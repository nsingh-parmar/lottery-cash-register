import React from 'react';

const MoneyButtons = (props) => {

    return (
        <div className="number-row">
            {props.values.map((number, i) => (
                    <button key={i} 
                            value={number.value} 
                            className={number.isEnabled ? "buttons-enabled" : "buttons-disabled"} 
                            onClick={props.clickHandler}>
                        {number.value}
                    </button>
                )
            )}
        </div>
    )
}

export default MoneyButtons;
