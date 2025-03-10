export function getColumnNames(table: any): string[] {
    return table.raw().slice(1).map((row: any[]) => row[0].trim());
}