import React, { Component } from 'react';
import { connect } from 'react-redux';

//
// Import Styled Components and React Bootstrap Components
//
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

//
// Import Actions
//

//
// CONSTANTS
//
const MENU_ID = 'Theme';
const THEME_COLOR = [0,0,255,1];

class Theme extends Component {
  /**
   * Constructor
   * 
   * 1. Merge new Common object with this
   * 2. Set the menu color theme
   * 3. Set state to Redux store
   * 4. Local properties and bindings
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.id = MENU_ID.toLowerCase();
    Object.assign(this, new Common(this));
    this.setTheme(this.props, true);

    let baseColor = props.triggers.menus[this.id].backgroundColor;
    let triggerColor = props.triggers.menus[this.id].triggerColor;
    this.state = {
      isDefaultState: props.triggers.menus[this.id].isDefaultState,
      app: props.app,
      triggers: props.triggers,
      rubix: props.rubix,
      searchType: '@',
      themeFace: 'top',
      themeColor: baseColor,
      triggerColor: triggerColor,
    }

    this.themeColor = this.state.themeColor; // string
    this.triggerColor = this.state.triggerColor; // string

    // Binders
    this.changeSearchType = this.changeSearchType.bind(this);
    this.changeLoadFace = this.changeLoadFace.bind(this);

  }

  //
  // Form handlers
  //
  changeSearchType(value) {
    this.setState({searchType: value});
  }

  updateSearch(props) {
    console.log(this);
  }

  changeLoadFace(value) {
    this.setState({themeFace: value.toLowerCase()});
  }

  //
  // Lifecycle handlers
  //
  componentDidUpdate() {
    this.setTheme(this.props);
  }


  //
  // Render to the Menu container
  //
  render() {
    return (
      <Item id={this.id} style={{backgroundColor: this.themeColor}}>
        <Trigger 
          default={this.state.isDefaultState}
          active={this.state.triggers.menus[this.id].menuIsOpen}
          onClick={this.handleTrigger}
          style={{backgroundColor: this.themeColor, color: this.triggerColor}}
        >
          <Icon className="glyphicon glyphicon-th" />
          <Category>{MENU_ID}</Category>
        </Trigger>
        <Content
          default={this.state.isDefaultState}
          active={this.state.triggers.menus[this.id].menuIsOpen} 
          backgroundColor={this.props.triggers.menus[this.id].baseColor}
          style={{ 
            transform: this.state.triggers.menus[this.id].inlineContentTransform,
          }}
        >
          <Title>{MENU_ID}</Title>
          <SubTitle>
            Instagram
          </SubTitle>
          <Sub>
            <MenuAction>
              <DropdownButton 
                bsSize="large"
                id="searchType"
                title={this.state.searchType}
                onSelect={this.changeSearchType}
              >
                <MenuItem eventKey="@">@ (user)</MenuItem>
                <MenuItem eventKey="#"># (hashtag)</MenuItem>
              </DropdownButton>
            </MenuAction>
            <MenuAction>
              <FormControl
                bsSize="large"
                id="searchText"
                type="text"
              >
              </FormControl>
            </MenuAction>
            <MenuAction>
              <Label>Side</Label>
              <DropdownButton 
                bsSize="large"
                title={this.state.themeFace}
                pullRight
                id="side"
                onSelect={this.changeLoadFace}
                style={{width: '5em'}}
              >
                <MenuItem eventKey="top">top</MenuItem>
                <MenuItem eventKey="bottom">bottom</MenuItem>
                <MenuItem eventKey="front">front</MenuItem>
                <MenuItem eventKey="back">back</MenuItem>
                <MenuItem eventKey="left">left</MenuItem>
                <MenuItem eventKey="right">right</MenuItem>
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