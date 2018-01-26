import styled, { css, keyframes } from 'styled-components';
import animations from '../../animations/menu';
import { Button, ButtonGroup } from 'react-bootstrap';

const anims = new animations(keyframes);

class Styles {
  constructor() {
    this.root = styled.div`
      min-height: 100%;
      width: 100%;
    `;

    this.menu = styled.div`
      font-size: 2em;
      justify-content: center;
      box-sizing: border-box;
      z-index: 99;
      display: flex;
      position: absolute;
      background-color: white;

      @media only screen
      and (min-width : 75px) 
      and (max-width : 719px) {
        height: 10rem;
        min-width: 100%;
        z-index: 99;
        padding: 0;
        max-height: 100px;
      }

      @media only screen 
      and (min-width: 720px) 
      and (max-width: 1023px) { 
        z-index: 99;
        display: grid;
      }
    `;

    this.item = styled.div`
      text-align: center;
      transform-origin: top left;
      z-index: default;
      transition: background-color 0.8s forwards;
      height: 2.6em;
      display: inline-grid;
      width: min-content;

      @media only screen
      and (min-width : 75px) 
      and (max-width : 719px) {
        display: grid;
        flex-flow: row wrap;
        cursor: pointer;
        cursor: hand;
        text-align: center;
        transform-origin: top left;
        padding-top: 0px;
        margin: 0 1em 0 1em;
      }

      @media only screen 
      and (min-width: 720px) 
      and (max-width: 1023px) { 
        width: 5em;
      }
    `;

    this.trigger = styled.a`
      cursor: pointer;
      color: rgba(255,255,255,1);
      text-decoration: none;
      transform-origin: top left;
      transition: color, 0.5s ease;
      transform-style: preserve-3d;
      transform: default;
      width: 100%;
      height: 100%;
      display: table-caption;
      position: relative;
      padding: 0.5em 0.5em 0.5em 0.5em;

      > :focus, :hover {
        text-decoration: none;
        color: rgba(255,255,255,0.8);
      }

      ${props => !props.active && !props.default && css`
        animation: ${anims.menuTitleFlipUp} 1s forwards ease-out;
      `}

      ${props => props.active && css`
        animation: ${anims.menuTitleDrop}  1s forwards ease-out;
      `}

      @media only screen
      and (min-width : 75px) 
      and (max-width : 719px) {
        animation: "";
        transform: rotateZ(0deg) translateY(0em);
        padding: 0.5em 0.1em 0 0.1em;
        font-size: 1em;
        text-align: center;
        display: table;

        > :focus, :hover {
          text-decoration: none;
          color: rgba(0,0,0,0.8);
        }
      }

      @media only screen 
      and (min-width: 720px) 
      and (max-width: 1023px) { 
        width: 5em;
        padding: 0.5em 1em 0.5em .5em;
      }

      @media only screen 
      and (min-width: 1920px) { 
        max-height: 2.5em;
      }
    `;

    this.category = styled.span`
      font-size: 20pt;
      display: inline-grid;
      @media only screen
      and (min-width : 75px) 
      and (max-width : 719px) {
        display:none;
      }
      @media only screen 
      and (min-width: 720px) 
      and (max-width: 1023px) { 
        display:none;
      }
      @media only screen
      and (min-width: 1024px) {
        margin-left: .5em;
      };
    `;

    this.title = styled.div`
      display: inline-grid;

      @media only screen 
      and (min-width: 720px) 
      and (max-width: 1023px) { 
        margin-top: 0%;
      }
      @media only screen 
      and (min-width: 1024px) {
        display: none;
      };
    `;

    this.icon = styled.i`
      font-size: 20pt;
      display: inline-grid;

      @media only screen
      and (min-width : 75px) 
      and (max-width : 719px) {
        margin-top: 0;
        font-size: 2em;
      }
      @media only screen 
      and (min-width: 720px) 
      and (max-width: 1023px) { 
        margin: 0 40%;
      }
    `;

    this.content = styled.div`
      min-width: 15em;
      min-height: 18em;
      margin-top: -3em;
      transform: rotateX(-90deg);
      transition: default;
      padding: 1em;
      z-index: 10;

      ${props => props.backgroundColor && css`
        bgColor = props.backgroundColor;
        background-color: rgba(${props.backgroundColor[0]},${props.backgroundColor[1]},${props.backgroundColor[2]},${props.backgroundColor[3]});
      `}

      @media only screen
      and (min-width : 75px) 
      and (max-width : 719px) {
        position: absolute;
        min-height: 18em;
        min-width: 100%;
        top: 184%;
        left: 0%;
        display: table-row;
        padding-top: 1em;

        ${props => props.active && !props.default && css`
          transform: rotateX(0deg);
        `}

        ${props => props.backgroundColor && css`
          bgColor = props.backgroundColor;
          background-color: rgba(${props.backgroundColor[0]},${props.backgroundColor[1]},${props.backgroundColor[2]},0.7);
        `}

      }

      @media only screen 
      and (min-width: 720px) 
      and (max-width: 1023px) { 
        padding-top: 5%;
        margin-top: -2.42em;
        ${props => props.active && !props.default && css`
          animation: ${anims.menuOpenContent} 1s forwards ease-out;
        `}

        ${props => !props.active && !props.default && css`
          animation: ${anims.menuCloseContent} 1s forwards ease-out;
        `}
      }

      @media only screen 
      and (min-width: 1024px) { 
        padding-top: 5%;
        ${props => props.active && !props.default && css`
          animation: ${anims.menuOpenContent} 1s forwards ease-out;
        `}

        ${props => !props.active && !props.default && css`
          animation: ${anims.menuCloseContent} 1s forwards ease-out;
        `}
      }
    `;

    this.h4 = styled.h4`
      margin: 1em;
      font-size: 0.80em;
      font-weight: 400;
    `

    this.ul = styled.ul`
      list-style-type: none;
      margin: auto;
      padding: 0px;
      font-size: 0.7em;
      display: flex;
      align-items: flex-end;
    `

    this.li = styled.li`
      list-style-type: none;
      margin: 0px 0.25em;
      display: inline-block;
    `

    this.btnGroup = styled(ButtonGroup)`

    `

    this.label = styled.label`
      margin-right: 0.25em;
    `

    this.btnSecondary = styled(Button)`
      cursor: pointer;
      font-size: 1em;
      font-family: 'sans-serif';
    `

    this.btnPrimary = styled.a`
      cursor: pointer;
      display: inline-block;
      border-radius: 3px;
      padding: 0.5rem 0;
      margin: 0rem 1rem;
      width: 11rem;
      background: transparent;
      color: white;
      border: 2px solid white;
      text-transform: uppercase;

      &:hover {
        text-decoration: none;
        color: white;
        background: rgba(255,255,255,0.6);
      }

      ${props => props.primary && css`
        background: white;
        color: black;
      `}

    `
  }
}

export default Styles;
