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
import { validateString } from "../util/validation";
import { categoryAddComponent } from "./styles";

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

  const handleNotification = useCallback(
    (message: string, type: "success" | "error") => {
      setNotification({ message, type });
    },
    []
  );

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
    setSelectedCategoryId(null);
  }, []);

  const handleAddCategory = useCallback(() => {
    setIsAdding(true);
  }, []);

  const handleEdit = useCallback(
    (id: string) => {
      setEditId(id);
      setEditName(categories[id].name);
    },
    [categories]
  );

  const handleSave = useCallback(
    async (id?: string) => {
      const nameToValidate = id ? editName : newCategoryName;
      const validateFn = validateString("Category", 20);
      const error = validateFn(nameToValidate);

      if (error) {
        alert(error);
        return;
      }

      if (!id) {
        const maxId =
          categoryIds.length > 0 ? Math.max(...categoryIds.map(Number)) : 0;
        const newCategory = {
          id: (maxId + 1).toString(),
          name: newCategoryName,
        };

        const resultAction = await dispatch(addCategory(newCategory));
        if (addCategory.fulfilled.match(resultAction)) {
          handleNotification("Category added successfully!", "success");
        } else {
          handleNotification("Failed to add category", "error");
        }
        setIsAdding(false);
        setNewCategoryName("");
      } else {
        const resultAction = await dispatch(
          updateCategory({ id, name: editName })
        );
        if (updateCategory.fulfilled.match(resultAction)) {
          handleNotification("Category updated successfully!", "success");
        } else {
          handleNotification("Failed to update category", "error");
        }
        setEditId(null);
      }
    },
    [editName, newCategoryName, categoryIds, dispatch, handleNotification]
  );

  const handleCancel = useCallback(() => {
    setEditId(null);
    setEditName("");
    setIsAdding(false);
    setNewCategoryName("");
  }, []);

  const handleDeleteClick = useCallback(
    (id: string) => {
      const count = Object.values(products).filter((product: any) => {
        return String(product.categoryId) === String(id);
      }).length;
      setProductCount(count);
      setSelectedCategoryId(id);
      setOpenDialog(true);
    },
    [products]
  );

  const handleConfirmDelete = useCallback(async () => {
    if (selectedCategoryId) {
      const resultAction = await dispatch(deleteCategory(selectedCategoryId));
      if (deleteCategory.fulfilled.match(resultAction)) {
        handleNotification("Category deleted successfully!", "success");
      } else {
        handleNotification("Failed to delete category", "error");
      }
    }
    handleCloseDialog();
  }, [selectedCategoryId, dispatch, handleCloseDialog, handleNotification]);

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
        style={categoryAddComponent}
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
