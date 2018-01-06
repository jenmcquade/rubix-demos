import React, { Component } from 'react';
import ReactDom from 'react-dom';

class Menu extends Component {
  render() {
    return (
      <div id="container" className="menu closed">
        <div className="nav-item" id="perspective">
          <a onClick={this.toggleMenu("#perspective")}>
            <i className="glyphicon glyphicon-th"></i>
              <span>Perspective</span>
          </a>
          <div id="content" className="content"></div>
        </div>
      </div>
  )}

  /* Menu triggers ES2015 */
  toggleMenu( menuId ) {
    ;
    /* TODO: Recast this for React Dom state targeting

    var item = this.refs[menuId];
    var menu = this.refs.container;
    var content = this.refs.content;
    
    content.classList.remove('menu-open-content');
    item.classList.remove('menu-reset');

    / Mobile or small width detection /
    if( window.matchMedia("(max-width: 720px)").matches ) {		
      if(menu.className == 'closed') {
        content.style.transform = 'rotateX(0deg) rotateZ(0deg)';
      }	else {
        menu.className = "closed";
        content.style.transform = 'rotateX(-90deg) rotateZ(0deg)';
      }
      return true;
    }
    
    / Default extended animation /
    console.log(menu);
    return;
    if(menu.className == 'closed') {
      menu.className = "menu-flip-down";
      setTimeout(function(){
       content.className = 'menu-open-content';
      }, 800);
    } else {
      menu.className = 'closed';
      item.className = 'menu-reset';
      content.className = 'menu-close-content';
      setTimeout(
        function(){
          item.className = "";
        }, 800);
    }*/
  }
}

export default Menu;