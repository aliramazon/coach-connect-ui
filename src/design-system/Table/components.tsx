import styled from "@emotion/styled";
import type { BaseCellProps, BaseRowProps } from "./types";

export const TableRowBase = styled.tr<BaseRowProps>`
    display: grid;
    grid-template-columns: ${(props) => props.$columns.join(" ")};
    align-items: center;
    padding: 0 var(--space-16);
    border-radius: var(--border-radius-16);
`;

const cellStyles = (props: BaseCellProps) => `
  display: flex;
  align-items: center;
  justify-content: ${props.$align ?? "left"};
`;

export const TableBodyCellBase = styled.td<BaseCellProps>`
    ${(props) => cellStyles(props)}
`;

export const TableHeadCellBase = styled.th<BaseCellProps>`
    gap: var(--space-4);
    color: var(--jaguar-500);
    font-size: var(--font-size-16);
    line-height: var(--font-size-24);
    font-weight: var(--font-weight-600);

    ${(props) => cellStyles(props)}
`;

export const TableBody = styled.tbody`
    ${TableRowBase} {
        height: 6.8rem;
        box-shadow: var(--shadow-xs);
    }
    ${TableRowBase}:not(:last-child) {
        margin-bottom: var(--space-8);
    }
`;

export const TableHead = styled.thead`
    position: sticky;
    top: 0;
    z-index: 1;

    ${TableRowBase} {
        height: 6rem;
        border-radius: var(--border-radius-16);
        background-color: var(--jaguar-50);
        margin-bottom: var(--space-4);
    }
`;
