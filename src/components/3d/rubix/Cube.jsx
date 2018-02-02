import React from 'react';
import { connect } from 'react-redux';
import Styles from './Cube.styles';
import { resetThemeImages } from './CubeActions';

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
    };
    this.faces = Object.keys(this.props.object.style);

    this.imageStyle = {
      opacity: '0.50',
      width: '100%',
      height: '100%',
      display: 'flex',
      borderRadius: '25%',
      margin: '10px',
    }

    this.getCubeFaces = getCubeFaces.bind(this);
    this.setAllImagesToLoading = setAllImagesToLoading.bind(this);
  }

  componentDidMount() {
    setAllImagesToLoading();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.ig.status) {
      this.setState({igProxyIsOnline: true });
    }

    if(this.state.igProxyIsOnline) {
      let faces = getCubeFaces();
      for(let face in faces) {
        setImagesToLoading(faces[face]);
      }
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
        <Box flat={this.props.object.objectIsFlat}>
          { 
            this.faces.map((face) => {
              let hasImages = this.props.hasImages;
              return <Face id={face} key={face}
                  itemBgColor={this.props.object.theme[face].bgColor}
                  itemColor={this.props.object.theme[face].txtColor}
                  style={this.props.object.style[face]}
                >

                <Item id={face+'-1'} position="top-left" type="corner">
                  {!hasImages ? 'top left' : 
                    <img id={face+'-1-image'} style={this.imageStyle} alt="1" src={this.props.object.theme[face].images[0]} />
                  }
                </Item>

                <Item id={face+'-2'} position="top" type="side">
                  {!hasImages ? 'top' : 
                    <img id={face+'-2-image'} style={this.imageStyle} alt="2" src={this.props.object.theme[face].images[1]} />
                  }
                </Item>

                <Item id={face+'-3'} position="top-right" type="corner">
                  {!hasImages ? 'top right' : 
                    <img id={face+'-3-image'} style={this.imageStyle} alt="3" src={this.props.object.theme[face].images[2]} />
                  }
                </Item>

                <Item id={face+'-4'} position="left" type="side">
                  {!hasImages ? 'left' : 
                    <img id={face+'-4-image'} style={this.imageStyle} alt="4" src={this.props.object.theme[face].images[3]} />
                  }
                </Item>

                <Item id={face+'-5'} position="center" type="middle">
                  {!hasImages ? 'center' : 
                    <img id={face+'-5-image'} style={this.imageStyle} alt="5" src={this.props.object.theme[face].images[4]} />
                  }
                </Item>

                <Item id={face+'-6'} position="right" type="side">
                  {!hasImages ? 'right' : 
                    <img id={face+'-6-image'} style={this.imageStyle} alt="6" src={this.props.object.theme[face].images[5]} />
                  }
                </Item>

                <Item id={face+'-7'} position="bottom-left" type="corner">
                  {!hasImages ? 'bot left' : 
                    <img id={face+'-7-image'} style={this.imageStyle} alt="7" src={this.props.object.theme[face].images[6]} />
                  }
                </Item>

                <Item id={face+'-8'} position="bottom" type="side">
                  {!hasImages ? 'bottom' : 
                    <img id={face+'-8-image'} style={this.imageStyle} alt="8" src={this.props.object.theme[face].images[7]} />
                  }
                </Item>

                <Item id={face+'-9'} position="bottom-right" type="corner">
                  {!hasImages ? 'bot right' : 
                    <img id={face+'-9-image'} style={this.imageStyle} alt="9" src={this.props.object.theme[face].images[8]} />
                  }
                </Item>
              </Face>
            })
          }
        </Box>
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
    if(img){
      img.style.src = './image-spinner.gif';
    }
  }
}

export function setAllImagesToLoading() {
  let i = 0;
  let faces = getCubeFaces();
  faces.map((face) => {
    for(i = 0; i < 9; i++) {
      let img = document.getElementById(face + '-' + i + '-image');
      if(img) {
        img.src = './image-spinner.gif';
      }
    }
  })
}

export function popOutImages(face) {
  let i = 0;
  let img = document.getElementById(face + '-' + i);
  for(i = 0; i < 10; i++) {
    let img = document.getElementById(face + '-' + i);
    if(img) {
      img.style = 'transform: scale(0,0)';
    }
  }
}

export function popInImages(face) {
  let i = 0;
  for(i = 0; i < 10; i++) {
    let img = document.getElementById(face + '-' + i);
    if(img) {
      img.style = 'transform: scale(1,1)';
    }
  }
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

