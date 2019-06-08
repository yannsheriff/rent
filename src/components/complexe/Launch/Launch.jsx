/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import lmstpBanner from 'assets/img/intro.gif';
import { Button } from 'components/basic';
import animations from 'assets/animation';
import lottie from 'lottie-web';
import './Launch.scss';

class Launch extends Component {
  constructor(props) {
    super(props);
    this.animationContainer = React.createRef();
  }

  componentDidMount() {
    this.anim = lottie.loadAnimation({
      container: this.animationContainer.current, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animations.tuto, // the path to the animation json
    });
  }

  render() {
    const { next } = this.props;

    return (
      <div id="launch">
        <div className="header">
          <div className="menu" />
        </div>
        <div className="content">
          <div>
            <div className="animation" ref={this.animationContainer} />
            <h1>Dernier check up.</h1>
            <p>
             Une fois la partie lancée, vous n'aurez que 5 minutes pour dégoter un appartement !
             Serez-vous à la hauteur ?
            </p>
          </div>

          <Button onClick={() => next()} text="C'est parti !" />
        </div>
      </div>
    );
  }
}

export default Launch;
