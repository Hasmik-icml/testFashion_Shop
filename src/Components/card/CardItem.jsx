import "./cardItem.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import BuyProduct from "../buyProduct/BuyProduct";
import { Link } from "react-router-dom";
import logo from "../../logo.jpg"

function CardItem({ description, img, name, price, item }) {
  const { isAuthenticated, user } = useAuth0();

  return (
    <Card centered>
      <Image src={img.length > 0 && img[0].imagePath.includes("localhost:8080") ? img[0].imagePath : logo } height="200px" />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Description>{description.comment}</Card.Description>
      </Card.Content>

      <Card.Content>
        {price}
        {isAuthenticated ? (
          <BuyProduct 
            item={item}
            productInfo={{ description, img, name, price }}
          />
        ) : (
          <Button as={Link} to="/login" className="buyBtn">
            BUY
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}

export default CardItem;
