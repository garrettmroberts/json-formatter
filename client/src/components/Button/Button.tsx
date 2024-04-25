import React from 'react';
import {FC, SyntheticEvent} from 'react';
import './Button.css';

interface ButtonProps {
  onClick: (e: SyntheticEvent) => void;
  text: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({onClick, text, disabled = false}) => {
  return (
    <button disabled={disabled} className="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
