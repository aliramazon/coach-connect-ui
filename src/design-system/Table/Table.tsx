import styled from "@emotion/styled";
import { type TableProps } from "./types";

export const TableBase = styled.table`
    width: 100%;
    border-spacing: 0;
`;

const Table: React.FC<TableProps> = ({ children }) => {
    return <TableBase>{children}</TableBase>;
};

export { Table };
