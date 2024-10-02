import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "./Button";

const TableBody: React.FC<any> = ({
  products,
  productIds,
  categories,
  colors,
  onEdit,
}) => {
  const getCategoryName = (categoryId: number) => {
    const category = categories.find((cat: any) => cat.id === categoryId);
    console.log("cat", category);
    return category ? category.name : "Unknown Category";
  };

  const getColorNames = (colorIds: number[]) => {
    return colorIds
      .map((colorId) => {
        console.log("Searching for color ID:", colorId); 
        const color = colors.find((col: any) => col.id === colorId);
        console.log("Found color:", color); 
        return color ? color.name : "Unknown Color";
      })
      .join(", ");
  };

  return (
    <>
      {productIds.map((id: number, index: number) => {
        const product = products[id];
        console.log("Product:", product);
        return (
          <TableRow key={id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.available}</TableCell>
            <TableCell>{product.sold}</TableCell>
            <TableCell>{getCategoryName(product.categoryId)}</TableCell>{" "}
            <TableCell>
              {getColorNames(product.colors)
                ? product.colors.join(", ")
                : "No colors available"}
            </TableCell>
            <TableCell>{product.price.toLocaleString()}</TableCell>
            <TableCell
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <Button
                label="Edit"
                onClick={() => onEdit(id)}
                startIcon={<EditIcon />}
              />
              <Button label="Delete" startIcon={<DeleteIcon />} color="error" />
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

export default TableBody;
