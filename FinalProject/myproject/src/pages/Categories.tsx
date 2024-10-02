import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { AppDispatch } from "../store";
import { Button } from "../components";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchCategory } from "../store/reducers/categoryReducer";

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    entities: categories = {},
    ids: categoryIds = [],
    status,
    error,
  } = useSelector((state: any) => state.category);
  React.useEffect(() => {
    console.log(status);

    if (status === "idle") {
      dispatch(fetchCategory());
    }
  }, [status, dispatch]);
  const headers = [{ text: "No" }, { text: "Name" }, { text: "Action" }];

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header.text} align="left">
                  {header.text}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryIds.map((id: string, index: number) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{categories[id].name}</TableCell>

                <TableCell>
                  <div>
                    <Button
                      label="Edit"
                      startIcon={<EditIcon />}
                      color="success"
                    />
                    <Button
                      label="Delete"
                      startIcon={<DeleteIcon />}
                      color="error"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Categories;
