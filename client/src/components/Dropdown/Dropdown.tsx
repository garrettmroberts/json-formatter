import React, {Dispatch, SetStateAction, MouseEvent} from 'react';
import {FC, useState} from 'react';
import './Dropdown.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';

interface DropdownProps {
  options: string[];
  setSelected: Dispatch<SetStateAction<string>>;
}

const Dropdown: FC<DropdownProps> = ({options, setSelected}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelection = (event: MouseEvent<HTMLDivElement>) => {
    setSelected((event.target as HTMLElement).textContent || 'id');
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        Choose one
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
      {isOpen && (
        <div className="dropdown-content">
          <div onClick={e => handleSelection(e)}>
            {options.map((option, index) => (
              <div key={index} className="dropdown-option">
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
