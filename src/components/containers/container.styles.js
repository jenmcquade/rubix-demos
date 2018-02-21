import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom'

class Styles {
  constructor() {

    this.info = styled(Link)`
      position: relative;
      bottom: .5em;
      left: 50%;
    `

    this.infoWrap = styled.div`
      min-width: 15em; 
      font-size: 1em; 
      position: absolute; 
      bottom: 0px; 
      padding: 1em; 
      letterSpacing: 0.10em;
      transition: transform 0.8s;
      transform: translateY(0em);

      ${props => props.isOpen && css`
        transform: translateY(0em);
      `}

      ${props => !props.isOpen && css`
        transform: translateY(15em);
      `}
    `

  }
}
export default Styles;
