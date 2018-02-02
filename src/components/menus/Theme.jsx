import React, { Component } from 'react';
import { connect } from 'react-redux';
import InstaProxy from '../../modules/InstaProxy/InstaProxy'

//
// Import Styled Components and React Bootstrap Components
//
import Common, {
  Sub,
  SubTitle,
  MenuAction,
  Status,
  ScrollBar,
  TextBox,
  DropdownButton,
  DropdownItem,
  Form,
  FormGroup,
  Label,
} from './Common';

//
// Import Actions
//
import {
  setThemeRGBA,
  setThemeTxtColor,
  resetThemeRGBA,
  resetThemeTxt,
} from '../3d/rubix/CubeActions'

import {
  toggleMenuSetup,
} from './MenuActions'

//
// IG Service functions
//
function setIgSearchType(type) {
  const { dispatch } = this.props;
  dispatch({type: 'CHANGE_SEARCH_TYPE', value: {searchType: type}});
}

function searchByUser(e) {
  const { dispatch } = this.props;
  let face = e.target.id.split('-')[1];
  dispatch({
    type: 'USER_FETCH_REQUESTED', 
    value: 
      {
        face: face,
        searchType: 'user', 
        searchValue: e.target.value, 
        returnCount: 9
      }
  });
}

function searchByHashTag(e) {
  const { dispatch } = this.props;
  let face = e.target.id.split('-')[1];
  dispatch({
    type: 'HASHTAG_FETCH_REQUESTED', 
    value: 
      {
        face: face,
        searchType: 'hashTag', 
        searchValue: e.target.value, 
        returnCount: 9
      }
  });}

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
    Object.assign(this, new Common(this));
    this.faces = Object.keys(this.props.rubix.style);
    this.formsState = getInitialFormsState(this.faces);

    this.state = {
      isDefaultState: true,
      app: props.app,
      ig: props.ig,
      menu: props.menu,
      rubix: props.rubix,
      searchType: 'color',
      themeFace: 'top',
      forms: this.formsState,
      igProxyIsOnline: false,
    }

    // Binders
    this.getInitialFormsState = getInitialFormsState.bind(this);
    this.changeSearchType = changeSearchType.bind(this);
    this.changeLoadFace = changeLoadFace.bind(this);
    this.changeBgColor = changeBgColor.bind(this);
    this.changeTxtColor = changeTxtColor.bind(this);
    this.convertRGBAToString = convertRGBAToString.bind(this);
    this.searchByUser = searchByUser.bind(this);
    this.searchByHashTag = searchByHashTag.bind(this);
    this.setIgSearchType = setIgSearchType.bind(this);
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
      let formsState = {};
      for(var face in this.faces) {
        face = face.toLowerCase();
        formsState[this.faces[face]] = {
            searchType: 'user',
            text:{
              user:{value: '', style:{display:'inline',}},
              hashTag:{value: '', style:{display:'none',}},
              bgColor:{value: '', style:{display:'none',}},
              txtColor:{value: '', style:{display:'none',}}
            }
        }
      }
      this.setState({forms: formsState});
    } else {
      this.formsState = {};
      for(face in this.faces) {
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
        autoHeightMin={400} 
        autoHeightMax={550}
      >
        <InstaProxy fetchOnLoad={true} />
        <SubTitle type="heading">
          Cube Colors and Background Images
        </SubTitle>
        <SubTitle>
          Instagram API Status: 
            <Status className={proxyIsOnline.toString()}>
              {proxyIsOnline ? 'Online' : 'Offline'}
            </Status>
        </SubTitle>
        <Sub style={{alignItems: 'center', 'marginTop': '.2em'}}>
        {
          // Create theme forms based on rubix faces
          Object.keys(this.state.forms).map((face, i) => {
            // Use dropup styling if this is the last form set
            let dropupEnabled = false;
            if (Object.keys(this.state.forms).length === i + 1) {
               dropupEnabled = true;
            }
            let themeColor = this.state.rubix.theme[face].bgColor;
            let txtColor = this.state.rubix.theme[face].txtColor;
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
                      backgroundColor: this.state.rubix.theme[face].bgColor, 
                      color: this.state.rubix.theme[face].txtColor
                    }}
                  >
                    <DropdownItem display={proxyIsOnline.toString()} eventKey={face + '-user'}>@ (user)</DropdownItem>
                    <DropdownItem display={proxyIsOnline.toString()} eventKey={face + '-hashTag'}># (hashtag)</DropdownItem>
                    <DropdownItem display="true" eventKey={face + '-bgColor'}>Background Color (0-255,0-255,0-255,0-1)</DropdownItem>
                    <DropdownItem display="true" eventKey={face + '-txtColor'}>Text Color</DropdownItem>
                  </DropdownButton>
                  <TextBox
                    bsSize="large"
                    id={'searchTextUser-' + face}
                    type="text"
                    style={this.state.forms[face].text.user.style}
                    onChange={this.searchByUser}
                  />
                  <TextBox
                    bsSize="large"
                    id={'searchTextHashtag-' + face}
                    type="text"
                    style={this.state.forms[face].text.hashTag.style}
                    onChange={this.searchByHashTag}
                  />
                  <TextBox
                    bsSize="large"
                    id={'searchTextBgColor-' + face}
                    type="text"
                    style={this.state.forms[face].text.bgColor.style}
                    placeholder={this.convertRGBAToString(themeColor) ? this.convertRGBAToString(themeColor) : 'Array or color string'}
                    onChange={this.changeBgColor}
                  />
                  <TextBox
                    bsSize="large"
                    id={'searchTextColor-' + face}
                    type="text"
                    style={this.state.forms[face.toLowerCase()].text.txtColor.style}
                    placeholder={this.state.rubix.theme[face].txtColor}
                    onChange={this.changeTxtColor}
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
        user:{value: '', style:{display:'none',}},
        hashTag:{value: '', style:{display:'none',}},
        bgColor:{value: '', style:{display:'inline',}},
        txtColor:{value: '', style:{display:'none',}}
      }
    }
  }
  return formsState;
}

