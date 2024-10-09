import React from "react";
import { TextField } from "@mui/material";
import { Button } from "..";
import { rowCategoryList, rowButtonCategoryList } from "../styles";

interface CategoryInputProps {
  id?: string; // ID sẽ là undefined khi thêm mới
  name: string; // Tên category (được sử dụng cho cả thêm mới và chỉnh sửa)
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Hàm để xử lý sự thay đổi tên
  onSave: (id?: string) => void; // Hàm để lưu category
  onCancel: () => void; // Hàm để hủy
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

export default CategoryInput;
