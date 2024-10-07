import React, { useEffect, useState } from "react";
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

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    entities: categories = {},
    ids: categoryIds = [],
  } = useSelector((state: any) => state.category);

  // Lấy danh sách sản phẩm từ store
  const { entities: products = {} } = useSelector((state: any) => state.product);

  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");

  // State để quản lý dialog xóa
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [productCount, setProductCount] = useState<number>(0); // State để lưu số lượng sản phẩm liên quan

  // State để quản lý dialog thêm danh mục
  const [openCategoryDialog, setOpenCategoryDialog] = useState<boolean>(false);

  const headers = [{ text: "No" }, { text: "Name" }, { text: "" }];

  const handleEdit = (id: string) => {
    setEditId(id);
    setEditName(categories[id].name);
  };

  const handleSave = (id: string) => {
    console.log("Saving:", id, editName);
    // Thêm logic lưu lại danh mục ở đây, ví dụ gọi dispatch
    setEditId(null);
  };

  const handleCancel = () => {
    setEditId(null);
    setEditName("");
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Hàm để lấy số lượng sản phẩm sử dụng category
  const getProductCountByCategory = (categoryId: string) => {
    return Object.values(products).filter(
      (product: any) => product.category === categoryId // Sửa logic để so sánh category dưới dạng chuỗi
    ).length;
  };

  // Mở dialog xóa
  const handleDeleteClick = (id: string) => {
    setSelectedCategoryId(id);
    const count = getProductCountByCategory(id); // Lấy số lượng sản phẩm sử dụng category này
    setProductCount(count); // Cập nhật state với số lượng sản phẩm
    setOpenDialog(true);
  };

  // Đóng dialog xóa
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCategoryId(null);
  };

  // Xác nhận xóa
  const handleConfirmDelete = () => {
    if (selectedCategoryId) {
      // Thực hiện xóa (gọi dispatch xóa category)
      console.log("Deleting category with ID:", selectedCategoryId);
      dispatch(deleteCategory(selectedCategoryId)); // ID được gửi dưới dạng chuỗi
    }
    handleCloseDialog();
  };

  // Hàm mở dialog thêm danh mục
  const handleAddCategory = () => {
    setOpenCategoryDialog(true);
  };

  // Hàm xử lý thêm danh mục mới
  const handleSubmitCategory = (newCategory: any) => {
    console.log("Adding new category:", newCategory);
    // Dispatch thêm danh mục vào store
    dispatch(addCategory(newCategory)); // Gọi dispatch thêm danh mục mới
    setOpenCategoryDialog(false);
  };

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
          onClick={handleAddCategory} // Gọi hàm mở dialog
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
          <TableBody>
            {categoryIds.map((id: string, index: number) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
