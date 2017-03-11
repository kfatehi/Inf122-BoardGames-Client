import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';
import { Link } from 'react-router';

import { Page } from './Page.jsx';

export const Pug = React.createClass({
  render() {
    const { 
      params: { id }
    } = this.props;
    return <Page>
      pug {id}
    </Page>;
  },
});


function mapStateToProps(state) {
  return {
  };
}

export const PugPage = connect(mapStateToProps, actionCreators)(Pug); 
