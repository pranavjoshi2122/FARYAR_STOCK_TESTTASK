"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Box, TablePagination } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useState } from "react";
import { useEffect } from "react";

function Row(props) {
  const { row, columns, setSelectedData } = props;
  return (
    <React.Fragment>
      <TableRow onClick={()=> setSelectedData(row)} key={row.id} sx={{ "& > *": { borderBottom: "unset" } }}>
        {columns.map((column) => {
          return (
            <TableCell component="th" scope="row">
              {column?.id === "chg" || column?.id === "chgper" ? (
                <span
                  style={{
                    color: !row[column.id].includes("-")
                      ? "#48c248"
                      : "rgb(250 22 22)",
                  }}
                >
                  {!row[column.id].includes("-")
                    ? `+${row[column.id]}${column?.id === "chgper" ? "%" : ""}`
                    : `${row[column.id]}${column?.id === "chgper" ? "%" : ""}`}
                </span>
              ) : (
                row[column.id]
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </React.Fragment>
  );
}

function CustomTable({
  rows: data,
  setSelectedData,
  columns,
  rowsPerPageOptions = [15, 25, 50],
  isActionVisible = true,
  count,
  page,
  rowsPerPage,
  onRowsPerPageChange,
  onPageChange,
}) {
  const handleChangePage = (event, newPage) => {
    onPageChange(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onPageChange(1);
  };

  const [displayedData, setDisplayedData] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    column: null,
    direction: "asc",
  });

  const sortTableByColumn = (colIdx) => {
    let newDirection = "asc";
    if (sortOrder.column === colIdx) {
      newDirection = sortOrder.direction === "asc" ? "desc" : "asc";
    }
    const sorted = [...displayedData]?.sort((a, b) => {
      const compareResult = a[colIdx] > b[colIdx] ? 1 : -1;
      return newDirection === "asc" ? compareResult : -compareResult;
    });
    setDisplayedData(sorted);
    setSortOrder({ column: colIdx, direction: newDirection });
  };

  useEffect(() => {
    if (data) {
      setDisplayedData(data);
    }
  }, [data]);

  return (
    <Box
      sx={{
        backgroundColor: "#2b2c40",
        boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 10px 0px",
        borderRadius: "8px",
        marginTop: "30px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          overflow: "auto",
        }}
      >
        <Table>
          <TableHead
            sx={{
              "& th": {
                borderBottomColor: "#dbdbeb1f",
                textAlign: "center",
                color: "#fff",
                borderTop: "1px solid #dbdbeb1f",
              },
            }}
          >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  onClick={() => sortTableByColumn(column.id)}
                  sx={{ cursor: "pointer" }}
                >
                  {column.label}
                  <SwapVertIcon sx={{ margin: "-5px 2px", fontSize: "18px" }} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& td,th": {
                borderBottomColor: "#dbdbeb1f",
                color: "#dbdbeb99",
                textAlign: "center",
                "& svg": {
                  fill: "#dbdbeb99",
                },
                width: "100px",
              },
            }}
          >
            {displayedData?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns?.length + 1}>
                  <Typography variant="body1" align="center">
                    No data available.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              displayedData.map((row, index) => (
                <Row
                  index={index}
                  key={index}
                  setSelectedData={setSelectedData}
                  isActionVisible={isActionVisible}
                  columns={columns}
                  row={row}
                />
              ))
            )}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        sx={{
          color: "#dbdbebde",
          "& .MuiTablePagination-selectIcon": {
            fill: "#dbdbebde",
          },
        }}
        rowsPerPageOptions={false}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default CustomTable;
