export type HorizontalAlign = "right" | "left" | "center";

export interface BaseCellProps {
    $align?: HorizontalAlign;
}

export interface BaseRowProps {
    $columns: string[]; // ['20%', '30%', '20%', '15%', '15%'] or ['2fr', '1fr', '1fr', '1fr']
}

export interface TableRowProps {
    columns: string[];
    children: React.ReactNode;
}

export interface TableBodyCellProps {
    align?: HorizontalAlign;
    children: React.ReactNode;
}

export interface TableHeadCellProps {
    align?: HorizontalAlign;
    children: React.ReactNode;
}

export interface TableProps {
    children: React.ReactNode;
}
