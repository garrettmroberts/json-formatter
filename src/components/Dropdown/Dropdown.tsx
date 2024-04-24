import { FC, useState } from "react";
import './Dropdown.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

interface DropdownProps {
    options: string[],
    selected: any,
    setSelected: any
}


const Dropdown: FC<DropdownProps> = ({ options, selected, setSelected }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleSelection = (event: any) => {
        setSelected(event.target.textContent);
        setIsOpen(false);
    }

    return (
        <div className="dropdown">
            <div className="dropdown-button" onClick={(e) => setIsOpen(!isOpen)}>
                Choose one
                <FontAwesomeIcon icon={faCaretDown} />
            </div>
            {isOpen && (
                <div className="dropdown-content">
                    <div onClick={(e) => handleSelection(e)}>
                        {options.map((option, index) => <div key={index} className="dropdown-option">{option}</div>)}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dropdown;