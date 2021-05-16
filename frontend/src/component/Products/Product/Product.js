import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

import useStyles from "./style";

const Product = ({ product, AddToCart }) => {
  const classes = useStyles();

  const handleAddToCart = () =>
    AddToCart(product.name, product.image, product.price);

  const formatDate = (createdAt) => {
    const date = createdAt.slice(8, 10);
    const month = createdAt.slice(5, 7);
    const year = createdAt.slice(0, 4);

    return `${date}-${month}-${year}`;
  }

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.image}
        title={product.name}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography gutterBottom variant="h6" component="h1">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            {Intl.NumberFormat("th-TH", {
              style: "currency",
              currency: "THB",
            }).format(product.price)}
          </Typography>
        </div>
        <Typography
          gutterBottom
          variant="body2"
          color="textSecondary"
          component="h2"
        >
          Material type: {product.material}
        </Typography>
        <Typography gutterBottom variant="caption" color="textSecondary" component="h1">
            Created at {formatDate(product.createdAt)}
          </Typography>
      </CardContent>
      {product.stock === 0 ? (
        <CardActions disableSpacing className={classes.cardActions}>
          <Typography gutterBottom variant="body2" color="secondary">
            Out of stock
          </Typography>
        </CardActions>
      ) : (
        <CardActions disableSpacing className={classes.cardActions}>
          <div className={classes.cardContent}>
            <Typography gutterBottom variant="caption">
              IN STOCK: {product.stock}
            </Typography>
          </div>
          <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default Product;
