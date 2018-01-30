import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    
    this.formsState = {};
    for(var face in this.faces) {
      face = face.toLowerCase();
      this.formsState[this.faces[face]] = {
        searchType: 'color',
        text:{
          user:{style:{display:'none',}},
          hashTag:{style:{display:'none',}},
          bgColor:{style:{display:'inline',}},
          txtColor:{style:{display:'none',}}
        }
      }
    }

    this.state = {
      services: {
        ig: {
          status: 'offline',
        }
      },
      isDefaultState: true,
      app: props.app,
      menu: props.menu,
      rubix: props.rubix,
      searchType: 'color',
      themeFace: 'top',
      forms: this.formsState,
    }

    // Binders
    this.changeSearchType = this.changeSearchType.bind(this);
    this.changeLoadFace = this.changeLoadFace.bind(this);
    this.changeBgColor = this.changeBgColor.bind(this);
    this.changeTxtColor = this.changeTxtColor.bind(this);
  }

  //
  // Form handlers
  //
  changeSearchType(e) {
    let face = e.split('-')[0];
    let type = e.split('-')[1];
    let newState = JSON.parse(JSON.stringify(this.state.forms));
    let friendlyType = 'color';

    switch (type) {
      case 'bgColor':
        friendlyType = 'color';
        break;
      
      case 'txtColor':
        friendlyType = 'text';
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

  updateSearch(props) {
    // console.log(this);
  }

  changeLoadFace(value) {
    this.setState({themeFace: value.toLowerCase()});
  }

  changeBgColor(e){
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

  changeTxtColor(e) {
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

  convertStringToThemeRGBA(value) {
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

  convertRGBAToString(value) {
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
                    <DropdownItem display={igStatus} eventKey="@">@ (user)</DropdownItem>
                    <DropdownItem display={igStatus} eventKey="#"># (hashtag)</DropdownItem>
                    <DropdownItem eventKey={face + '-bgColor'}>Background Color (0-255,0-255,0-255,0-1)</DropdownItem>
                    <DropdownItem eventKey={face + '-txtColor'}>Text Color</DropdownItem>
                  </DropdownButton>
                  <TextBox
                    bsSize="large"
                    id="searchTextUser"
                    type="text"
                    style={this.state.forms[face].text.user.style}
                  />
                  <TextBox
                    bsSize="large"
                    id="searchTextHashtag"
                    type="text"
                    style={this.state.forms[face].text.hashTag.style}
                  />
                  { 
                    //1/28: Use Style for backgroundColor, not to hide
                    // Use a different property to show active state
                  }
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

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    app: store.app,
    menu: store.menu,
    rubix: store.rubix,
  };
}

export default connect(mapStateToProps)(Theme);