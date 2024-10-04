import { useEffect, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../store/reducers/productReducer";
import { AppDispatch } from "../store";
import TableBody from "./../components/TableBody";
import { totalField } from "./styles";
import { Button, ConfirmDialog, ProductDialog } from "../components";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { fetchColors } from "../store/reducers/colorReducer";
import { fetchCategory } from "../store/reducers/categoryReducer";

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

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    entities: products = {},
    ids: productIds = [],
    status,
  } = useSelector((state: any) => state.product || {});

  const { entities: colors = {} } = useSelector((state: any) => state.color);
  const { entities: categories = {} } = useSelector(
    (state: any) => state.category
  );

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
    null
  );

  const handleUpdate = (product: any) => {
    dispatch(updateProduct(product));
  };

  const handleDelete = (productId: any) => {
    setProductIdToDelete(productId);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    if (productIdToDelete) {
      dispatch(deleteProduct(productIdToDelete));
      setProductIdToDelete(null);
      setOpenConfirmDialog(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenConfirmDialog(false);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
    dispatch(fetchColors());
    dispatch(fetchCategory());
  }, [status, dispatch]);

  const handleEdit = (productId: number) => {
    setSelectedProduct(products[productId]);
    setDialogMode("edit");
    setOpenDialog(true);
  };

  const handleSave = (updatedProduct: any) => {
    console.log("Saving product:", updatedProduct); // Kiểm tra dữ liệu
    if (dialogMode === "add") {
      dispatch(addProduct(updatedProduct));
    } else {
      dispatch(updateProduct(updatedProduct));
    }
    setOpenDialog(false);
  };
  

  const handleAdd = () => {
    // setSelectedProduct({
    //   id: productIds.length + 1,
    //   name: "",
    //   available: 0,
    //   sold: 0,
    //   category: 0,
    //   colors: [],
    //   price: 0,
    // });
    setDialogMode("add");
    setOpenDialog(true);
  };

  const totalAvailable = useMemo(() => {
    return productIds.reduce(
      (acc: any, id: any) => acc + (products[id]?.available || 0),
      0
    );
  }, [productIds, products]);

  const totalSold = useMemo(() => {
    return productIds.reduce(
      (acc: any, id: any) => acc + (products[id]?.sold || 0),
      0
    );
  }, [productIds, products]);

  const revenue = useMemo(() => {
    return productIds.reduce(
      (acc: any, id: any) =>
        acc + (products[id]?.price * products[id]?.sold || 0),
      0
    );
  }, [productIds, products]);

  const totalProducts = useMemo(() => productIds.length, [productIds]);

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
            onDelete={handleDelete}
          />
        </Table>
      </TableContainer>
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this product?"
      />

      <ProductDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleSave}
        product={selectedProduct}
        categories={categories || []} // Thêm giá trị mặc định []
        colors={colors || []} // Tương tự cho colors
      />
    </div>
  );
}
