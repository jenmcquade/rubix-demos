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

const MENU_ID = 'Perspective';
const THEME_COLOR = [255,0,0,1];

class Perspective extends Component {
  constructor(props) {
    super(props);
    Object.assign(this, new Common(this));
    this.state = {
      isDefaultState: true,
      app: props.app,
      triggers: props.triggers,
      rubix: props.rubix
    }

    this.id = MENU_ID.toLowerCase();
    this.themeColor = props.triggers.menus[this.id].baseColor ? props.triggers.menus[this.id].baseColor : THEME_COLOR;
    this.triggerColor = props.triggers.menus[this.id].triggerColor ? props.triggers.menus[this.id].triggerColor: 'white';
    this.setTheme(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.themeColor = nextProps.triggers.menus[this.id].backgroundColor ? nextProps.triggers.menus[this.id].backgroundColor : THEME_COLOR;
    this.triggerColor = nextProps.triggers.menus[this.id].triggerColor ? nextProps.triggers.menus[this.id].triggerColor: 'white';
    //this.setTheme(nextProps);
  }

  render() {
    return (
      <Item id={this.id} style={{backgroundColor: this.themeColor}}>
        <Trigger 
          default={this.state.isDefaultState}
          active={this.props.triggers.menus[this.id].menuIsOpen}
          onClick={this.handleTrigger}
          style={{backgroundColor: this.themeColor, color: this.triggerColor}}
        >
          <Icon className="glyphicon glyphicon-th" />
          <Category>{MENU_ID}</Category>
        </Trigger>
        <Content
          default={this.state.isDefaultState}
          active={this.props.triggers.menus[this.id].menuIsOpen} 
          backgroundColor={THEME_COLOR}
          style={{ 
            transform: this.props.triggers.menus[this.id].inlineContentTransform,
          }}
        >
          <Title>{MENU_ID}</Title>
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
    app: store.app,
    triggers: store.menu,
    rubix: store.rubix
  };
}

export default connect(mapStateToProps)(Perspective);