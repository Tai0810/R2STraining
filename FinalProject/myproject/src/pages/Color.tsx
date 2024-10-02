import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchColors } from "../store/reducers/colorReducer";
import { AppDispatch } from "../store";

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
      {colorIds.map((id: string, index: number) => (
        <div
          style={{
            backgroundColor: "yellow",
            // display: "flex",
            // flexDirection: "row",
          }}
          key={id}
        >
          
          <div>{colors[id].name} X</div>

          
        </div>
      ))}
    </div>
  );
};

export default Color;
