import React, { useState, useCallback } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface Category {
  name: string;
}

interface CategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (category: Category) => void;
}

const CategoryDialog: React.FC<CategoryDialogProps> = React.memo(
  ({ open, onClose, onSubmit }) => {
    const [categoryName, setCategoryName] = useState<string>("");

    // Hàm xử lý khi nhấn nút "Save" để gửi dữ liệu
    const handleSubmit = useCallback(() => {
      if (categoryName.trim()) {
        onSubmit({ name: categoryName });
        onClose();
      }
    }, [categoryName, onSubmit, onClose]);

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default CategoryDialog;
