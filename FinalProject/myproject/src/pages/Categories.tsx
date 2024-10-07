import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { AppDispatch } from "../store";
import { Button, CategoryDialog } from "../components";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { fetchProducts } from "../store/reducers/productReducer";
import { addCategory, deleteCategory } from "../store/reducers/categoryReducer";

const ITEMS_PER_PAGE = 5; // Số mục trên mỗi trang

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { entities: categories = {}, ids: categoryIds = [] } = useSelector(
    (state: any) => state.category
  );

  const { entities: products = {} } = useSelector(
    (state: any) => state.product
  );

  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [productCount, setProductCount] = useState<number>(0);
  const [openCategoryDialog, setOpenCategoryDialog] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1); // Trạng thái cho trang hiện tại

  const headers = [{ text: "No" }, { text: "Name" }, { text: "" }];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const getProductCountByCategory = useCallback(
    (categoryId: string) => {
      return Object.values(products).filter(
        (product: any) => product.category === categoryId
      ).length;
    },
    [products]
  );

  const handleEdit = useCallback((id: string) => {
    setEditId(id);
    setEditName(categories[id].name);
  }, [categories]);

  const handleSave = useCallback(
    (id: string) => {
      console.log("Saving:", id, editName);
      setEditId(null);
    },
    [editName]
  );

  const handleCancel = useCallback(() => {
    setEditId(null);
    setEditName("");
  }, []);

  const handleDeleteClick = useCallback(
    (id: string) => {
      setSelectedCategoryId(id);
      const count = getProductCountByCategory(id);
      setProductCount(count);
      setOpenDialog(true);
    },
    [getProductCountByCategory]
  );

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
    setSelectedCategoryId(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (selectedCategoryId) {
      console.log("Deleting category with ID:", selectedCategoryId);
      dispatch(deleteCategory(selectedCategoryId));
    }
    handleCloseDialog();
  }, [selectedCategoryId, dispatch, handleCloseDialog]);

  const handleAddCategory = () => {
    setOpenCategoryDialog(true);
  };

  const handleSubmitCategory = useCallback(
    (newCategory: any) => {
      console.log("Adding new category:", newCategory);
      const categoryToAdd = {
        ...newCategory,
        id: newCategory.id?.toString(),
      };
      const maxId =
        categoryIds.length > 0 ? Math.max(...categoryIds.map(Number)) : 0;
      categoryToAdd.id = (maxId + 1).toString();
      dispatch(addCategory(categoryToAdd));
      setOpenCategoryDialog(false);
    },
    [categoryIds, dispatch]
  );

  // Tính số trang tổng
  const totalPages = Math.ceil(categoryIds.length / ITEMS_PER_PAGE);
  
  // Chỉ hiển thị danh mục theo trang hiện tại
  const paginatedCategoryIds = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return categoryIds.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, categoryIds]);

  const categoryList = useMemo(() => {
    return paginatedCategoryIds.map((id: string, index: number) => (
      <TableRow
        key={id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {index + 1 + (currentPage - 1) * ITEMS_PER_PAGE}
        </TableCell>
        <TableCell>
          {editId === id ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                variant="outlined"
                size="small"
              />
              <Button label="Save" onClick={() => handleSave(id)} />
              <Button label="Cancel" onClick={handleCancel} />
            </div>
          ) : (
            categories[id].name
          )}
        </TableCell>

        <TableCell>
          <div>
            <Button
              label="Edit"
              startIcon={<EditIcon />}
              color="success"
              onClick={() => handleEdit(id)}
            />
            <Button
              label="Delete"
              startIcon={<DeleteIcon />}
              color="error"
              onClick={() => handleDeleteClick(id)}
            />
          </div>
        </TableCell>
      </TableRow>
    ));
  }, [
    paginatedCategoryIds,
    categories,
    editId,
    editName,
    handleEdit,
    handleSave,
    handleCancel,
    handleDeleteClick,
  ]);

  return (
    <div style={{ width: "100vw", paddingRight: "20px" }}>
      <h1>Categories List</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <Button
          label="Add"
          color="success"
          startIcon={<AddToPhotosIcon />}
          onClick={handleAddCategory}
        />
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
          <TableBody>{categoryList}</TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        <Button
          label="Previous"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />
        <Button
          label="Next"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        />
      </div>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`This category is currently being used by ${productCount} products. Are you sure you want to delete it?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button label="Cancel" onClick={handleCloseDialog} />
          <Button label="Confirm" onClick={handleConfirmDelete} color="error" />
        </DialogActions>
      </Dialog>

      <CategoryDialog
        open={openCategoryDialog}
        onClose={() => setOpenCategoryDialog(false)}
        onSubmit={handleSubmitCategory}
      />
    </div>
  );
};

export default Categories;
