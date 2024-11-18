import React, { useContext } from "react";
import "./btns.css";
import { BiCartAdd, BiMinus, BiPlus } from "react-icons/bi";

import { AppContext } from "../../context";

const Btns = (props) => {
  const { cartItem, setCartItem } = useContext(AppContext);
  const addCart = (id) => {
    setCartItem((lastItem) => ({ ...lastItem, [id]: (lastItem[id] ?? 0) + 1 }));
  };
  const updateCart = (id, quantity) => {
    setCartItem((lastItem) => ({ ...lastItem, [id]: quantity }));
  };
  if (!cartItem[props.id]) {
    // here cartItem consists of id's of products, it checks if th cartItem has that product in it alredy if not it shows add button, if it is there then its default value is set as 1 and then if it becomes zero it means it's not being recognized as a cartItem
    return (
      <div className="container d-flex justify-content-center align-items-center">
        <button
          type="button"
          className="btn btn-add"
          onClick={() => addCart(props.id)}
        >
          <BiCartAdd /> Add
        </button>
      </div>
    );
  } else {
    return (
      <div className="container d-flex justify-content-around align-items-center">
        <button
          type="button"
          className="btn btn-danger border-0"
          onClick={() => updateCart(props.id, cartItem[props.id] - 1)}
          //here we are getting the value of is using it as a key to access it from {} in cartItem
        >
          <BiMinus />
        </button>
        <div className="fw-bolder fs-5">{cartItem[props.id]}</div>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => updateCart(props.id, cartItem[props.id] + 1)}
        >
          <BiPlus />
        </button>
      </div>
    );
  }
};

export default Btns;
