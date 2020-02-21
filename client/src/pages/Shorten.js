import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as shortenActions from '../modules/shorten';
import { bindActionCreators } from 'redux';

import Input from '../components/Input';
import LinkItem from '../components/LinkItem';

class Shorten extends Component {
  state = {
    input: ''
  };

  handleChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  handleCreate = () => {
    const { input } = this.state;

    const { ShortenActions } = this.props;

    ShortenActions.shorten({ url: input });

    this.setState({ input: '' });
  };

  render() {
    const { data } = this.props;
    const { input } = this.state;
    const { handleChange, handleCreate } = this;

    return (
      <div>
        <Input value={input} onChange={handleChange} onCreate={handleCreate} />

        {data ? <LinkItem {...data} /> : null}
      </div>
    );
  }
}

export default connect(
  state => ({
    data: state.shorten.data
  }),
  dispatch => ({
    ShortenActions: bindActionCreators(shortenActions, dispatch)
  })
)(Shorten);
