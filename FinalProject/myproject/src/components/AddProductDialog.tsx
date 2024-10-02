import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Box,
} from "@mui/material";

interface Product {
  id: number;
  name: string;
  available: number;
  category: string;
  colors: string[];
  price: number;
}

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  onSave: (updatedProduct: Product) => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({
  open,
  onClose,
  product,
  onSave,
}) => {
  const [editedProduct, setEditedProduct] = React.useState<Product>(product);

  React.useEffect(() => {
    setEditedProduct(product); 
  }, [product]);

  const handleChange =
    (field: keyof Product) =>
    (event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      setEditedProduct({ ...editedProduct, [field]: event.target.value });
    };

  const handleSave = () => {
    onSave(editedProduct);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={editedProduct.name}
          onChange={handleChange("name")}
        />
        <TextField
          margin="dense"
          label="Available"
          type="number"
          fullWidth
          value={editedProduct.available}
          onChange={handleChange("available")}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Category</InputLabel>
          <Select
            value={editedProduct.category}
            // onChange={handleChange("category")}
          >
            <MenuItem value="cloth">Cloth</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="furniture">Furniture</MenuItem>
          </Select>
        </FormControl>
        <Box>
          <InputLabel>Colors</InputLabel>
          <Box display="flex" gap={2}>
            {["Blue", "Yellow", "Black", "Gray"].map((color) => (
              <Button
                key={color}
                variant={
                  Array.isArray(editedProduct.colors) &&
                  editedProduct.colors.includes(color)
                    ? "contained"
                    : "outlined"
                }
                onClick={() =>
                  setEditedProduct((prev) => ({
                    ...prev,
                    colors: prev.colors.includes(color)
                      ? prev.colors.filter((c) => c !== color)
                      : [...prev.colors, color],
                  }))
                }
              >
                {color}
              </Button>
            ))}
          </Box>
        </Box>
        <TextField
          margin="dense"
          label="Price"
          type="number"
          fullWidth
          value={editedProduct.price}
          onChange={handleChange("price")}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;
