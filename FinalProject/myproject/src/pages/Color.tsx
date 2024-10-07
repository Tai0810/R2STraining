import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchColors,
  addColor,
  deleteColor,
} from "../store/reducers/colorReducer";
import { AppDispatch } from "../store";
import { Button } from "../components";
import ClearIcon from "@mui/icons-material/Clear";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { colorBody, colorItem, deleteColorItem } from "./styles";

const Color = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    entities: colors = {},
    ids: colorIds = [],
    status,
  } = useSelector((state: any) => state.color);

  const [newColor, setNewColor] = useState("");
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchColors());
    }
  }, [status, dispatch]);

  const handleAddColor = () => {
    if (newColor.trim()) {
      const newColorId =
        colorIds.length > 0
          ? (Math.max(...colorIds.map(Number)) + 1).toString()
          : "1";
      dispatch(addColor({ id: newColorId, name: newColor }));
      setNewColor("");
    }
  };

  const handleDeleteClick = (colorId: string) => {
    setSelectedColorId(colorId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedColorId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedColorId !== null) {
      dispatch(deleteColor(selectedColorId.toString()));
    }
    handleCloseDialog();
  };

  return (
    <div style={{ width: "100vw" }}>
      <h1>Color List</h1>
      <div style={{ display: "flex" }}>
        <div style={colorBody}>
          {colorIds.map((id: string) => (
            <div key={id} style={colorItem}>
              {colors[id].name}
              <div style={deleteColorItem} onClick={() => handleDeleteClick(id)}>
                <ClearIcon fontSize="small" color="inherit" />
              </div>
            </div>
          ))}
        </div>

        <div style={{ width: "30%" }}>
          <TextField
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            placeholder="Add a new color"
            style={{ marginRight: "10px" }}
          />
          <Button variant="contained" label="Add" onClick={handleAddColor} />
        </div>
      </div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this color?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button label="Cancel" onClick={handleCloseDialog} />
          <Button label="Confirm" onClick={handleConfirmDelete} color="error" />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Color;
