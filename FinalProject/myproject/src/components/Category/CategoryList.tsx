import React from "react";
import { TableRow, TableCell, TextField } from "@mui/material";
import { Button } from "..";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  actionComponent,
  rowButtonCategoryList,
  rowCategoryList,
} from "../styles";

interface CategoryListProps {
  paginatedCategoryIds: string[];
  categories: Record<string, { name: string }>;
  currentPage: number;
  itemsPerPage: number;
  editId: string | null;
  editName: string;
  isAdding: boolean;
  newCategoryName: string;
  onEdit: (id: string) => void;
  onSave: (id: string) => void;
  onCancel: () => void;
  onDeleteClick: (id: string) => void;
  onNewCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  paginatedCategoryIds,
  categories,
  currentPage,
  itemsPerPage,
  editId,
  editName,
  isAdding,
  newCategoryName,
  onEdit,
  onSave,
  onCancel,
  onDeleteClick,
  onNewCategoryChange,
}) => {
  return (
    <>
      {paginatedCategoryIds.map((id: string, index: number) => (
        <TableRow
          key={id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {index + 1 + (currentPage - 1) * itemsPerPage}
          </TableCell>
          <TableCell style={{ width: "60%" }}>
            {editId === id ? (
              <div style={rowCategoryList}>
                <TextField
                  value={editName}
                  onChange={onNewCategoryChange}
                  variant="outlined"
                  size="small"
                />
                <div style={rowButtonCategoryList}>
                  <Button label="Save" onClick={() => onSave(id)} />
                  <Button label="Cancel" color="warning" onClick={onCancel} />
                </div>
              </div>
            ) : (
              categories[id].name
            )}
          </TableCell>

          <TableCell style={actionComponent}>
            <Button
              label="Edit"
              startIcon={<EditIcon />}
              onClick={() => onEdit(id)}
            />
            <Button
              label="Delete"
              startIcon={<DeleteIcon />}
              color="error"
              onClick={() => onDeleteClick(id)}
            />
          </TableCell>
        </TableRow>
      ))}
      {isAdding && (
        <TableRow>
          <TableCell>{paginatedCategoryIds.length + 1}</TableCell>
          <TableCell style={rowCategoryList}>
            <TextField
              value={newCategoryName}
              onChange={onNewCategoryChange}
              variant="outlined"
              size="small"
              placeholder="Enter new category name"
            />
            <div style={rowButtonCategoryList}>
              <Button label="Save" onClick={() => onSave("new")} />
              <Button label="Cancel" color="warning" onClick={onCancel} />
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default CategoryList;
