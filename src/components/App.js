import Header from './Header'
import MoneyGrid from './Grid/MoneyGrid';
import NumberGrid from './Grid/NumberGrid';
import DisplayGrid from './Grid/DisplayGrid';
import ActionButtons from './Grid/ActionButtons';
import { useState, useEffect } from 'react';
import '../css/Grid.css';
import '../css/Buttons.css';

function App() {
  const allNumbers = Array.from(Array(20), (_, i) => i + 1);
  const allMoneyValues = [1, 5, 10, 20];
  const numberLimit = 5;

  const createNumberObjects = (numberList, selected=false, enabled=true) => {
    return numberList.map((n) => {
      return {
          value: n,
          isSelected: selected,
          isEnabled: enabled,
      };
    });
  };

  const isButtonClickable = (listOfObjects, buttonPressed) => {
    const numberObject = listOfObjects.filter((number) => {
      return number.value === buttonPressed;
    })[0];
    if(numberObject.isEnabled && numberObject.isSelected) {
      return true;
    }
    return false;
  }

  const getSelectedNumbers = (listOfObjects) => {
    const selected = listOfObjects.filter((number) => {
      return number.isSelected;
    });
    return selected;
  }

  const [numbers, setNumbers] = useState(createNumberObjects(allNumbers));
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const [totalAmount, setTotalAmount] = useState(0);
  const [amount, setAmount] = useState([]);
  const moneyValues = allMoneyValues.map((c) => {
    return {
      value: c,
      isEnabled: false
    }
  });

  const clickNumber = (event) => {
    const currentValue = Number(event.target.value);
    const currentSelections = getSelectedNumbers(selectedNumbers);
    if(currentSelections.length === numberLimit && !isButtonClickable(selectedNumbers, currentValue)) {
      alert(`You cannot select more than ${numberLimit} numbers. Deselect any of the selected ones to select a new number.`);
    } else {
      const modified = selectedNumbers.map((number) => {
        if(number.value === currentValue) {
          number.isSelected = !number.isSelected;
        }
        return number;
      });

      setNumbers(modified);
      setAmount([]);
      setTotalAmount(0);
    }
  };
  
  useEffect(() => {
    if(getSelectedNumbers(numbers).length >= numberLimit) {
      const frozen = numbers.map((number) => {
        if(!number.isSelected) {
          number.isEnabled = false;
        }
        return number;
      });
      setSelectedNumbers(frozen);
    } else {
      const fluid = numbers.map((number) => {
        number.isEnabled = true;
        return number
      });
      setSelectedNumbers(fluid);
      setAmount([]);
      setTotalAmount(0);
    }
  }, [numbers]);

  const clickMoney = (event) => {
    const currentValue = Number(event.target.value);
    
    if(getSelectedNumbers(selectedNumbers).length < numberLimit) {
      alert(`You cannot access the cash register until you select a total of ${numberLimit} numbers`);
      setAmount([]);
    } else {
      amount.push(currentValue);
    }

    setAmount(amount);
    let reducedValue = 0;
    if(amount.length) {
      reducedValue = amount.reduce((acc, value) => acc + value);
    }
    setTotalAmount(reducedValue);
  };


  const randomize = () => {
    const numberObjects = createNumberObjects(allNumbers, false, false);
    let randomSelected = [];

    for(let i = 0; i < numberLimit; i++) {
      let random = allNumbers[Math.floor(Math.random() * allNumbers.length)];
      const numberObject = numberObjects.filter((number) => {
        return number.value === random;
      })[0];
      const index = numberObjects.indexOf(numberObject);
      numberObject.isEnabled = true;
      numberObject.isSelected = true;
      numberObjects[index] = numberObject;
      if(!randomSelected.includes(random)) {
        randomSelected.push(random);
      } else {
        i--;
      }
    }
    setSelectedNumbers(numberObjects);
    setAmount([]);
    setTotalAmount(0);
  };
  
  const reset = () => {
    setSelectedNumbers(createNumberObjects(allNumbers));
    setAmount([]);
    setTotalAmount(0);
  };

  const encash = () => {
    const selected = getSelectedNumbers(selectedNumbers);
    if(selected.length === numberLimit) {
      const numberList = selected.map((numberObject) => {
        return numberObject.value;
      });

      alert(`Numbers selected: ${numberList.join(", ")}\n\nTotal amount attached: $ ${totalAmount}`);
    } else {
      alert(`Nothing to encash yet. Select ${numberLimit} numbers and try again.`);
    }
  };

  return (
    <>
      <Header />
      <main id="arena" className="row justify-content-center">
        <MoneyGrid values={moneyValues} numbers={getSelectedNumbers(selectedNumbers)} clickHandler={clickMoney} />
        <NumberGrid numbers={selectedNumbers} clickHandler={clickNumber} getSelections={getSelectedNumbers} />
        <DisplayGrid values={moneyValues} numbers={getSelectedNumbers(selectedNumbers)} totalAmount={totalAmount} />
      </main>
      <ActionButtons encash={encash} reset={reset} randomize={randomize} numbers={getSelectedNumbers(selectedNumbers)} />
    </>
  );
}

export default App;
