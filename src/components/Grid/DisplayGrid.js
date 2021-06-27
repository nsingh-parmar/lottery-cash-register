import React from 'react'

const DisplayGrid = (props) => {
    return (
        <div id="display-container" className="col-4">
            <h2 className="grid-header">Numbers selected</h2>
            {props.numbers.map((number, i) => (
                        <div key={i} value={number.value} className="pills" >
                            Mark: {number.value}
                        </div>
                )
            )}
            <div id={props.totalAmount ? "amount-display" : "amount-disabled"}>Total amount: ${props.totalAmount}</div>
        </div>
    )
}

export default DisplayGrid;
