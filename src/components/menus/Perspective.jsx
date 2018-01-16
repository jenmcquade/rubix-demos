import React, { Component } from 'react';
import Styles from '../styles/Menu.styles';

const Style = new Styles();
const Item = Style.item;
const Content = Style.content;
const Icon = Style.icon;
const Title = Style.title;
const Trigger = Style.trigger;
const Category = Style.category;

export default class Perspective extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
    }));

    return true;
  }

  render() {
    return (
      <Item className={this.state.toggleClass}>
        <Trigger 
          active={this.state.isToggleOn}
          onClick={this.handleClick}
        >
          <Icon className="glyphicon glyphicon-th" />
          <Category>Perspective</Category>
        </Trigger>
        <Content
          active={this.state.isToggleOn} 
          style={{ transform: this.state.inlineContentTransform }}
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

