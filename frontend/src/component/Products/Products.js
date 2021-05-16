import React, { useState, useEffect } from "react";
import { Grid, Select } from "@material-ui/core";
import Product from "./Product/Product";

import useStyles from "./styles";

const Products = ({ robots, AddToCart }) => {
  const classes = useStyles();
  
  return (
    <div className={classes.grid}>
      <Grid container justify='flex-end' spacing={4} alignItems='flex-start' alignContent='space-between'>
        <div className={classes.toolbar} />
        {robots.map((product) => (
          <Grid key={product.name} item xs={12} sm={3}>
            <Product product={product} AddToCart={AddToCart} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
