import { FC } from "react";
import './Table.css';

interface TableProps {
    keys: string[],
    data: { [key: string]: any }[]
}

const Table: FC<TableProps> = ({ keys, data }) => {
    return (
        <table className="table">
            <thead className="table-header">
                <tr>
                    {keys.map((key, index) => (
                        <th key={index}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {keys.map((key, colIndex) => (
                            <td key={colIndex}>{row[key].toString()}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table;