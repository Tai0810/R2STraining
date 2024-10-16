import { useCallback, useEffect, useMemo, useState } from "react";
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
import {
  productComponent,
  totalAddComponent,
  totalComponent,
  totalField,
} from "./styles";
import {
  Button,
  ConfirmDialog,
  Notification,
  PaginationControl,
  ProductDialog,
  ProductList,
} from "../components";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { fetchColors } from "../store/reducers/colorReducer";
import { fetchCategories } from "../store/reducers/categoryReducer";

const headers = [
  { text: "No" },
  { text: "Name" },
  { text: "Available" },
  { text: "Sold" },
  { text: "Category" },
  { text: "Colors" },
  { text: "Price" },
  { text: "" },
];

const ITEMS_PER_PAGE = 5;

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
  const [originalProduct, setOriginalProduct] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(productIds.length / ITEMS_PER_PAGE);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
    dispatch(fetchColors());
    dispatch(fetchCategories());
  }, [status, dispatch]);

  const handleNotification = useCallback(
    (message: string, type: "success" | "error") => {
      setNotification({ message, type });
    },
    []
  );

  const handleCloseDialog = useCallback(() => {
    setOpenConfirmDialog(false);
    setSelectedProduct(null);
    setOriginalProduct(null);
    setDialogMode("add");
  }, []);

  const handleAdd = useCallback(() => {
    setDialogMode("add");
    setSelectedProduct({
      id: "",
      name: "",
      available: 0,
      sold: 0,
      price: 0,
      colorIds: [], 
      categoryId: 1,
    });
    setOpenDialog(true);
  }, []);

  const handleEdit = useCallback(
    (productId: number) => {
      const productToEdit = products[productId];
      setOriginalProduct({ ...productToEdit });
      setSelectedProduct(productToEdit);
      setDialogMode("edit");
      setOpenDialog(true);
    },
    [products]
  );

  const handleSave = useCallback(
    async (updatedProduct: any) => {
      const productToSave = {
        ...updatedProduct,
        colorIds: updatedProduct.colorIds.map((colorId: []) => Number(colorId)),
      };

      if (dialogMode === "add") {
        const maxId =
          productIds.length > 0 ? Math.max(...productIds.map(Number)) : 0;
        productToSave.id = (maxId + 1).toString();
        const resultAction = await dispatch(addProduct(productToSave));
        if (addProduct.fulfilled.match(resultAction)) {
          handleNotification("Product added successfully!", "success");
        } else {
          handleNotification("Failed to add product!", "error");
        }
      } else if (updatedProduct.id) {
        productToSave.id = updatedProduct.id.toString();
        const resultAction = await dispatch(updateProduct(productToSave));
        if (updateProduct.fulfilled.match(resultAction)) {
          handleNotification("Product updated successfully!", "success");
        } else {
          handleNotification("Failed to update product!", "error");
        }
      }
      setSelectedProduct(null); 
      setOpenDialog(false);
    },
    [dispatch, dialogMode, productIds, handleNotification]
  );

  const handleDelete = useCallback((productId: number) => {
    setProductIdToDelete(productId);
    setOpenConfirmDialog(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (productIdToDelete) {
      const resultAction = await dispatch(deleteProduct(productIdToDelete));

      if (deleteProduct.fulfilled.match(resultAction)) {
        setNotification({
          message: "Product deleted successfully!",
          type: "success",
        });
      } else {
        setNotification({
          message: "Failed to delete product",
          type: "error",
        });
      }
      setProductIdToDelete(null);
      setOpenConfirmDialog(false);
    }
  }, [productIdToDelete, dispatch]);

  const totalAvailable = useMemo(() => {
    return productIds.reduce(
      (acc: number, id: string) => acc + (products[id]?.available || 0),
      0
    );
  }, [productIds, products]);

  const totalSold = useMemo(() => {
    return productIds.reduce(
      (acc: number, id: string) => acc + (products[id]?.sold || 0),
      0
    );
  }, [productIds, products]);

  const revenue = useMemo(() => {
    return productIds
      .reduce(
        (acc: number, id: string) =>
          acc + (products[id]?.price * products[id]?.sold || 0),
        0
      )
      .toLocaleString();
  }, [productIds, products]);

  const totalProducts = useMemo(() => productIds.length, [productIds]);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return productIds.slice(startIndex, endIndex);
  }, [currentPage, productIds]);

  return (
    <div style={productComponent}>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <h1>Seller</h1>
      <div style={totalAddComponent}>
        <div style={{ width: "50%" }}></div>
        <div style={totalComponent}>
          <div style={totalField}>Total: {totalProducts}</div>
          <div style={totalField}>Available: {totalAvailable}</div>
          <div style={totalField}>Sold: {totalSold}</div>
          <div style={totalField}>Revenue: {revenue}</div>
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
          <ProductList
            products={products}
            productIds={currentProducts}
            categories={categories}
            colors={colors}
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Table>
      </TableContainer>

      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      />

      <ConfirmDialog
        open={openConfirmDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this product?"
      />

      <ProductDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          handleCloseDialog();
        }}
        onSubmit={handleSave}
        product={selectedProduct}
        categories={categories || []}
        colors={colors || []}
      />
    </div>
  );
}
