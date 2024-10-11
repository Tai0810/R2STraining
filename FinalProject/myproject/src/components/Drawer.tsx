import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { drawerStyle } from "./styles";
import { useSelector } from "react-redux";

export default function Drawer() {
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.auth);

  const menuItems = [
    { text: "Products", route: "/products", icon: <ShoppingCartIcon /> },
    { text: "Categories", route: "/categories", icon: <CategoryIcon /> },
    { text: "Colors", route: "/colors", icon: <ColorLensIcon /> },
  ];

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div style={{display: 'flex'}}>
      <Box
        style={drawerStyle}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => handleNavigation(item.route)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Outlet />
    </div>
  );
}
