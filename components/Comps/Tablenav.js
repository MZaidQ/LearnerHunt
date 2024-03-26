import React, { Component } from "react";

export default class Tablenav extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className="custom-table-nav">
        <div className="left-div">  {this.props.TotalCount?this.props.TotalCount.Total:''}</div>
        <div className="right-div" style={{width:"300px"}}>
          {this.props.Actions?this.props.Actions.Actions:""}
        </div>
      </div>
    );
  }
}
