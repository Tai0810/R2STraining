import React, { useCallback, useEffect, useMemo, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

interface Product {
  id?: number;
  name: string;
  available: number;
  sold: number;
  categoryId: number;
  colorIds: number[];
  price: number;
}

interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (product: Product) => void;
  product?: Product | null;
  categories: { id: number; name: string }[];
  colors: { id: number; name: string }[];
}

const ProductDialog: React.FC<ProductDialogProps> = React.memo(
  ({ open, onClose, onSubmit, product, categories, colors }) => {
    const [formData, setFormData] = useState<Product>({
      name: "",
      available: 0,
      sold: 0,
      categoryId: 0,
      colorIds: [] as number[],
      price: 0,
    });

    useEffect(() => {
      setFormData({
        id: product?.id || new Date().getTime(),
        name: product?.name || "",
        available: product?.available || 0,
        sold: product?.sold || 0,
        categoryId: product?.categoryId || 0,
        colorIds: product?.colorIds || [],
        price: product?.price || 0,
      });
    }, [product]);

    const handleColorToggle = useCallback((colorId: number) => {
      setFormData((prev) => {
        const updatedColors = prev.colorIds.includes(colorId)
          ? prev.colorIds.filter((id) => id !== colorId)
          : [...prev.colorIds, colorId];
        return { ...prev, colorIds: updatedColors };
      });
    }, []);

    const handleSubmit = useCallback(() => {
      console.log("Submitting product:", formData);
      console.log("ID Type:", typeof formData.id);
      console.log("Updated Product ID:", formData.id);
      onSubmit(formData);
      onClose();
    }, [formData, onSubmit, onClose]);

    const categoryArray = Object.values(categories);
    const renderedCategories = useMemo(() => {
      return categoryArray.map((category) => (
        <MenuItem key={category.id} value={category.id}>
          {category.name}
        </MenuItem>
      ));
    }, [categoryArray]);

    const colorArray = Object.values(colors);
    const renderedColors = useMemo(() => {
      return colorArray.map((color) => {
        const isSelected = formData.colorIds.includes(Number(color.id));
        return (
          <Button
            key={color.id}
            variant={isSelected ? "contained" : "outlined"}
            onClick={() => handleColorToggle(Number(color.id))}
            style={{ margin: "4px" }}
          >
            {color.name}
          </Button>
        );
      });
    }, [colorArray, formData.colorIds, handleColorToggle]);

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Available"
            type="number"
            fullWidth
            name="available"
            value={formData.available}
            onChange={(e) =>
              setFormData({ ...formData, available: +e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Sold"
            type="number"
            fullWidth
            name="sold"
            value={formData.sold}
            onChange={(e) =>
              setFormData({ ...formData, sold: +e.target.value })
            }
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: +e.target.value })
              }
            >
              {renderedCategories}
            </Select>
          </FormControl>
          <div style={{ margin: "16px 0" }}>
            <span>Colors:</span>
            <div>{renderedColors}</div>
          </div>
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            name="price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: +e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {product ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default ProductDialog;
