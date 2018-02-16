import React from 'react';
import { connect } from 'react-redux';
import Styles from './Cube.styles';
import 'html-gl/dist/htmlgl.min';

import Spinner from '../../../assets/loader.svg';

const Style = new Styles();

/**
 * Styled Wrappers
 */
const CubeWrapper = Style.wrapper;
const Box = Style.cube;
const Item = Style.item;
const Face = Style.face;

class Cube extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      igProxyIsOnline: false,
      wrapperStyle: {},
      hasImagesOnLoad: props.hasImagesOnLoad,
      isMounted: false,
    };
    this.faces = Object.keys(this.props.object.style);

    this.imageStyle = {
      opacity: '0.50',
      width: '100%',
      height: '100%',
      display: 'default',
      borderRadius: '25%',
      margin: '10px',
    }

    this.getCubeFaces = getCubeFaces.bind(this);
    this.showImages = showImages.bind(this);
    this.hideImages = hideImages.bind(this);
    this.popInImages = popInImages.bind(this);
    this.popOutImages = popOutImages.bind(this);
  }

  componentDidMount() {
    this.setState({isMounted: true});
    let faces = getCubeFaces();
    for(let face in faces) {
      setImagesToLoading(faces[face]);
    }
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.ig.status) {
      this.setState({igProxyIsOnline: true });
      this.showImages();
      this.popInImages();
    } else {
      this.hideImages();
    }

    this.setState({ 
      wrapperStyle: {
        transform: 'scale(' + nextProps.object.scale[nextProps.app.screenSize][0] + ',' + nextProps.object.scale[nextProps.app.screenSize][1] + ')',        
      }
    });
  }

  render() {
    return(
      <CubeWrapper style={this.state.wrapperStyle}>
        <html-gl>
          <Box flat={this.props.object.objectIsFlat}>
            { 
              this.faces.map((face) => {
                let hasImages = this.state.hasImagesOnLoad;
                return <Face id={face} key={face}
                    itemBgColor={this.props.object.theme[face].bgColor}
                    itemColor={this.props.object.theme[face].txtColor}
                    style={this.props.object.style[face]}
                  >

                  <Item id={face+'-1'} position="top-left" type="corner">
                    {!hasImages || !this.state.object.theme[face].images[0] ? 'top left' : 
                      <img id={face+'-1-image'} style={this.imageStyle} alt="1" src={this.state.object.theme[face].images[0]} />
                    }
                  </Item>

                  <Item id={face+'-2'} position="top" type="side">
                    {!hasImages || !this.state.object.theme[face].images[1] ? 'top' : 
                      <img id={face+'-2-image'} style={this.imageStyle} alt="2" src={this.state.object.theme[face].images[1]} />
                    }
                  </Item>

                  <Item id={face+'-3'} position="top-right" type="corner">
                    {!hasImages || !this.state.object.theme[face].images[2] ? 'top right' : 
                      <img id={face+'-3-image'} style={this.imageStyle} alt="3" src={this.state.object.theme[face].images[2]} />
                    }
                  </Item>

                  <Item id={face+'-4'} position="left" type="side">
                    {!hasImages || !this.state.object.theme[face].images[3] ? 'left' : 
                      <img id={face+'-4-image'} style={this.imageStyle} alt="4" src={this.state.object.theme[face].images[3]} />
                    }
                  </Item>

                  <Item id={face+'-5'} position="center" type="middle">
                    {!hasImages || !this.state.object.theme[face].images[4] ? 'center' : 
                      <img id={face+'-5-image'} style={this.imageStyle} alt="5" src={this.state.object.theme[face].images[4]} />
                    }
                  </Item>

                  <Item id={face+'-6'} position="right" type="side">
                    {!hasImages || !this.state.object.theme[face].images[5] ? 'right' : 
                      <img id={face+'-6-image'} style={this.imageStyle} alt="6" src={this.state.object.theme[face].images[5]} />
                    }
                  </Item>

                  <Item id={face+'-7'} position="bottom-left" type="corner">
                    {!hasImages || !this.state.object.theme[face].images[6] ? 'bot left' : 
                      <img id={face+'-7-image'} style={this.imageStyle} alt="7" src={this.state.object.theme[face].images[6]} />
                    }
                  </Item>

                  <Item id={face+'-8'} position="bottom" type="side">
                    {!hasImages || !this.state.object.theme[face].images[7] ? 'bottom' : 
                      <img id={face+'-8-image'} style={this.imageStyle} alt="8" src={this.state.object.theme[face].images[7]} />
                    }
                  </Item>

                  <Item id={face+'-9'} position="bottom-right" type="corner">
                    {!hasImages || !this.state.object.theme[face].images[8] ? 'bot right' : 
                      <img id={face+'-9-image'} style={this.imageStyle} alt="9" src={this.state.object.theme[face].images[8]} />
                    }
                  </Item>
                </Face>
              })
            }
          </Box>
        </html-gl>
      </CubeWrapper>
    );
  }
};

export function getCubeFaces() {
  if(this) {
    return this.faces;
  } else {
    return ['top', 'bottom', 'front', 'back', 'left', 'right'];
  }
}

export function setImagesToLoading(face) {
  for(let i=1; i<10; i++) {
    let img = document.getElementById(face + '-' + i + '-image');
    let item = document.getElementById(face + '-' + i);
    if(img && item){
      img = { Spinner };
      item.style.transform = 'scale(0,0) rotate(360deg)';
    }
  }
}

export function popOutImages(face) {
  let i = 0;
  for(i = 0; i < 10; i++) {
    let item = document.getElementById(face + '-' + i);
    if(item) {
      item.style.transform = 'scale(0,0) rotate(360deg)';
    }
  }
}

export function popInImages(face) {
  let i = 0;
  for(i = 0; i < 10; i++) {
    let item = document.getElementById(face + '-' + i);
    if(item) {
      item.style.transform = 'scale(1,1) rotate(-360deg)';
    }
  }
}

function hideImages() {
  let faces = getCubeFaces();
  for(let face in faces) {
    for(let i = 0; i < 10; i++) {
      let img = document.getElementById(faces[face] + '-' + i + '-image');
      if(img) {
        img.style.display = 'none';
      }
    }
  }
  this.setState({hasImagesOnLoad: false});
}

function showImages() {
  let faces = getCubeFaces();
  for(let face in faces) {
    for(let i = 0; i < 10; i++) {
      let img = document.getElementById(faces[face] + '-' + i + '-image');
      if(img) {
        img.style.display = 'default';
      }
    }
  }
  this.setState({hasImagesOnLoad: true});
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    app: store.app,
    object: store.rubix,
    ig: store.instaProxy,
  };
}

export default connect(mapStateToProps)(Cube);

