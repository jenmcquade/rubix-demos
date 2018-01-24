// Import Actions
import { 
  RESTORE_OBJECT, 
  FLATTEN_OBJECT, 
  ZOOM_OUT, 
  ZOOM_IN 
} from './CubeActions';

// Initial State
const initialState = {
  objectIsFlat: false,
  scale: {
    small: [0.6, 0.6],
    medium: [0.8, 0.8],
    large: [0.8, 0.8],
    xlarge: [1, 1],
  },
  style: {
    top: {
      transform: 'scale(1, 1) rotateX(0) rotateY(0) rotateZ(0) translateX(0) translateY(0) translateZ(0)',
    },
    bottom: {
      transform: 'scale(1, 1) rotateX(-180deg) rotateY(0) rotateZ(0) translateX(0) translateY(-100%) translateZ(360px)',
    },
    front: {
      transform: 'scale(1, 1) rotateX(270deg) rotateY(0) rotateZ(0deg) translateX(0) translateY(0) translateZ(360px)',
    },
    back: {
      transform: 'scale(1, 1) rotateX(90deg) rotateY(0) rotateZ(0) translateX(0) translateY(-100%) translateZ(0)',
    },
    right: {
      transform: 'scale(1, -1) rotateX(-90deg) rotateY(-90deg) rotateZ(0) translateX(-100%) translateY(0) translateZ(-360px)',
    },
    left: {
      transform: 'scale(-1, 1) rotateX(-90deg) rotateY(-90deg) rotateZ(0) translateX(0) translateY(0) translateZ(0)',
    }
  }
};

const CubeReducer = (state = initialState, action) => {
  let newScale = {};

  switch (action.type) {
    case RESTORE_OBJECT:
      return initialState;

    case FLATTEN_OBJECT:
      return {
        scale: state.scale,
        objectIsFlat: true,
        style: {
          top: {
            transform: 'scale(1, 1) rotateX(0) rotateY(0) rotateZ(0) translateX(0) translateY(0) translateZ(0)',
          },
          bottom: {
            transform: 'scale(1, 1) rotateX(0deg) rotateY(0) rotateZ(0) translateX(0) translateY(0%) translateZ(0)',
          },
          front: {
            transform: 'scale(1, 1) rotateX(0deg) rotateY(0) rotateZ(0) translateX(0) translateY(0%) translateZ(0)',
          },
          back: {
            transform: 'scale(1, 1) rotateX(0deg) rotateY(0) rotateZ(0) translateX(0) translateY(0%) translateZ(0)',
          },
          right: {
            transform: 'scale(1, 1) rotateX(0deg) rotateY(0) rotateZ(0) translateX(0) translateY(0%) translateZ(0)',
          },
          left: {
            transform: 'scale(1, 1) rotateX(0deg) rotateY(0) rotateZ(0) translateX(0) translateY(0%) translateZ(0)',
          }
        }
      }

      case ZOOM_OUT:
        for(let size in state.scale) {
          let height = state.scale[size][0] > 0 ? state.scale[size][0] - 0.1 : state.scale[size][0] + 0.1;
          let width = state.scale[size][1] > 0 ? state.scale[size][1] - 0.1 : state.scale[size][1] + 0.1;
          newScale[size] = [height, width];
        }

        return {
          objectIsFlat: state.objectIsFlat,
          scale: { 
            small: newScale.small,
            medium: newScale.medium,
            large: newScale.large,
            xlarge: newScale.xlarge,
          },
          style: state.style,
        }
 
      case ZOOM_IN:
        for(let size in state.scale) {
          let height = state.scale[size][0] + 0.1;
          let width = state.scale[size][1] + 0.1;
          newScale[size] = [height, width];
        }
        return {
          objectIsFlat: state.objectIsFlat,
          scale: {
            small: newScale.small,
            medium: newScale.medium,
            large: newScale.large,
            xlarge: newScale.xlarge,
          },
          style: state.style,
        }

    default:
      return state;
  }
};

// Export Reducer
export default CubeReducer;
