import React, { Component } from 'react';
import './LinkItem.css';

class LinkItem extends Component {
  render() {
    const { title, url, baseUrl, code, visits } = this.props;

    return (
      <div className="link-item">
        <div className="">{title}</div>
        <div>{url}</div>
        <a
          href={`http://${baseUrl}/${code}`}
          target="_blank"
        >{`http://${baseUrl}/${code}`}</a>
        <div>{`${visits} Visits`}</div>
      </div>
    );
  }
}

export default LinkItem;
