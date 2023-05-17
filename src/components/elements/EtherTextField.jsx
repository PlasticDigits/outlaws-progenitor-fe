import { formatUnits, parseUnits } from 'ethers/lib/utils.js';
import React, { useEffect, useRef, useState } from 'react';

const getInputValueFromPropValue = (value, decimals) => {
  if (!value) {
    return '';
  } else {
    let parseInputValue;

    try {
      parseInputValue = parseUnits(value, decimals);
    } catch {
      // do nothing
    }

    if (!parseInputValue || !parseInputValue.eq(value)) {
      return formatUnits(value, decimals);
    } else {
      return '';
    }
  }
};

function EtherTextField({
  decimals,
  value,
  onChange,
  renderInput,
  autofocus,
  placeholder = '0.00',
  max,
  min,
}) {
  const inputRef = useRef(null);

  const [inputValue, setInputValue] = useState(
    getInputValueFromPropValue(value, decimals)
  );

  const [prevValue, setPrevValue] = useState(value);
  if (prevValue !== value) {
    setPrevValue(value);
    inputValue;
  }

  const updateValue = (event) => {
    const { value: targetValue } = event.currentTarget;

    if (targetValue === '') {
      setPrevValue(targetValue);
      setInputValue(targetValue);
      onChange(targetValue);
      return;
    }

    let newValue;
    try {
      newValue = parseUnits(targetValue, decimals);
    } catch (e) {
      //ignore on error
      return;
    }

    if (!!min && newValue.lt(min)) {
      setPrevValue(min.toString());
      setInputValue(formatUnits(min, decimals));
      onChange(min.toString());
      return;
    }

    if (!!max && newValue.gt(max)) {
      setPrevValue(max.toString());
      setInputValue(formatUnits(max, decimals));
      onChange(max.toString());
      return;
    }
    setPrevValue(newValue.toString());
    setInputValue(targetValue);
    onChange(newValue.toString());
  };

  const inputProps = {
    placeholder,
    onChange: updateValue,
    type: 'text',
    value: inputValue,
  };

  useEffect(() => {
    if (!renderInput && autofocus && inputRef) {
      const node = inputRef.current;
      node.focus();
    }
  }, [autofocus, inputRef]);

  return renderInput ? (
    renderInput({ ...inputProps })
  ) : (
    <input {...inputProps} ref={inputRef} />
  );
}

export default EtherTextField;
