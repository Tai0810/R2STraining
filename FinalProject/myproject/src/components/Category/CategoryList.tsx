import React from "react";
import CategoryRow from "./CategoryRow";
import CategoryInput from "./CategoryInput";
import { TableRow, TableCell } from "@mui/material";

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
  onSave: (id?: string) => void; 
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
        <CategoryRow
          key={id}
          id={id}
          index={index + (currentPage - 1) * itemsPerPage}
          editId={editId}
          editName={editName}
          categoryName={categories[id].name}
          isEditing={editId === id}
          onEdit={onEdit}
          onSave={onSave}
          onCancel={onCancel}
          onDeleteClick={onDeleteClick}
          onNewCategoryChange={onNewCategoryChange}
        />
      ))}
      {isAdding && (
        <TableRow>
          <TableCell>{paginatedCategoryIds.length + 1}</TableCell>
          <TableCell>
            <CategoryInput
              name={newCategoryName}
              onNameChange={onNewCategoryChange}
              onSave={onSave} 
              onCancel={onCancel}
            />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default CategoryList;
