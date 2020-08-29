import React, { Component } from "react";

const request = window.indexedDB.open("funfood");

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };

    this.mapItem = this.mapItem.bind(this);
    this.getItemFromDB = this.getItemFromDB.bind(this);
    this.getItemFromDB();
  }

  async getItemFromDB(lists) {
    const carts = sessionStorage.getItem("carts");
    if (carts !== null) {
      let items = JSON.parse(carts) || [];
      const ids = items.map((item) => item.id);
      const data = await getData(ids);
      this.setState({ items: data });
    }
  }

  mapItem(item) {
    const { id, name, price, qty } = item;
    return (
      <li
        className="list-group-item d-flex justify-content-between lh-condensed"
        key={"juice-" + id}
        id={name}
      >
        <div>
          <h6 className="my-0">{name}</h6>
          <small className="text-muted">Brief description</small>
        </div>
        <span className="text-muted">{price}</span>
        <span>{qty}</span>
      </li>
    );
  }

  render() {
    const { items } = this.state;
    if (items.length < 1) {
      return (
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          Nothing is here, get your order now!
        </li>
      );
    }
    const carts = items.map(this.mapItem);
    return <React.Fragment>{carts}</React.Fragment>;
  }
}

export default Cart;
