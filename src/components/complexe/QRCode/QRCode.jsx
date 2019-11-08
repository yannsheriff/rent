/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';

import './QRCode.scss';

import qrcode from 'assets/img/qrcode.png';

class QRCode extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="qr-code">
        <div className="qr-code--wrapper">
          <div className="qr-code--container">
            <img src={qrcode} alt="qr code" />
            <div>
              <span>
                Scannez pour jouer sur mobile
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QRCode;
