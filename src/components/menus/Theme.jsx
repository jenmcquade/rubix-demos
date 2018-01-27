import React, { Component } from 'react';
import { connect } from 'react-redux';

//
// Import Styled Components and React Bootstrap Components
//
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
  Status,
  ScrollBar,
  TextBox,
  DropdownButton,
  DropdownItem
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
      services: {
        ig: {
          status: 'offline',
        }
      },
      isDefaultState: true,
      app: props.app,
      triggers: props.triggers,
      rubix: props.rubix,
      searchType: 'rgba',
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
    let igStatus = this.state.services.ig.status;

    return (
      <Item id={this.id} style={{backgroundColor: this.themeColor}}>
        <Trigger 
          default={this.state.isDefaultState}
          active={this.state.triggers.menus[this.id].menuIsOpen}
          onClick={this.handleTrigger}
          style={{backgroundColor: this.themeColor, color: this.triggerColor}}
        >
          <Icon className="fa fa-hashtag" />
          <Category>{MENU_ID}</Category>
        </Trigger>
        <Content
          default={this.state.isDefaultState}
          active={this.state.triggers.menus[this.id].menuIsOpen} 
          backgroundColor={
            this.props.triggers.menus[this.id].baseColor ? 
            this.props.triggers.menus[this.id].baseColor :
            THEME_COLOR
          }
          style={{ 
            transform: this.state.triggers.menus[this.id].inlineContentTransform,
          }}
        >
          <Title>{MENU_ID}</Title>
          <ScrollBar
            autoHide 
            autoHideTimeout={1000} 
            autoHideDuration={200} 
            autoHeight 
            autoHeightMin={400} 
            autoHeightMax={550}
          >
            <SubTitle type="heading">
              Cube Colors and Background Images
            </SubTitle>
            <SubTitle>
              Instagram API Status: <Status>{this.state.services.ig.status}</Status>
            </SubTitle>
            {
              // Create theme forms based on rubix faces
              Object.keys(this.props.rubix.style).map((face) => {
                return <div key={face}>
                  <Sub style={{alignItems: 'center', 'marginTop': '.2em'}}>
                    <SubTitle>
                      {face.toUpperCase()}
                    </SubTitle>
                    <MenuAction>
                      <DropdownButton 
                        bsSize="large"
                        id="searchType"
                        title={this.state.searchType}
                        onSelect={this.changeSearchType}
                      >
                        <DropdownItem display={igStatus} eventKey="@">@ (user)</DropdownItem>
                        <DropdownItem display={igStatus} eventKey="#"># (hashtag)</DropdownItem>
                        <DropdownItem eventKey="rgba">rgba (0-255,0-255,0-255,0-1)</DropdownItem>
                      </DropdownButton>
                    </MenuAction>
                    <MenuAction>
                      <TextBox
                        bsSize="large"
                        id="searchText"
                        type="text"
                      >
                      </TextBox>
                    </MenuAction>
                  </Sub>
                </div>
              })
            }
          </ScrollBar>
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