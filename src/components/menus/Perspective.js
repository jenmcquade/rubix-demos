import React, { Component } from 'react';

class Perspective extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true, 
      toggleClass: '',
      contentAnimation: '',
      menuAnchorClass: '',
      inlineContentTransform: 'rotateX(-90deg) rotateZ(0deg)'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));

    this.setState({'menuAnchorClass': ''});
    this.setState({'contentAnimation': ''});
    
    // Mobile or small width detection /
    if( window.matchMedia('(max-width: 720px)').matches ) {
      if(this.state.isToggleOn) {
        this.setState({'inlineContentTransform': 'rotateX(0deg)'});
      }	else {
        this.setState({'inlineContentTransform': 'rotateX(-90deg)'});
      }
      return true;
    }

    // Standard menu animations
    if(this.state.isToggleOn) {
      this.setState({'menuAnchorClass': 'menu-flip-down'});
      this.setState({'contentAnimation': 'menu-open-content'})
    } else {
      this.setState({'menuAnchorClass': 'menu-flip-up'});
      this.setState({'contentAnimation': 'menu-close-content'});
    }
  }

  render() {
    return (
      <div className={'nav-item ' + this.state.toggleClass} id="perspective">
        <a className={this.state.menuAnchorClass} onClick={this.handleClick}>
          <i className="glyphicon glyphicon-th"></i>
          <span>Perspective</span>
        </a>
        <div style={{transform: this.state.inlineContentTransform}} id="content" className={'content ' + this.state.contentAnimation}>
          <h2 className="title">Perspective</h2>
          <ul>
            <li>Nav item 1</li>
            <li>Nav item 4</li>
          </ul>
        </div>
      </div>
  )}
}

export default Perspective;