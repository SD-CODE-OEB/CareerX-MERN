import React, { useContext } from "react";
import { AppContext } from "../../context";
import Container from "../Container";
import OrderItem from "./OrderItem";
import "./orders.css";

const Orders = () => {
  const { orders, users, user } = useContext(AppContext);
  const found = users.find((p) => p.email === user.email);
  if (found) {
    return (
      <Container className="bg-dark-subtle">
        <div className="row order-heading">
          <div className="col-lg-9 col-md-6 col-6">
            <h1 className="px-3 fw-bolder">Orders</h1>
          </div>
          <div className="col-lg-3 col-md-6 col-6 d-flex justify-content-center ">
            <h1 className="fw-bolder">Status</h1>
          </div>
        </div>
        <hr />
        {/* orders is an array to render in vDOM */}
        {orders
          .filter(
            (orders) =>
              orders.email === user.email && orders.email === found.email
          )
          .map((orders, index) => {
            return <OrderItem order={orders} index={index} />;
          })}
      </Container>
    );
  } else {
    return (
      <Container className="order-container">
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center m-0 p-0 overflow-hidden">
          <h1 className="px-lg-4 heading fw-bolder">Orders</h1>
          <img
            src="https://cdn.pixabay.com/photo/2015/10/22/16/42/icon-1001596_1280.png"
            alt="empty cart"
            className="img img-fluid"
            height={300}
          />
          <p className="fs-1 w-100 text-center ps-5 fw-bolder empty">
            No Orders Yet!
          </p>
        </div>
      </Container>
    );
  }
};

export default Orders;
