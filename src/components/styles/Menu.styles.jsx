import styled from 'styled-components';

class Styles {
  constructor() {
    this.root = styled.div`
      min-height: 100%;
      width: 100%;
    `;

    this.menu = styled.div`
      max-width: 33%;
      justify-content: center;
      position: relative;
      box-sizing: border-box;
      align-content: stretch;
      place-content: stretch;

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
      cursor: pointer;
      text-align: center;
      transform-origin: top left;
      z-index: 9;
      padding-top: 0.4em;
      position: absolute;

      @media only screen
      and (min-width : 75px) 
      and (max-width : 719px) {
        display: flex;
        flex-flow: row wrap;
        cursor: pointer;
        cursor: hand;
        text-align: center;
        transform-origin: top left;
        min-width: 100%;
        padding-top: 0px;
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
      and (min-width: 1024px) {
        display: none;
      };
    `;

    this.icon = styled.i`
      font-size: 20pt;
      margin-bottom: 0.5em;

      @media only screen
      and (min-width : 75px) 
      and (max-width : 719px) {
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
      margin-top: -2.63em;
      position: inherit;
      transform: rotateX(-90deg);
      background-color: red;

      @media only screen
      and (min-width : 75px) 
      and (max-width : 719px) {
        min-height: 18em;
        min-width: 100%;
        margin-top: 2px;
        transform: rotateZ(0deg) translateY(0);
        display: table-row;
        background: rgba(255,0,0,0.7);
      }

      @media only screen 
      and (min-width: 720px) 
      and (max-width: 1023px) { 
        padding-top: 5%;
        margin-top: -2.43em;
      }

      @media only screen 
      and (min-width: 1024px) { 
        padding-top: 5%;
      }
    `;

    this.trigger = styled.a`
      color: white;
      text-decoration: none;
      width: 100%;
      transform-origin: top left;
      z-index: 10;
      padding: 0.5em;
      background-color: red;
      display: inline;
      font-size: 2em;
      transition: color, 0.5s ease; color: rgba(255,255,255,1);
      > :focus, :hover {
        text-decoration: none;
        color: rgba(255,255,255,0.8);
      }
      @media only screen
      and (min-width : 75px) 
      and (max-width : 719px) {
        animation: "";
        transform: rotateZ(0deg) translateY(0em);
        padding: 0.5em 0.1em 0 0.1em;
        background-color: white;
        color: red;
      }

      @media only screen 
      and (min-width: 720px) 
      and (max-width: 1023px) { 
        padding-left: 0;
      }

      @media only screen 
      and (min-width: 1920px) { 
        max-height: 2.5em;
      }

    `;
  }
}

export default Styles;
