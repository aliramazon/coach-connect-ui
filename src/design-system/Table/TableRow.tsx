import { TableRowBase } from "./components";
import { type TableRowProps } from "./types";

const TableRow: React.FC<TableRowProps> = ({ columns, children }) => {
    return <TableRowBase $columns={columns}>{children}</TableRowBase>;
};

export { TableRow };
