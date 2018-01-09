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

    
    // Mobile or small width detection /
    if( window.matchMedia("(max-width: 720px)").matches ) {		
      if(this.state.isToggleOn) {
        this.setState({'inlineContentTransform': 'rotateX(0deg)'});
      }	else {
        this.setState({'inlineContentTransform': 'rotateX(-90deg)'});
      }
      return true;
    }

    if(this.state.isToggleOn) {
      this.setState({'toggleClass': 'menu-flip-down'});
      this.setState({'contentAnimation': 'menu-open-content'});
    } else {
      this.setState({'toggleClass': 'menu-reset'});
      this.setState({'contentAnimation': 'menu-close-content'});
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