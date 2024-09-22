import React from 'react';
import InputMask from 'react-input-mask';

export default function TInputMask({
  mask = "",
  placeholder = "",
  type = "",
  value = "",
  required = false,
  onChange = () => {},
  onBlur = () => {},
  inputRef,

}) {
  return (
    <>
      <InputMask
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        mask={mask}
        required={required}
        ref={inputRef}
        onBlur={onBlur}
      />
    </>
  );
}