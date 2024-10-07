import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "./Button";

interface TableRowComponentProps {
  product: any;
  index: number;
  category: string;
  colors: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TableRowComponent: React.FC<TableRowComponentProps> = ({
  product,
  index,
  category,
  colors,
  onEdit,
  onDelete,
}) => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.available}</TableCell>
      <TableCell>{product.sold}</TableCell>
      <TableCell>{category}</TableCell>
      <TableCell>{colors}</TableCell>
      <TableCell>{product.price.toLocaleString()}</TableCell>
      <TableCell
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Button
          label="Edit"
          onClick={() => onEdit(product.id)}
          startIcon={<EditIcon />}
        />
        <Button
          label="Delete"
          startIcon={<DeleteIcon />}
          color="error"
          onClick={() => onDelete(product.id)}
        />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(TableRowComponent);
