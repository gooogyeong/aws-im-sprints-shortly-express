import React, { Component } from 'react';
import './LinkList.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listActions from '../modules/list';

import LinkItem from './LinkItem';

class LinkList extends Component {
  componentDidMount() {
    const { ListActions } = this.props;

    ListActions.getList();
  }

  render() {
    const { data } = this.props;

    return (
      <div>
        {data ? (
          data.map((data_val, i) => <LinkItem key={i} {...data_val} />)
        ) : (
          <h1>No Content</h1>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    data: state.list.data
  }),
  dispatch => ({
    ListActions: bindActionCreators(listActions, dispatch)
  })
)(LinkList);
