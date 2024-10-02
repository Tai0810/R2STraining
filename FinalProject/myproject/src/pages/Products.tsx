import * as React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/reducers/productReducer";
import { AppDispatch } from "../store";
import TableBody from "./../components/TableBody";
import { totalField } from "./styles";
import { AddProductDialog, Button, EditProductDialog } from "../components";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    entities: products = {},
    ids: productIds = [],
    status,
  } = useSelector((state: any) => state.product || {});

  const { entities: colors = {} } = useSelector((state: any) => state.color);
  const { entities: categories = {} } = useSelector((state: any) => state.category);

  const [selectedProduct, setSelectedProduct] = React.useState<any>(null);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [newProduct, setNewProduct] = React.useState<any>(null);

  React.useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleEdit = (productId: number) => {
    setSelectedProduct(products[productId]);
    setOpenEditDialog(true);
  };

  const handleSave = (updatedProduct: any) => {
    setOpenEditDialog(false);
  };

  const handleAdd = () => {
    setNewProduct({
      id: productIds.length + 1,
      name: "",
      available: 0,
      sold: 0,
      categoryId: 1,
      colors: [],
      price: 0,
    });
    setOpenAddDialog(true);
  };

  const handleAddSave = (addedProduct: any) => {
    setOpenAddDialog(false);
    console.log("Sản phẩm mới:", addedProduct);
  };

  const totalAvailable = React.useMemo(() => {
    return productIds.reduce(
      (acc: any, id: any) => acc + (products[id]?.available || 0),
      0
    );
  }, [productIds, products]);

  const totalSold = React.useMemo(() => {
    return productIds.reduce(
      (acc: any, id: any) => acc + (products[id]?.sold || 0),
      0
    );
  }, [productIds, products]);

  const revenue = React.useMemo(() => {
    return productIds.reduce(
      (acc: any, id: any) =>
        acc + (products[id]?.price * products[id]?.sold || 0),
      0
    );
  }, [productIds, products]);

  const totalProducts = React.useMemo(() => productIds.length, [productIds]);

  const headers = [
    { text: "No" },
    { text: "Name" },
    { text: "Available" },
    { text: "Sold" },
    { text: "Category" },
    { text: "Colors" },
    { text: "Price" },
    { text: "Action" },
  ];

  return (
    <div style={{ width: "100vw", paddingRight: "20px" }}>
      <h1>Seller</h1>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
        }}
      >
        <div style={{ width: "50%" }}></div>
        <div
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <div style={totalField}>Total: {totalProducts}</div>
          <div style={totalField}>Available: {totalAvailable}</div>
          <div style={totalField}>Sold: {totalSold}</div>
          <div style={totalField}>Revenue: {revenue.toLocaleString()}</div>
          <Button
            label="Add"
            color="success"
            startIcon={<AddToPhotosIcon />}
            onClick={handleAdd}
          />
        </div>
      </div>
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
          <TableBody
            products={products}
            productIds={productIds}
            categories={categories}
            colors={colors}
            onEdit={handleEdit}
          />
        </Table>
      </TableContainer>

      {selectedProduct && (
        <EditProductDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          product={selectedProduct}
          onSave={handleSave}
        />
      )}

      {newProduct && (
        <AddProductDialog
          open={openAddDialog}
          onClose={() => setOpenAddDialog(false)}
          product={newProduct}
          onSave={handleAddSave}
        />
      )}
    </div>
  );
}
