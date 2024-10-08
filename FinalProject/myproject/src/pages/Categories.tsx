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
} from "@mui/material";
import { AppDispatch } from "../store";
import {
  Button,
  CategoryList,
  ConfirmDialog,
  Notification,
  PaginationControl,
} from "../components";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import {
  addCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "../store/reducers/categoryReducer";

const ITEMS_PER_PAGE = 5;
const headers = [{ text: "No" }, { text: "Name" }, { text: "" }];

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    entities: categories = {},
    ids: categoryIds = [],
    status,
  } = useSelector((state: any) => state.category);
  const { entities: products = [] } = useSelector(
    (state: any) => state.product
  );

  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [productCount, setProductCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const handleEdit = useCallback(
    (id: string) => {
      setEditId(id);
      setEditName(categories[id].name);
    },
    [categories]
  );

  const handleSave = useCallback(
    (id: string) => {
      if (id === "new") {
        const maxId =
          categoryIds.length > 0 ? Math.max(...categoryIds.map(Number)) : 0;
        const newCategory = {
          id: (maxId + 1).toString(),
          name: newCategoryName,
        };
        dispatch(addCategory(newCategory));
        setIsAdding(false);
        setNewCategoryName("");
        setNotification({
          message: "Category added successfully!",
          type: "success",
        });
      } else {
        dispatch(updateCategory({ id, name: editName }));
        setEditId(null);
        setNotification({
          message: "Category updated successfully!",
          type: "success",
        });
      }
    },
    [editName, newCategoryName, categoryIds, dispatch]
  );

  const handleCancel = useCallback(() => {
    setEditId(null);
    setEditName("");
    setIsAdding(false);
    setNewCategoryName("");
  }, []);

  const handleDeleteClick = useCallback(
    (id: string) => {
      if (Array.isArray(products)) {
        const count = products.filter(
          (product: any) => product.categoryId === id
        ).length;
        console.log("count", count);
        setProductCount(count);
      } else {
        console.log("test");
        setProductCount(0);
      }
      setSelectedCategoryId(id);
      setOpenDialog(true);
    },
    [products]
  );

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
    setSelectedCategoryId(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (selectedCategoryId) {
      dispatch(deleteCategory(selectedCategoryId));
      setNotification({
        message: "Category deleted successfully!",
        type: "success",
      });
    }
    handleCloseDialog();
  }, [selectedCategoryId, dispatch, handleCloseDialog]);

  const handleAddCategory = () => {
    setIsAdding(true);
  };

  const totalPages = Math.ceil(categoryIds.length / ITEMS_PER_PAGE);

  const paginatedCategoryIds = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return categoryIds.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, categoryIds]);

  return (
    <div style={{ width: "100vw", paddingRight: "20px" }}>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
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
          disabled={isAdding}
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
            <CategoryList
              paginatedCategoryIds={paginatedCategoryIds}
              categories={categories}
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              editId={editId}
              editName={editName}
              isAdding={isAdding}
              newCategoryName={newCategoryName}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              onDeleteClick={handleDeleteClick}
              onNewCategoryChange={(e) => {
                if (editId) {
                  setEditName(e.target.value);
                } else {
                  setNewCategoryName(e.target.value);
                }
              }}
            />
          </TableBody>
        </Table>
      </TableContainer>

      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      />

      <ConfirmDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`This category is being used by ${productCount} product(s). Are you sure you want to delete it?`}
      />
    </div>
  );
};

export default Categories;
