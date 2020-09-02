import React, { Component } from "react";
import Swal from "sweetalert2";
import _ from "lodash";

const imgStyle = {
  width: "150px",
  height: "150px"
}

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
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(e) {
    console.log("triggered onchange", e);
    let { id, value } = e.target;
    value = parseInt(value);
    const { items } = this.state;
    const index = items.findIndex((item) => item.id === parseInt(id));

    if (value < 1) {
      Swal.fire({
        title: "Oh No!",
        text: "Minimum 1 cup per serving, or would you like to remove it?",
        icon: "error",
        showCancelButton: true,
        cancelButtonText: "Yes, remove it.",
        confirmButtonText: "Alright, it's fine."
      }).then((result) => {
        if (!result.isConfirmed) {
          items.splice(index, 1);
          this.setState({ items });
        }
      });
      return true;
    } 
    
    console.log(index, items[index]);
    items[index].qty = parseInt(value);
    this.setState({ items });
  }

  mapItem(item, index) {
    const { id, name, description, price, qty } = item;
    return (
      <tr key={"juice-" + id} id={name}>
        <td><img style={imgStyle} src="assets/images/cups/all-berry-bang-cup.png" alt="juice image"/></td>
        <td>{name}</td>
        <td>{description}</td>
        <td>{price.toFixed(2)}</td>
        <td><input type="number" name="qty" id={id} className="form-control" min="1" value={qty} onChange={() => this.handleChange(event)}/></td>
        <td><button className="btn btn-danger" onClick={() => this.handleRemove(index)}>Remove</button></td>
      </tr>
    );
  }

  renderHeader() {
    return (
      <thead>
        <th colSpan="2">Juices</th>
        <th>Description</th>
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
        <th colSpan="3">No. of items: {items.length}</th>
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

  componentDidUpdate() {
    let { items } = this.state;
    items = items.map((item) => _.omit(item, ["description", "price", "name"]));
    const JSONString = JSON.stringify(items);
    sessionStorage.setItem("carts", JSONString);
  }
}

export default Cart;
