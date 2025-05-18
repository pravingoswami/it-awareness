// src/components/DataTable/DataTable.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

export interface DataTableColumn<T> {
  label: string;
  field: keyof T | string;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "right" | "center";
  width?: string | number;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string | number;
  emptyMessage?: string;
  className?: string;
  dense?: boolean;
}

function DataTable<T>({
  columns,
  data,
  rowKey,
  emptyMessage = "No data available.",
  className = "",
  dense = false,
}: DataTableProps<T>) {
  return (
    <TableContainer
      component={Paper}
      className={className}
      sx={{
        boxShadow: "none",
        background: (theme) =>
          theme.palette.mode === "dark" ? "#111c44" : "#fff",
      }}
    >
      <Table size={dense ? "small" : "medium"} aria-label="data table">
        <TableHead>
          <TableRow>
            {columns.map((col, idx) => (
              <TableCell
                key={idx}
                align={col.align || "left"}
                style={col.width ? { width: col.width } : {}}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Box py={2} color="text.secondary">
                  {emptyMessage}
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow key={rowKey(row)} hover>
                {columns.map((col, idx) => (
                  <TableCell key={idx} align={col.align || "left"}>
                    {col.render
                      ? col.render(row)
                      : typeof col.field === "string" &&
                        Object.prototype.hasOwnProperty.call(row, col.field)
                      ? String((row as Record<string, unknown>)[col.field] ?? "")
                      : ""}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
