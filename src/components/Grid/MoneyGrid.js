import React from 'react'
import MoneyButtons from './Buttons/MoneyButtons';

const MoneyGrid = (props) => {
    const cashObjects = props.values.map((obj) => {
        let _object = JSON.parse(JSON.stringify(obj));
        _object.isEnabled = true;
        return _object;
    });

    return (
        <div id="money-container" className="col-2" >
            <h2 className="grid-header">Cash Register<sup>$</sup></h2>
            <MoneyButtons values={props.numbers.length === 5 ? cashObjects : props.values} clickHandler={props.clickHandler} />
        </div>
    )
}

export default MoneyGrid;
