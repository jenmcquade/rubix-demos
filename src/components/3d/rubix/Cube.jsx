import React from 'react';
import { connect } from 'react-redux';
import Styles from './Cube.styles';
import 'html-gl/dist/htmlgl.min';
import Draggable from 'react-draggable';

import Spinner from '../../../assets/loader.svg';

const Style = new Styles();

/**
 * Styled Wrappers
 */
const CubeWrapper = Style.wrapper;
const DraggableHandle = Style.handle;
const Box = Style.cube;
const Item = Style.item;
const Face = Style.face;

class Cube extends React.Component {
  constructor(props) {
    super(props);
    this.faces = Object.keys(this.props.object.style);
    this.state = {
      ...props,
      igProxyIsOnline: false,
      wrapperStyle: {},
      hasImagesOnLoad: props.hasImagesOnLoad,
      isMounted: false
    };

    this.getCubeFaces = getCubeFaces.bind(this);
    this.showImages = showImages.bind(this);
    this.hideImages = hideImages.bind(this);
    this.popInImages = popInImages.bind(this);
    this.popOutImages = popOutImages.bind(this);
    this.getPositionTxt = getPositionTxt.bind(this);
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
    let items = [
      {type: 'corner', position: ['top', 'left']},
      {type: 'side', position: ['top']},
      {type: 'corner', position: ['top', 'right']},
      {type: 'side', position: ['left']},
      {type: 'middle', position: ['center']},
      {type: 'side', position: ['right']},
      {type: 'corner', position: ['bottom', 'left']},
      {type: 'side', position: ['bottom']},
      {type: 'corner', position: ['bottom', 'left']},
    ]
    return(
      <Draggable
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        grid={[5, 5]}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
      >
        <DraggableHandle className="handle">
          <CubeWrapper style={this.state.wrapperStyle}>
            <html-gl>
              <Box flat={this.props.object.objectIsFlat}>
                { 
                  this.faces.map((face) => {
                    let hasImages = this.state.hasImagesOnLoad;
                    return <Face draggable="false" id={face} key={face}
                      itemBgColor={this.props.object.theme[face].bgColor}
                      itemColor={this.props.object.theme[face].txtColor}
                      style={this.props.object.style[face]}
                    >
                    {
                      items.map((item, i) => {
                        let position = item.position.join('-');
                        let positionTxt = this.getPositionTxt(item);
                        return <Item key={i}
                          id={face + '-' + (i+1).toString()}
                          position={position}
                          type={item.type}>
                          { !hasImages || !this.state.object.theme[face].images[i] ? positionTxt : 
                            <img draggable="false" alt={positionTxt} id={face + '-' + (i+1).toString() + '-image'}
                              style={this.state.object.theme[face].imageStyle}
                              src={this.state.object.theme[face].images[i]}
                            />
                          }
                        </Item>
                      })
                    }
                    </Face>
                  })
                }
              </Box>
            </html-gl>
          </CubeWrapper>
        </DraggableHandle>
      </Draggable>            
    );
  }
};

function getPositionTxt(item) {
  let position = item.position.join('-');
  let positionTxt = '';
  if(item.type === 'corner' && position[0] === 'bottom') {
    positionTxt = 'bot ' + item.position[1];
  } else if(item.type === 'side' && position[0] === 'bottom') {
    positionTxt = 'bot';
  } else {
    positionTxt = item.position.join(' ');
  }
  return positionTxt;
}

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

