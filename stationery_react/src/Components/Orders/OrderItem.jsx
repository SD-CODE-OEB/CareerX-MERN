const OrderItem = (props) => {
  const { order, index } = props;
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
              &#8377;{order.orderTotal}
            </span>
            &nbsp;is registered successfully.
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-4 d-flex justify-content-md-center ps-md-3 pe-3">
          <div
            className="d-flex flex-column flex-wrap ps-md-4 ps-lg-4 ps-sm-0"
            key={index}
          >
            <span
              className={`fs-3 fw-bold status-state ${
                order.status === "Pending" ? "order-pending" : "order-delivered"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default OrderItem;
