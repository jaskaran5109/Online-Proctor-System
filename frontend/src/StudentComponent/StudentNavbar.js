import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/studentAction";

const StudentNavbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.student);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#05172e" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, padding: "10px" }}
          >
            {/* {localStorage.getItem("organizationName").replace(/["']/g, "")} */}
          </Typography>
          {isAuthenticated === true ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link
              to="/studentlogin"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default StudentNavbar;