//
// Form handlers
//
function changeSearchType(e) {
  let face = e.split('-')[0];
  let type = e.split('-')[1];
  let newState = JSON.parse(JSON.stringify(this.state.forms));
  let friendlyType = 'color';

  this.setIgSearchType(type);

  switch (type) {
    case 'bgColor':
      friendlyType = 'color';
      break;
    
    case 'txtColor':
      friendlyType = 'text';
      break;
    
    case 'user':
      friendlyType = '@';
      break;

    case 'hashTag':
      friendlyType = '#';
      break;

    default:
      friendlyType = 'color';
  }

  // Initially, change search type and set display to none for all
  newState[face].searchType = friendlyType;

  let textBoxes = Object.keys(this.state.forms[face].text);
  for(var box in textBoxes) {
    newState[face].text[textBoxes[box]].style.display = 'none';
  }
  newState[face].text[type].style.display = 'inline';

  this.setState({forms: newState});
}

function changeLoadFace(value) {
  this.setState({themeFace: value.toLowerCase()});
}

function changeBgColor(e){
  let faceId = e.target.id.split('-')[1];
  if(e.target.value === '') {
    this.props.dispatch(resetThemeRGBA(faceId));
    return true;
  }
  if(!this.convertStringToThemeRGBA(e.target.value)) {
    return false;
  }
  let value = {
    id: e.target.id.split('-')[1],
    bgColor: this.convertStringToThemeRGBA(e.target.value),
  }
  if(value.bgColor) {
    this.props.dispatch(setThemeRGBA(value));
  }
}

function changeTxtColor(e) {
  let faceId = e.target.id.split('-')[1];
  if(e.target.value === '') {
    this.props.dispatch(resetThemeTxt(faceId));
  }
  let value = {
    id: faceId,
    txtColor: e.target.value,
  }
  if(value.txtColor) {
    this.props.dispatch(setThemeTxtColor(value));
  }
}

export function convertStringToThemeRGBA(value) {
  value = value.replace(/ /g,' ');
  let themeRGBA = 'rgba(';
  let colorArray = value.split(',');
  if(colorArray.length === 1 && colorArray[0].length > 2) {
    return colorArray[0];
  }
  if(colorArray.length === 3) {
    colorArray.push(1)
  }
  if(colorArray.length < 4 || colorArray[colorArray.length-1] === '') {
    return false;
  }
  for(var color in colorArray) {
    if(colorArray[colorArray.length-1] === colorArray[color]){
      themeRGBA += colorArray[color]
    }else{
      themeRGBA += colorArray[color] + ','
    }
  }
  themeRGBA += ')';
  return themeRGBA;
}

export function convertRGBAToString(value) {
  let leftPar = value.indexOf('(');
  let rightPar = value.indexOf(')');
  if(leftPar === -1 && rightPar === -1 && value[0].length > 2) {
    return value[0];
  }
  let colorString = value.substring(leftPar+1, rightPar);
  let colorArray = colorString.split(',');
  if(colorArray.length === 3) {
    colorArray.push(1);
  }
  if(colorArray.length < 4 || colorArray[colorArray.length-1] === '') {
    return false;
  }
  for(var color in colorArray) {
    if(colorArray[colorArray.length-1] === colorArray[color]){
      colorArray[color] = parseFloat(colorArray[color]).toFixed(1);
    } else {
      colorArray[color] = parseInt(colorArray[color], 10);
    }
  }
  return colorArray.join(', ');
}


// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    app: store.app,
    ig: store.instaProxy,
    menu: store.menu,
    rubix: store.rubix,
  };
}

export default connect(mapStateToProps)(Theme);