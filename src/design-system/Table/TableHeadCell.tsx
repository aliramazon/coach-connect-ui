import { TableHeadCellBase } from "./components";
import { type TableHeadCellProps } from "./types";

const TableHeadCell: React.FC<TableHeadCellProps> = ({ children, align }) => {
    return <TableHeadCellBase $align={align}>{children}</TableHeadCellBase>;
};

export { TableHeadCell };
