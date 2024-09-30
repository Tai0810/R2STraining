import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/reducers/productReducer";
import { AppDispatch } from "../store";

// function createData(
//   id: number,
//   name: string,
//   avaliable: number,
//   sold: number,
//   category: string,
//   colors: string,
//   price: number
// ) {
//   return { id, name, avaliable, sold, category, colors, price };
// }

// const rows = [
//   createData(1, "Test1", 5, 0, "cloth", "blue", 450000),
//   createData(2, "Test2", 5, 0, "cloth", "", 450000),
//   createData(3, "Test3", 5, 0, "cloth", "blue", 450000)
// ];

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector((state: any) => state.products?.entities || {});
  const productIds = useSelector((state: any) => state.products?.ids || []);
  const status = useSelector((state: any) => state.products.status);
  const error = useSelector((state: any) => state.products.error);

  React.useEffect(() => {
    console.log(status);
    
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <div style={{ width: "100vw", paddingRight: "20px" }}>
      <h1>Seller</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">No</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Avaliable</TableCell>
              <TableCell align="left">Sold</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Colors</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productIds.map((id: string, index: number) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{products[id].name}</TableCell>
                <TableCell align="left">{products[id].avaliable}</TableCell>
                <TableCell align="left">{products[id].sold}</TableCell>
                <TableCell align="left">{products[id].category}</TableCell>
                <TableCell align="left">{products[id].colors}</TableCell>
                <TableCell align="left">{products[id].price}</TableCell>
                <TableCell align="center">
                  <div>
                    <Button
                      variant="contained"
                      disableElevation
                      color="success"
                      type="submit"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      disableElevation
                      color="error"
                      type="submit"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
