import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DropdownButton, MenuItem, FormControl } from 'react-bootstrap';

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

const MENU_ID = 'Theme';
const THEME_COLOR = [0,0,255,1];

class Theme extends Component {
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
    this.searchType = '@';
    this.themeColor = props.triggers.menus[this.id].baseColor ? props.triggers.menus[this.id].baseColor : THEME_COLOR;
    this.triggerColor = props.triggers.menus[this.id].triggerColor ? props.triggers.menus[this.id].triggerColor: 'white';
    this.setTheme(this.props);
  }

  componentWillReceiveProps(nextProps) {
    //this.setTheme(nextProps);
    this.themeColor = nextProps.triggers.menus[this.id].backgroundColor ? nextProps.triggers.menus[this.id].backgroundColor : THEME_COLOR;
    this.triggerColor = nextProps.triggers.menus[this.id].triggerColor ? nextProps.triggers.menus[this.id].triggerColor: 'white';
  }

  changeSearchType(props) {
    console.log(props);
  }

  updateSearch(props) {
    console.log(props);
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
          <i className="fa fa-window-close" aria-hidden="true"></i>
          <Title>{MENU_ID}</Title>
          <SubTitle>
            Instagram
          </SubTitle>
          <Sub>
            <MenuAction>
              <DropdownButton 
                id="searchType"
                title='Search Type'
              >
                <MenuItem>User Name</MenuItem>
                <MenuItem onSelect={this.changeSearchType}>Hashtag</MenuItem>
              </DropdownButton>
            </MenuAction>
            <MenuAction>
              <FormControl
                id="searchText"
                type="text"
                value={this.searchType}
                onChange={this.updateSearch}
              >
              </FormControl>
            </MenuAction>
            <MenuAction>
              <Label>Side</Label>
              <DropdownButton title="Top" pullRight id="side">
                <MenuItem>Top</MenuItem>
                <MenuItem>Bottom</MenuItem>
                <MenuItem>Front</MenuItem>
                <MenuItem>Back</MenuItem>
                <MenuItem>Left</MenuItem>
                <MenuItem>Right</MenuItem>
              </DropdownButton>
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

export default connect(mapStateToProps)(Theme);