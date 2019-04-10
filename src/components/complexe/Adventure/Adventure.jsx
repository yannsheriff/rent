/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { updateStatus, updateBudget, updateOrigin } from '../../../redux/actions/profil';
import './Adventure.scss';

class Adventure extends Component {
  static propTypes = {
    fail: PropTypes.func,
    next: PropTypes.func,
    data: PropTypes.object,
  };

  static defaultProps = {
    fail: () => {},
    next: () => {},
    data: {},
  };

  render() {
    const {
      fail, next, data,
    } = this.props;
    console.log(data);
    return (
      <div id="adventure">
        <p>Adventure</p>
        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.adventure_narration) }} />
        <button type="button" onClick={next}>{ data.adventure_first_choice }</button>
        <button type="button" onClick={fail}>{ data.adventure_second_choice }</button>
      </div>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => ({
  status: state.status,
});

const componentContainer = connect(
  mapStateToProps,
)(Adventure);

export default componentContainer;
