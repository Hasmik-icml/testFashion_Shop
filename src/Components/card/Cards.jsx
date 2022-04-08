import { useEffect, useState } from "react";
import { getData, getProducts } from "../../Services/api";
import CardItem from "./CardItem";
import "./card.css"

const Cards = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    getProducts().then((param) => {
      setResult(param);
    });
  }, []);

  return (
    <div className="ui stackable three column grid productItems">
      
      {result.map((item) => {
        // console.log(item.img);
        return (
          <CardItem
            item={item}
            key={item.id}
            description={item?.description.comment || ""}
            img={item.img}
            name={item.name}
            price={item.price}
          />
        );
      })}
    </div>
  );
};

export default Cards;