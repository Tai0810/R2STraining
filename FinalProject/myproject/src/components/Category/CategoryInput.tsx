import React, { memo } from "react";
import { TextField } from "@mui/material";
import { Button } from "..";
import { rowCategoryList, rowButtonCategoryList } from "../styles";

interface CategoryInputProps {
  id?: string;
  name: string; 
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  onSave: (id?: string) => void; 
  onCancel: () => void; 
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  id,
  name,
  onNameChange,
  onSave,
  onCancel,
}) => {
  return (
    <div style={rowCategoryList}>
      <TextField
        value={name}
        onChange={onNameChange}
        variant="outlined"
        size="small"
        placeholder="Enter category name"
      />
      <div style={rowButtonCategoryList}>
        <Button label="Save" onClick={() => onSave(id)} />
        <Button label="Cancel" color="warning" onClick={onCancel} />
      </div>
    </div>
  );
};

export default memo(CategoryInput);
