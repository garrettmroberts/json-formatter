import { FC } from "react"
import "./Button.css"

interface ButtonProps {
    onClick: () => void,
    text: string
}

const Button: FC<ButtonProps> = ({ onClick, text }) => {
    return <button className="button" onClick={onClick}>{ text }</button>
}

export default Button