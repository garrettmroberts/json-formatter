import React, {Dispatch, SetStateAction, MouseEvent} from 'react';
import {FC, useState} from 'react';
import './Dropdown.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';

interface DropdownProps {
  options: string[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  sortOrder: 'asc' | 'desc';
  setSortOrder: Dispatch<SetStateAction<'asc' | 'desc'>>;
}

const Dropdown: FC<DropdownProps> = ({options, selected, setSelected, sortOrder, setSortOrder,}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelection = (event: MouseEvent<HTMLDivElement>) => {
    const newValue = (event.target as HTMLElement).textContent || 'id';
    if (newValue === selected) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortOrder('asc');
    }
    setSelected(newValue);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        {selected === '' ? 'Choose one' : selected}
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
