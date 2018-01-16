export default class Menu {
  constructor(keyframes) {
    this.menuReset = keyframes`
      0% {
        transform-origin: bottom right; 
        transform: rotateZ(90deg) translateY(-1330%);
      }
      100% {
        transform: rotateZ(0deg) translateY(0); 
      }
    `;

    this.menuTitleDrop = keyframes`
      0% { 
        transform: rotateZ(0deg) translateY(0em);
      }
      25% {
        transform: rotateZ(90deg) translateY(0em);
      }
      50% {
        transform: rotateZ(90deg) translateY(-4.5em);
      }
      100% {
        transform: rotateZ(90deg) translateY(-8.8em);
      }
    `;

    this.menuTitleFlipUp = keyframes`
      0% { 
        transform: rotateZ(90deg) translateY(-8.8em);
      }
      25% {
        transform: rotateZ(90deg) translateY(-4.5em);
      }
      50% {
        transform: rotateZ(90deg) translateY(0em);
      }
      100% {
        transform: rotateZ(0deg) translateY(0em);
      }
    `;

    this.menuOpenContent = keyframes`
      0% {
        transform: translateX(-150%);  
      }
      25% {
        transform: translateX(-100%);  
      }
      50% {
        transform: translateX(-50%);
      }
      100% {
        transform: translateX(0%);
      }		
    `;

    this.menuCloseContent = keyframes`
      0% {
        transform: translateX(0%);
      }

      25% {
        transform: translateX(-50%);
      }

      50% {
        transform: translateX(-100%);
      }
      
      100% {
        transform: translateX(-150%); 
      }
    `;
  }
}
