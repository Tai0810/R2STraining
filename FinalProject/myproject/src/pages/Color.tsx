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
import { fetchColors } from "../store/reducers/colorReducer";
import { AppDispatch } from "../store";

interface Color {
  id: number;
  name: string;
}

const ColorPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    entities: colors = {},
    ids: colorIds = [],
    status,
    error,
  } = useSelector((state: any) => state.color || {});

  useEffect(() => {
    if (status === "idle") {
      console.log("Status Color", status);
      console.log("color", colors);
      
      dispatch(fetchColors());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h1>Color Page</h1>
      {/* {status === "loading" && <CircularProgress />}
      {status === "failed" && <p>Error: {error}</p>} */}
      {status === "succeeded" && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {colors.map((color: Color) => (
                <TableRow key={color.id}>
                  <TableCell>{color.id}</TableCell>
                  <TableCell>{color.name}</TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default ColorPage;