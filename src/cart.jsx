import React, { Component } from "react";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };

    this.mapItem = this.mapItem.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.getItemFromDB = this.getItemFromDB.bind(this);
    this.getItemFromDB();
  }

  async getItemFromDB() {
    const carts = sessionStorage.getItem("carts");
    if (carts !== null) {
      let items = JSON.parse(carts) || [];
      const data = await getData(items);

      this.setState({ items: data });
    }
  }

  handleRemove(index) {
    const { items } = this.state;
    items.splice(index, 1);
    this.setState({items});
  }

  handleRemoveAll() {
    this.setState({ items: [] });
  }

  mapItem(item, index) {
    const { id, name, price, qty } = item;
    return (
      <tr key={"juice-" + id} id={name}>
        <td>{name}</td>
        <td>{price.toFixed(2)}</td>
        <td>{qty}</td>
        <td><button className="btn btn-danger" onClick={() => this.handleRemove(index)}>Remove</button></td>
      </tr>
    );
  }

  renderHeader() {
    return (
      <thead>
        <th>Juices</th>
        <th>Price</th>
        <th>Qty</th>
        <th>Action</th>
      </thead>
    )
  }

  renderFooter() {
    const { items } = this.state;
    return (
      <tfoot>
        <th>No. of items: {items.length}</th>
        <th>{items.map((item) => item.price * item.qty).reduce((acc, cur) => acc + cur, 0.0).toFixed(2)}</th>
        <th>{items.reduce((acc, cur) => acc + parseInt(cur.qty), 0)}</th>
        <th className="text-muted text-danger">
          <button className="btn btn-outline-danger" onClick={this.handleRemoveAll}>Remove All</button>
        </th>
      </tfoot>
    )
  }

  render() {
    const { items } = this.state;
    if (items.length < 1) {
      return (
        <td colSpan="100%">
          Nothing is here, get your order now!
        </td>
      );
    }
    const carts = items.map(this.mapItem);
    return (
      <React.Fragment>
        {this.renderHeader()}
        <tbody>
          {carts}
        </tbody>
        {this.renderFooter()}
      </React.Fragment>);
  }
}

export default Cart;
