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
} from "@mui/material";
import { AppDispatch } from "../store";
import { Button, ConfirmDialog } from "../components";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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

  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

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
        // Add new category
        const maxId =
          categoryIds.length > 0 ? Math.max(...categoryIds.map(Number)) : 0;
        const newCategory = {
          id: (maxId + 1).toString(),
          name: newCategoryName,
        };
        dispatch(addCategory(newCategory));
        setIsAdding(false);
        setNewCategoryName("");
      } else {
        // Update existing category
        dispatch(updateCategory({ id, name: editName }));
        setEditId(null);
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

  const handleDeleteClick = useCallback((id: string) => {
    setSelectedCategoryId(id);
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
    setSelectedCategoryId(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (selectedCategoryId) {
      dispatch(deleteCategory(selectedCategoryId));
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
            {categoryList}
            {isAdding && (
              <TableRow>
                <TableCell>{categoryIds.length + 1}</TableCell>
                <TableCell>
                  <TextField
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    variant="outlined"
                    size="small"
                    placeholder="Enter new category name"
                  />
                </TableCell>
                <TableCell>
                  <Button label="Save" onClick={() => handleSave("new")} />
                  <Button label="Cancel" onClick={handleCancel} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <Button
          label="Previous"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />
        <Button
          label="Next"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        />
      </div>

      <ConfirmDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this category?"
      />
    </div>
  );
};

export default Categories;
