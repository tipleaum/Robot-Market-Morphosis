import React from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  BottomNavigation,
  BottomNavigationAction
} from "@material-ui/core";
import CartItem from "./CartItem/CartItem";

import useStyles from "./styles";

function Cart({ amount, totalCost, carts, UpdateQuantity, handleRemoveItem }) {
  const classes = useStyles();

  const renderEmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart.
    </Typography>
  );

  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {carts.map((cart) => (
          <Grid item xs={12} sm={4} key={cart.name}>
            <CartItem
              item={cart}
              UpdateQuantity={UpdateQuantity}
              handleRemoveItem={handleRemoveItem}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
          <footer className={classes.footer}>
              <div className={classes.footerLeft}>
                <Typography variant="h5">Total Amount: {amount}</Typography>
                </div>
                <div className={classes.footerRight}>
                    <Typography variant="h5">
                        Subtotal: {"  "}
                        {Intl.NumberFormat("th-TH", {
                        style: "currency",
                        currency: "THB",
                        }).format(totalCost)}
                    </Typography>
                </div>
          </footer>
      </div>
    </>
  );

  if (!carts) {
    return "You have no items in your shopping cart.";
  }

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!carts.length ? renderEmptyCart() : renderCart()}
    </Container>
  );
}

export default Cart;
