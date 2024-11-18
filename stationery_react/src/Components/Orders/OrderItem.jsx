import React, { useContext } from "react";
import { AppContext } from "../../context";

const OrderItem = (props) => {
  const { products } = useContext(AppContext);
  const { order, index } = props;
  console.log(order);
  const calculateTotalPrice = (order) => {
    let totalPrice = 0;
    Object.keys(order.things).forEach((key) => {
      const product = products.find((p) => p._id === key);
      if (product) {
        totalPrice += product.price * order.things[key];
      }
    });
    return totalPrice;
  };
  return (
    <div>
      <div className="row px-4 fs-4 order">
        <div className="col-lg-9 col-md-6 col-8">
          <div
            className="d-flex flex-wrap order-info fw-normal bg-dark-subtle  fst-italic"
            key={index}
          >
            <span className="order-num pe-2">Order {index + 1}:</span> Your
            order for&nbsp;
            <span className=" fw-bold fs-4 total-price">
              &#8377;{calculateTotalPrice(order)}
            </span>
            &nbsp;is registered successfully.
            {/* {Object.keys(order.things).map((key) => (
              <span className="px-1" key={products[key - 1].name}>
                {products[key - 1].name}s
              </span>
            ))} */}
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-4 d-flex justify-content-md-center ps-md-3 pe-3">
          <div
            className="d-flex flex-column flex-wrap ps-md-4 ps-lg-4 ps-sm-0"
            key={index}
          >
            {calculateTotalPrice(order) < 1500 ? (
              <span className="fs-3 fw-bold status-state order-delivered">
                Delivered
              </span>
            ) : (
              <span className="fs-3 fw-bold status-state order-pending">
                Pending
              </span>
            )}
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default OrderItem;
