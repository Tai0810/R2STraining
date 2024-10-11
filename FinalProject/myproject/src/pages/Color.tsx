import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchColors,
  addColor,
  deleteColor,
} from "../store/reducers/colorReducer";
import { AppDispatch } from "../store";
import { Button, ConfirmDialog, Notification } from "../components";
import ClearIcon from "@mui/icons-material/Clear";
import { TextField } from "@mui/material";
import {
  addColorComponent,
  colorBody,
  colorItem,
  deleteColorItem,
} from "./styles";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";

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
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchColors());
    }
  }, [status, dispatch]);

  const handleNotification = useCallback(
    (message: string, type: "success" | "error") => {
      setNotification({ message, type });
    },
    []
  );

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
    setSelectedColorId(null);
  }, []);

  const handleAddColor = useCallback(async (id?: string) => {
    if (newColor.trim()) {
      const newColorId =
        colorIds.length > 0
          ? (Math.max(...colorIds.map(Number)) + 1).toString()
          : "1";
      const resultAction = await dispatch(
        addColor({ id: newColorId, name: newColor })
      );
      if (addColor.fulfilled.match(resultAction)) {
        handleNotification("Color added successfully!", "success");
      } else {
        handleNotification("Failed to add color!", "error");
      }
      setNewColor("");
    }
  }, [colorIds, dispatch, newColor, handleNotification]);

  const handleDeleteClick = useCallback((colorId: string) => {
    setSelectedColorId(colorId);
    setOpenDialog(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (selectedColorId !== null) {
      const resultAction = await dispatch(deleteColor(selectedColorId));
      if (deleteColor.fulfilled.match(resultAction)) {
        handleNotification("Color deleted successfully!", "success");
      } else {
        handleNotification("Failed to delete color!", "error");
      }
    }
    handleCloseDialog();
  }, [selectedColorId, dispatch, handleCloseDialog, handleNotification]);

  const colorList = useMemo(() => {
    return colorIds.map((id: string) => (
      <div key={id} style={colorItem}>
        {colors[id].name}
        <div style={deleteColorItem} onClick={() => handleDeleteClick(id)}>
          <ClearIcon fontSize="small" color="inherit" />
        </div>
      </div>
    ));
  }, [colorIds, colors, handleDeleteClick]);

  return (
    <div style={{ width: "100vw" }}>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <h1>Color List</h1>
      <div style={{ display: "flex" }}>
        <div style={colorBody}>{colorList}</div>

        <div style={addColorComponent}>
          <TextField
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            placeholder="Add a new color"
            style={{ marginRight: "10px" }}
          />
          <Button
            variant="outlined"
            label="Add"
            color="success"
            startIcon={<AddToPhotosIcon />}
            onClick={handleAddColor}
          />
        </div>
      </div>
      <ConfirmDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this color?"
      />
    </div>
  );
};

export default Color;
