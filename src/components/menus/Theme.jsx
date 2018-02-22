import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import { getCubeFaces } from '../3d/rubix/Cube'

//
// Import Styled Components and React Bootstrap Components
//
import Common, {
  Sub,
  SubTitle,
  MenuAction,
  ScrollBar,
  TextBox,
  DropdownButton,
  DropdownItem,
  Form,
  FormGroup,
  Label,
} from './Common';

import {
  toggleMenuSetup,
} from './MenuActions'

import {
  changeBgColor,
  changeAllBgColor,
  changeAllTxtColor,
  changeTxtColor,
  convertRGBAToString
} from './helpers/theme_colors'

import {
  changeSearchType,
  changeImageOpacity,
  changeAllImageOpacity,
  searchByUser,
  searchByHashTag,
  searchByUserPaging, 
  searchByHashTagPaging
} from './helpers/theme_search'

//
// IG Service functions
//
function setIgSearchType(type) {
  /*
  const { dispatch } = this.props;
  dispatch({type: 'CHANGE_SEARCH_TYPE', value: {searchType: type}});
  */
}

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
    // Attach common methods
    Object.assign(this, new Common(this));
    this.faces = getCubeFaces();
    this.faces.unshift('all'); // add an additional 'all' face to the top of the array
    this.formsState = getInitialFormsState(this.faces);

    this.state = {
      ...props,
      isDefaultState: true,
      searchType: 'color',
      themeFace: 'top',
      forms: this.formsState,
      igProxyIsOnline: false,
      faceId: 'all',
    }

    this.searchIsUnlocked = true;

    // Binders
    this.getInitialFormsState = getInitialFormsState.bind(this);
    this.changeSearchType = changeSearchType.bind(this);
    this.changeLoadFace = changeLoadFace.bind(this);
    this.changeBgColor = changeBgColor.bind(this);
    this.changeAllBgColor = changeAllBgColor.bind(this);
    this.changeAllTxtColor = changeAllTxtColor.bind(this);
    this.changeTxtColor = changeTxtColor.bind(this);
    this.convertRGBAToString = convertRGBAToString.bind(this);
    this.searchByUser = searchByUser.bind(this);
    this.searchByHashTag = searchByHashTag.bind(this);
    this.searchByUserPaging = searchByUserPaging.bind(this);
    this.searchByHashTagPaging = searchByHashTagPaging.bind(this);
    this.setIgSearchType = setIgSearchType.bind(this);
    this.changeAllImageOpacity = changeAllImageOpacity.bind(this);
    this.changeImageOpacity = changeImageOpacity.bind(this);
    this.updateFormsDisplay = updateFormsDisplay.bind(this);
  }

  /**
   * componentWillReceiveProps
   * Menu style setup is included here, to wait for IG Proxy status
   */
  componentWillReceiveProps(nextProps) {
    if(nextProps.ig.status) {
      this.setState({igProxyIsOnline: true });
      // If this our first time, continue. 
      //  otherwise, we're done
      if(!nextProps.menu.isInSetup) {
        return true;
      }
      this.props.dispatch(toggleMenuSetup());
      this.updateFormsDisplay();  
    } else {
      this.formsState = {};
      for(let face in this.faces) {
        face = face.toLowerCase();
      }
    }
  }

  componentDidUpdate() {
    this.setTheme(this.props);
  }

  //
  // Render to the Menu container
  //
  render() {
    let proxyIsOnline = this.state.igProxyIsOnline;
    return (
      <ScrollBar
        autoHide 
        autoHideTimeout={1000} 
        autoHideDuration={200} 
        autoHeight 
        autoHeightMin={460} 
        autoHeightMax={500}
        className="scroll-bar"
      >
        <SubTitle type="heading">
          Cube Colors and Background Images
        </SubTitle>

        <Sub style={{alignItems: 'center', 'marginTop': '.2em'}}>
        {
          // Create theme forms based on rubix faces
          Object.keys(this.state.forms).map((face, i) => {
            this.face = face;
            let themeColor = 'default';
            let txtColor = 'default';
            let isAll = face === 'all' ? true : false;
    
            // Use dropup styling if this is the last form set
            let dropupEnabled = false;
            let size = Object.keys(this.state.forms).length;
            if ( i > size - 4 ) {
              dropupEnabled = true;
            }

            try {
              themeColor = this.state.rubix.theme[face].bgColor 
                ? this.state.rubix.theme[face].bgColor
                : 'black';
              txtColor = this.state.rubix.theme[face].txtColor
                ? this.state.rubix.theme[face].txtColor 
                : 'white';
            } catch (e) {
              themeColor = 'black';
              txtColor = 'white';
            }

            return <MenuAction key={face}>
              <Form inline>
                <FormGroup>
                  <Label>
                    {face.toUpperCase()}
                  </Label>
                  <DropdownButton 
                    bsSize="large"
                    id={'searchType-' + face}
                    title={this.state.forms[face].searchType}
                    onSelect={this.changeSearchType}
                    dropup={dropupEnabled}
                    style={{
                      backgroundColor: themeColor, 
                      color: txtColor,
                      minWidth: '6em',
                    }}
                  >
                    <DropdownItem display={proxyIsOnline.toString()} eventKey={face + '-user'}>@ (user)</DropdownItem>
                    <DropdownItem display={proxyIsOnline.toString()} eventKey={face + '-hashTag'}># (hashtag)</DropdownItem>
                    <DropdownItem display="true" eventKey={face + '-bgColor'}>Background</DropdownItem>
                    <DropdownItem display="true" eventKey={face + '-imageOpacity'}>Image Opacity</DropdownItem>
                    <DropdownItem display="true" eventKey={face + '-txtColor'}>Text Color</DropdownItem>
                  </DropdownButton>
                  <TextBox
                    bsSize="large"
                    id={'searchTextUser-' + face}
                    type="text"
                    style={this.state.forms[face].text.user.style}
                    onChange={isAll ? this.searchByUserPaging : this.searchByUser}
                  />
                  <TextBox
                    bsSize="large"
                    id={'searchTextHashtag-' + face}
                    type="text"
                    style={this.state.forms[face].text.hashTag.style}
                    onChange={isAll ? this.searchByHashTagPaging : this.searchByHashTag}
                  />
                  <TextBox
                    bsSize="large"
                    id={'searchTextBgColor-' + face}
                    type="text"
                    style={this.state.forms[face].text.bgColor.style}
                    placeholder={this.convertRGBAToString(themeColor) ? this.convertRGBAToString(themeColor) : 'Array or color string'}
                    onChange={isAll ? this.changeAllBgColor : this.changeBgColor}
                  />
                  <TextBox
                    bsSize="large"
                    id={'searchTextColor-' + face}
                    type="text"
                    style={this.state.forms[face].text.txtColor.style}
                    placeholder={txtColor}
                    onChange={isAll ? this.changeAllTxtColor : this.changeTxtColor}
                  />
                  <Slider
                    min={0}
                    max={1}
                    step={.1}
                    defaultValue={this.state.forms[face].slider.imageOpacity.value}
                    id={'imageOpacity-' + face} 
                    onBeforeChange={() => this.setState({faceId: face})}
                    onChange={isAll ? this.changeAllImageOpacity : this.changeImageOpacity }
                    style={this.state.forms[face].slider.imageOpacity.style}
                    trackStyle={[{ backgroundColor: 'black' }]}
                    handleStyle={[{ backgroundColor: txtColor }]}
                    railStyle={{ backgroundColor: themeColor }}
                  />
                </FormGroup>
              </Form>
            </MenuAction>
          })
        }
        </Sub>
      </ScrollBar>
    );
  }
}

