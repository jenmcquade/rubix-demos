import React, { Component } from 'react';
import Styles from '../styles/Menu.styles';

const Style = new Styles();
const Item = Style.item;
const Content = Style.content;
const Icon = Style.icon;
const Title = Style.title;
const Trigger = Style.trigger;
const Category = Style.category;

class Perspective extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      toggleClass: '',
      contentAnimation: '',
      menuAnchorClass: '',
      inlineContentTransform: 'rotateX(-90deg) rotateZ(0deg)',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
    }));

    this.setState({ menuAnchorClass: '' });
    this.setState({ contentAnimation: '' });

    // Mobile or small width detection /
    if (window.matchMedia('(max-width: 720px)').matches) {
      if (this.state.isToggleOn) {
        this.setState({ inlineContentTransform: 'rotateX(0deg)' });
      } else {
        this.setState({ inlineContentTransform: 'rotateX(-90deg)' });
      }
      return true;
    }

    // Standard menu animations
    if (this.state.isToggleOn) {
      this.setState({ menuAnchorClass: 'menu-flip-down' });
      this.setState({ contentAnimation: 'menu-open-content' });
    } else {
      this.setState({ menuAnchorClass: 'menu-flip-up' });
      this.setState({ contentAnimation: 'menu-close-content' });
    }

    return true;
  }

  render() {
    return (
      <Item className={this.state.toggleClass}>
        <Trigger
          className={this.state.menuAnchorClass}
          onClick={this.handleClick}
        >
          <Icon className="glyphicon glyphicon-th" />
          <Category>Perspective</Category>
        </Trigger>
        <Content
          style={{ transform: this.state.inlineContentTransform }}
          className={this.state.contentAnimation}
        >
          <Title>Perspective</Title>
          <ul>
            <li>Nav item 1</li>
            <li>Nav item 2</li>
          </ul>
        </Content>
      </Item>
    );
  }
}

export default Perspective;
