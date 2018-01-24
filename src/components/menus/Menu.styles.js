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
      max-width: 33%;
      justify-content: center;
      position: relative;
      box-sizing: border-box;
      align-content: stretch;
      place-content: stretch;
      z-index: 99;

      @media only screen
      and (min-width : 75px) 
      and (max-width : 719px) {
        min-width: 100%;
        z-index: 99;
        padding: 0;
        background-color: white;
        max-height: 100px;
      }

      @media only screen 
      and (min-width: 720px) 
      and (max-width: 1023px) { 
        max-width: 20%;
        z-index: 99;
      }
    `;

    this.item = styled.div`
      text-align: center;
      transform-origin: top left;
      z-index: 9;
      position: absolute;
      transition: background-color 0.8s forwards;

      @media only screen
      and (min-width : 75px) 
      and (max-width : 719px) {
        background-color: rgba(255,255,255,1);
        display: grid;
        flex-flow: row wrap;
        cursor: pointer;
        cursor: hand;
        text-align: center;
        transform-origin: top left;
        min-width: 100%;
        padding-top: 0px;
        margin: 0px;
      }
    `;

    this.trigger = styled.a`
      cursor: pointer;
      color: rgba(255,255,255,1);
      text-decoration: none;
      transform-origin: top left;
      z-index: 10;
      padding: 0.5em;
      background-color: red;
      display: flex;
      font-size: 2em;
      transition: color, 0.5s ease;
      transform-style: preserve-3d;
      transform: default;
      margin: auto;

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
        background-color: white;
        color: red;
        font-size: 1em;
        text-align: center;
        > :focus, :hover {
          text-decoration: none;
          color: rgba(0,0,0,0.8);
        }
      }

      @media only screen 
      and (min-width: 720px) 
      and (max-width: 1023px) { 
        padding: 0.5em 1em 0.5em .5em;
      }

      @media only screen 
      and (min-width: 1920px) { 
        max-height: 2.5em;
      }
    `;

    this.category = styled.span`
      font-size: 20pt;
      display: inherit;
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
      display: block;

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
      margin-top: 0.17em;
      margin-bottom: 0.5em;

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
      min-height: 15em;
      margin-top: -3.6em;
      position: inherit;
      transform: rotateX(-90deg);
      background-color: red;
      transition: default;
      z-index: 9;

      @media only screen
      and (min-width : 75px) 
      and (max-width : 719px) {
        min-height: 18em;
        min-width: 100%;
        margin-top: 3.5em;
        display: table-row;
        background: rgba(255,0,0,0.7);
        padding-top: 1em;

        ${props => props.active && !props.default && css`
         transform: rotateX(0deg);
        `}
      }

      @media only screen 
      and (min-width: 720px) 
      and (max-width: 1023px) { 
        padding-top: 5%;
        margin-top: -3em;
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
      margin: 0.25em;
      font-size: 0.80em;
      font-weight: 400;
    `

    this.ul = styled.ul`
      list-style-type: none;
      margin: auto;
      padding: 0px;
      font-size: 0.7em;
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
      margin: 0.5rem 1rem;
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
