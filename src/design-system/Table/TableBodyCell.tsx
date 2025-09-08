import { TableBodyCellBase } from "./components";
import { type TableBodyCellProps } from "./types";

const TableBodyCell: React.FC<TableBodyCellProps> = ({ children, align }) => {
    return <TableBodyCellBase $align={align}>{children}</TableBodyCellBase>;
};

export { TableBodyCell };
