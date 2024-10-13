export const inputStyles = {
  marginTop: "20px",
  display: "flex",
  flex: 1,
};

export const drawerStyle = {
  width: 250,
  height: "100vh",
  backgroundColor: "aqua",
  marginRight: "20px",
};

export const rowCategoryList = {
  display: "flex",
  alignItems: "center",
};

export const rowButtonCategoryList = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  width: "30%",
};

export const actionComponent = {
  display: "flex",
  justifyContent: "space-evenly",
};

export const notificationStyles: React.CSSProperties = {
  position: "fixed",
  top: "20px",
  right: "20px",
  padding: "10px",
  borderRadius: "5px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  minWidth: "200px",
  textAlign: "center",
};

export const successStyle: React.CSSProperties = {
  ...notificationStyles,
  backgroundColor: "green",
  color: "white",
};

export const errorStyle: React.CSSProperties = {
  ...notificationStyles,
  backgroundColor: "red",
  color: "white",
};

export const numFieldTable: React.CSSProperties = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: 150,
};

export const textFieldTable: React.CSSProperties = {
  whiteSpace: "normal",
  wordWrap: "break-word",
};

export const tableStyle: React.CSSProperties = {
  tableLayout: "fixed",
  width: "100%",
};

export const fixedCellStyle: React.CSSProperties = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: 100,
};
