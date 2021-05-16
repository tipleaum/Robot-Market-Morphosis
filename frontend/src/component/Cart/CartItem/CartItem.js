import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia, BottomNavigation } from '@material-ui/core';

import useStyles from './styles';
function CartItem({ item, UpdateQuantity, handleRemoveItem }) {
    const classes = useStyles();

    const handleUpdateCartQty = (name, code) => UpdateQuantity(name, code);
  
    const handleRemoveFromCart = (name, amount) => handleRemoveItem(name, amount);
  
    return (
      <Card className="cart-item">
        <CardMedia image={item.image} alt={item.name} className={classes.media} />
        <CardContent className={classes.cardContent}>
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="h6">{Intl.NumberFormat("th-TH", {
              style: "currency",
              currency: "THB",
            }).format(item.price)}</Typography>
        </CardContent>
        <CardContent>
            <Typography variant="body1" color='primary' align='right'>Total: {Intl.NumberFormat("th-TH", {
              style: "currency",
              currency: "THB",
            }).format(item.price * item.amount)}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <div className={classes.buttons}>
            <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.name, 'DECREASE')}>-</Button>
            <Typography>&nbsp;{item.amount}&nbsp;</Typography>
            <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.name, 'INCREASE')}>+</Button>
          </div>
          <Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(item.name, item.amount)} >Remove</Button>
        </CardActions>
      </Card>
    );
}

export default CartItem
