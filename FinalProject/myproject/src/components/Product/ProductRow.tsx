import React, { memo } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "../Button";
import {
  actionComponent,
  fixedCellStyle,
  textFieldTable,
} from "../styles";
import Tooltip from "@mui/material/Tooltip";

interface TableRowComponentProps {
  product: any;
  index: number;
  category: string;
  colors: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ProductRow: React.FC<TableRowComponentProps> = ({
  product,
  index,
  category,
  colors,
  onEdit,
  onDelete,
}) => {
  return (
    <TableRow>
      <TableCell style={fixedCellStyle}>{index + 1}</TableCell>

      <TableCell style={{ ...textFieldTable, ...fixedCellStyle }}>
        <Tooltip title={product.name}>
          <span>{product.name}</span>
        </Tooltip>
      </TableCell>

      <TableCell style={fixedCellStyle}>{product.available}</TableCell>
      <TableCell style={fixedCellStyle}>{product.sold}</TableCell>

      <TableCell style={{ ...textFieldTable, ...fixedCellStyle }}>
        <Tooltip title={category}>
          <span>{category}</span>
        </Tooltip>
      </TableCell>

      <TableCell style={{ ...textFieldTable, ...fixedCellStyle }}>
      <Tooltip title={colors}>
          <span>{colors}</span>
        </Tooltip>
      </TableCell>

      <TableCell style={{ ...textFieldTable, ...fixedCellStyle }}>
        <Tooltip title={product.price}>
          <span>{product.price.toLocaleString()}</span>
        </Tooltip>
      </TableCell>

      <TableCell style={actionComponent}>
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

export default memo(ProductRow);