//
// Templating
//
function getInitialFormsState(faces) {
  let formsState = {};
  for(var face in faces) {
    face = face.toLowerCase();
    formsState[faces[face]] = {
      searchType: 'color',
      text:{
        user:{value: '', style:{marginRight: '1em', width: '9em', display:'none'}},
        hashTag:{value: '', style:{marginRight: '1em', width: '9em', display:'none'}},
        bgColor:{value: '', style:{marginRight: '1em', width: '9em', display:'inline'}},
        txtColor:{value: '', style:{marginRight: '1em', width: '9em', display:'none'}}
      },
      slider:{
        imageOpacity: {value: .5, style:{width: '8.2em', 'margin': '0.8em 1em 0 0', display:'none'}}
      }
    }
  }
  return formsState;
}

function updateFormsDisplay() {
  let formsState = {};
  for(var face in this.faces) {
    face = face.toLowerCase();
    let searchType = this.faces[face] === 'all' ? 'color' : 'user';
    let userStyle = this.faces[face] === 'all' ? {display:'none'} : {display:'inline'};
    let bgColorStyle = this.faces[face] === 'all' ? {display:'inline'} : {display:'none'};
    let thisFace = this.state.forms[this.faces[face]];
    formsState[this.faces[face]] = {
      searchType: searchType,
      text:{
        user: {value: '', style: Object.assign(...thisFace.text.user.style, userStyle)},
        hashTag: {value: '', style: Object.assign(...thisFace.text.bgColor.style, {display:'none'})},
        bgColor: {value: '', style: Object.assign(...thisFace.text.bgColor.style, bgColorStyle)},
        txtColor: {value: '', style: Object.assign(...thisFace.text.txtColor.style, {display:'none'})},
      },
      slider:{
        imageOpacity: {value: thisFace.slider.imageOpacity.value, style: {width: '10em', 'margin': '.8em 0.5em', display:'none'}},
      }
    }
  }      
  this.setState({forms: formsState});
}

export function changeLoadFace(value) {
  this.setState({themeFace: value.toLowerCase()});
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    router: store.routerReducer,
    app: store.app,
    ig: store.instaProxy,
    menu: store.menu,
    rubix: store.rubix,
  };
}

export default connect(mapStateToProps)(Theme);