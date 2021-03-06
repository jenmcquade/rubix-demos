import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

class Styles {
    constructor() {

    this.wrapper = styled.div `
      min-height: 100%;
      min-width: 100%;
      position: absolute;
    `;

    this.info = styled(Link) `
      position: relative;
      bottom: 1em;
      z-index: 0;
      padding: .25em .5em;
      border: 2px solid rgb(0, 123, 255);
      border-radius: 3px;
      background-color: transparent;
      &:hover {
        border-color: rgba(0, 123, 255, .6);
        color: rgba(0, 123, 255, .6);
      }
      @media only screen 
      and (min-width : 75px) 
      and (max-width : 667px) 
      { 
        font-size: 0.5em;
        padding: 1em 0.5em .5em;
      }
    `

    this.infoWrap = styled.div `
      min-width: 15em; 
      font-size: 1em; 
      position: absolute; 
      bottom: 0px; 
      padding: 1em; 
      letterSpacing: 0.10em;
      transition: transform 0.8s;
      transform: translateY(0em);

      > div:not(:nth-child(2)) {
        padding: 0.25em;
        background: rgba(0,0,0,0.5);
      }

      ${props => props.isOpen && css`
        transform: translateY(0em);
      `}

      ${props => !props.isOpen && css`
        transform: translateY(${process.env.NODE_ENV === 'development' ? '34em' : '11em'});

        @media only screen 
        and (min-width : 75px) 
        and (max-width : 667px) 
        { 
          transform: translateY(${process.env.NODE_ENV === 'development' ? '30em' : '11em'});
        }
      `}
    `

    this.hrule = styled.div`
      margin-top: 1em;
      border-bottom: 1px solid white;
    `

    this.gitHubLink = styled.a`
      right: 0em;
      top: 0em;
      position: absolute;
      float: right;
      z-index: 99;
    `
  }
}
export default Styles;