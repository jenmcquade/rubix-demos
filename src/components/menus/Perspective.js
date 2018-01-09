import React, { Component } from 'react';

class Perspective extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true, 
      toggleClass: '',
      contentAnimation: '',
      inlineContentTransform: 'rotateX(-90deg) rotateZ(0deg)'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
    this.setState({'contentAnimation': ''});
    this.setState({'toggleClass': 'menu-reset'});
    
    // Mobile or small width detection /
    if( window.matchMedia("(max-width: 720px)").matches ) {
      if(this.state.isToggleOn) {
        this.setState({'inlineContentTransform': 'rotateX(0deg)'});
      }	else {
        this.setState({'inlineContentTransform': 'rotateX(-90deg)'});
      }
      return true;
    }

    // Standard menu animations
    if(this.state.isToggleOn) {
      this.setState({'toggleClass': 'menu-flip-down'});
      const container = this;
      setTimeout( 
        () => {
          this.setState({'contentAnimation': 'menu-open-content'})
        }, 800
      );
    } else {
      this.setState({'contentAnimation': 'menu-close-content'});
      setTimeout( 
        () => {
          this.setState({'toggleClass': 'menu-reset'});
        }, 800
      );


    }
  }

  render() {
    return (
      <div className={'nav-item ' + this.state.toggleClass} id="perspective">
        <a onClick={this.handleClick}>
          <i className="glyphicon glyphicon-th"></i>
          <span>Perspective</span>
        </a>
        <div style={{transform: this.state.inlineContentTransform}} id="content" className={'content ' + this.state.contentAnimation}>
        
        </div>
      </div>
  )}
}

export default Perspective;