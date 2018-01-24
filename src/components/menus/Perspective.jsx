import React, { Component } from 'react';
import { connect } from 'react-redux';
import Common, {
  Item,
  Content,
  Icon,
  Title,
  Trigger,
  Category,
  SubTitle,
  Sub,
  MenuAction,
  Button, 
  ButtonGroup,
  Label, 
  GroupButton,
} from './Common';

class Perspective extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDefaultState: true,
      triggers: props.triggers,
      rubix: props.rubix
    }

    Object.assign(this, new Common(this));
  }

  render() {
    return (
      <Item>
        <Trigger 
          default={this.state.isDefaultState}
          active={this.props.triggers.menuIsOpen}
          onClick={this.handleTrigger}
        >
          <Icon className="glyphicon glyphicon-th" />
          <Category>Perspective</Category>
        </Trigger>
        <Content
          default={this.state.isDefaultState}
          active={this.props.triggers.menuIsOpen} 
          style={{ transform: this.state.inlineContentTransform }}
        >
          <Title>Perspective</Title>
          <SubTitle>
            Transform
          </SubTitle>
          <Sub>
            <MenuAction><Button onClick={this.flatten}>Flatten</Button></MenuAction>
            <MenuAction><Button onClick={this.restore}>Build</Button></MenuAction>
            <MenuAction>
              <Label>Zoom</Label>
              <ButtonGroup role="group" aria-label="zoom">
                <GroupButton onClick={this.scaleOut} type="button">-</GroupButton>
                <GroupButton onClick={this.scaleIn} type="button">+</GroupButton>
              </ButtonGroup>
            </MenuAction>
          </Sub>
        </Content>
      </Item>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    triggers: store.menu,
    rubix: store.rubix
  };
}

export default connect(mapStateToProps)(Perspective);