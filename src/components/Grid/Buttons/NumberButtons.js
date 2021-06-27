import React from 'react';

const NumberButtons = (props) => {

    return (
        <>
            <div className="number-row">
                {props.values.map((number, i) => (
                        <button key={i} 
                                value={number.value}
                                onClick={props.clickHandler}
                                className={number.isSelected ? "buttons-selected" : (number.isEnabled ? "buttons" : "buttons-disabled")} >
                            {number.value}
                        </button>
                    )
                )}
            </div>
            <br />
        </>
    );
};

export default NumberButtons;
