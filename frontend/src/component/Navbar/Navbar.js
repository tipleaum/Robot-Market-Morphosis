import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
  InputBase
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import SearchIcon from '@material-ui/icons/Search';
import { Link, useLocation } from 'react-router-dom';

import useStyles from "./styles";

const Navbar = ({ amount, filterRobots }) => {
  const classes = useStyles();
  const location = useLocation();
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    filterRobots(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
  }

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
          component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            Robot Market
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={classes.grow} />
          {location.pathname === '/' && (
          <div className={classes.button}>
            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
              <Badge badgeContent={amount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>)}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
