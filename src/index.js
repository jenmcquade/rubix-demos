import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

/* Menu triggers ES2015 */

function toggleMenu( navButton ) {
	var item = navButton.parentElement;
	var menu = document.querySelector('.menu');
  item.querySelector('.content').classList.remove('menu-open-content');
	item.classList.remove('menu-reset');
	/* Mobile or small width detection */
	if( window.matchMedia("(max-width: 720px)").matches ) {		
		if(menu.classList.contains('closed')) {
			menu.classList.remove('closed');  
			item.querySelector('.content').style.transform = 'rotateX(0deg) rotateZ(0deg)';
		}	else {
			menu.classList.add('closed');
			item.querySelector('.content').style.transform = 'rotateX(-90deg) rotateZ(0deg)';
		}
		return true;
	}
	
	/* Default extended animation */
  if(menu.classList.contains('closed')) {
		item.classList.add('menu-flip-down'); 
		menu.classList.remove('closed'); 
		item.querySelector('.content').classList.remove('menu-close-content')
		setTimeout(function(){
			item.querySelector('.content').classList.add('menu-open-content');
		}, 800);
	} else {
		menu.classList.add('closed');
		item.classList.add('menu-reset');
		item.querySelector('.content').classList.add('menu-close-content');
		setTimeout(
			function(){
			  item.querySelector('.content').classList.remove('menu-open-content');
			  item.classList.remove('menu-flip-down'); 
		  }, 800);
	}

	
}
