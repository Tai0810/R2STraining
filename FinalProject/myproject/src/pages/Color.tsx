import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchColors } from "../store/reducers/colorReducer";
import { AppDispatch } from "../store";
import { Button } from "@mui/material";
import { Input } from "../components";
// import { Button } from "../components";

const Color = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    entities: colors = {},
    ids: colorIds = [],
    status,
    error,
  } = useSelector((state: any) => state.color);
  React.useEffect(() => {
    console.log(status);

    if (status === "idle") {
      dispatch(fetchColors());
    }
  }, [status, dispatch]);

  return (
    <div style={{ width: "100vw" }}>
      <h1>Color List</h1>
      <div
        style={{
          display: "flex",
        }}
      >
        {colorIds.map((id: string) => (
          <div
            style={{
              marginRight: "10px",
              backgroundColor: "lightgray",
              padding: "10px",
              borderRadius: '20px',
            }}
          >
            {colors[id].name}
          </div>
        ))}
          <Input/>
      </div>
    </div>
  );
};

export default Color;
