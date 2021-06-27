import React from 'react'
import NumberButtons from './Buttons/NumberButtons';

const NumberGrid = (props) => {

    let rows = [];
    const numbers = props.numbers;
    const chunks = 5;
    for(let i = 0; i < numbers.length; i += chunks) {
        rows.push(numbers.slice(i, chunks+i));
    }
    const selectedCount = props.getSelections(numbers);
    return (
        <div id="numbers-container" className="col-4" >
             <h2 className="grid-header">Number selector</h2>
            {rows.map((numbers, i) => (
                    <NumberButtons key={i} values={numbers} selections={selectedCount} clickHandler={props.clickHandler} />
                )
            )}
        </div>
    )
}

export default NumberGrid;
