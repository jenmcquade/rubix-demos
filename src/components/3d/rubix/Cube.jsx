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
const Image = Style.image;

class Cube extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      igProxyIsOnline: false,
    };
    this.faces = Object.keys(this.props.object.style);

    this.imageStyle = {
      opacity: '0.50',
      width: '100%',
      height: '100%',
      display: 'flex',
      borderRadius: '25%',
      margin: '10px',
      transformStyle: 'preserve-3d',
      position: 'relative',
      transition: 'background 0.8s',
    }

    this.getCubeFaces = getCubeFaces.bind(this);
  }

  componentDidMount(props) {

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
  }

  render() {
    let proxyIsOnline = this.state.igProxyIsOnline;
    return(
      <CubeWrapper style={this.state.wrapperStyle}>
        <Box flat={this.props.object.objectIsFlat}>
          { 
            this.faces.map((face) => {
              let hasImages = proxyIsOnline ? true : false;
              return <Face id={face} key={face}
                  itemBgColor={this.state.object.theme[face].bgColor}
                  itemColor={this.state.object.theme[face].txtColor}
                  style={this.props.object.style[face]}
                >

                <Item position="top-left" type="corner">
                  {!hasImages ? 'top left' : 
                    <img id={face+'-1'} style={this.imageStyle} alt="1" src={this.state.object.theme[face].images[0]} />
                  }
                </Item>

                <Item position="top" type="side">
                  {!hasImages ? 'top' : 
                    <img id={face+'-2'} style={this.imageStyle} alt="2" src={this.state.object.theme[face].images[1]} />
                  }
                </Item>

                <Item position="top-right" type="corner">
                  {!hasImages ? 'top right' : 
                    <img id={face+'-3'} style={this.imageStyle} alt="3" src={this.state.object.theme[face].images[2]} />
                  }
                </Item>

                <Item position="left" type="side">
                  {!hasImages ? 'left' : 
                    <img id={face+'-4'} style={this.imageStyle} alt="4" src={this.state.object.theme[face].images[3]} />
                  }
                </Item>

                <Item position="center" type="middle">
                  {!hasImages ? 'center' : 
                    <img id={face+'-5'} style={this.imageStyle} alt="5" src={this.state.object.theme[face].images[4]} />
                  }
                </Item>

                <Item position="right" type="side">
                  {!hasImages ? 'right' : 
                    <img id={face+'-6'} style={this.imageStyle} alt="6" src={this.state.object.theme[face].images[5]} />
                  }
                </Item>

                <Item position="bottom-left" type="corner">
                  {!hasImages ? 'bot left' : 
                    <img id={face+'-7'} style={this.imageStyle} alt="7" src={this.state.object.theme[face].images[6]} />
                  }
                </Item>

                <Item position="bottom" type="side">
                  {!hasImages ? 'bottom' : 
                    <img id={face+'-8'} style={this.imageStyle} alt="8" src={this.state.object.theme[face].images[7]} />
                  }
                </Item>

                <Item position="bottom-right" type="corner">
                  {!hasImages ? 'bot right' : 
                    <img id={face+'-9'} style={this.imageStyle} alt="9" src={this.state.object.theme[face].images[8]} />
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
    document.getElementById(face + '-' + i).style.src = './image-spinner.gif';
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

