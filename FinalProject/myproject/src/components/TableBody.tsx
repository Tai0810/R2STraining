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
  const getCategoryNameById = (id: string) => {
    const category = categories[id];
    return category ? category.name : "Unknown";
  };
  

  const getColorNamesById = (colorIds: number[] = []) => {
    if (colorIds.length === 0) {
      return "No colors available";
    } else if (colorIds.length === 1) {
      const colorName = colors[colorIds[0]]?.name;
      console.log("colorName", colorIds[0]);
      return colorName ? colorName : "Unknown color";
    } else {
      return colorIds
        .map((colorId) => colors[colorId]?.name || "Unknown")
        .join(", ");
    }
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
            <TableCell>{getCategoryNameById(product.categoryId)}</TableCell>
            <TableCell>{getColorNamesById(product.colorIds || [])}</TableCell>
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
