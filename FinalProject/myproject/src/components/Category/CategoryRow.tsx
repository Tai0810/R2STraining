import React, { memo } from "react";
import { TableRow, TableCell } from "@mui/material";
import { Button } from "..";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryInput from "./CategoryInput";
import { actionComponent } from "../styles";

interface CategoryRowProps {
  id: string;
  index: number;
  editId: string | null;
  editName: string;
  categoryName: string;
  isEditing: boolean;
  onSave: (id?: string) => void;
  onCancel: () => void;
  onEdit: (id: string) => void;
  onDeleteClick: (id: string) => void;
  onNewCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CategoryRow: React.FC<CategoryRowProps> = ({
  id,
  index,
  editId,
  editName,
  categoryName,
  isEditing,
  onSave,
  onCancel,
  onEdit,
  onDeleteClick,
  onNewCategoryChange,
}) => {
  return (
    <TableRow
      key={id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {index + 1}
      </TableCell>
      <TableCell style={{ width: "60%" }}>
        {isEditing ? (
          <CategoryInput
            id={id}
            name={editName}
            onNameChange={onNewCategoryChange}
            onSave={onSave}
            onCancel={onCancel}
          />
        ) : (
          categoryName
        )}
      </TableCell>
      <TableCell style={actionComponent}>
        <Button
          label="Edit"
          startIcon={<EditIcon />}
          onClick={() => onEdit(id)}
          disabled={isEditing}
        />
        <Button
          label="Delete"
          startIcon={<DeleteIcon />}
          color="error"
          onClick={() => onDeleteClick(id)}
          disabled={isEditing}
        />
      </TableCell>
    </TableRow>
  );
};

export default memo(CategoryRow);
