/**
 * Common.js
 * 
 * THIS IS NOT A REACT COMPONENT
 * 
 * This is a library of styled components
 *  and methods, merged by Menu categories like Perspective
 * 
 */

import Styles from './Menu.styles';

// Import Actions
import {
  setMobileTheme,
  setDesktopTheme,
  toggleMenu,
} from './MenuActions'

// Styled component exports
//  See Menu.styles for style definitions
export const Style = new Styles();
export const Item = Style.item; // A complete navigation item
export const Content = Style.content; // Content of the nav item menu
export const Icon = Style.icon; // Icon for the nav item trigger
export const Title = Style.title; // Title above nav item content
export const Trigger = Style.trigger; // Nav item activation area
export const Category = Style.category; // Nav item trigger label
export const SubTitle = Style.h4;
export const Sub = Style.ul; // Nav item content subcategory
export const MenuAction = Style.li; // Nav item content button wrapper
export const Button = Style.btnPrimary; // Nav item content buttons
export const ButtonGroup = Style.btnGroup; // Bootstrap group of buttonsf
export const Label = Style.label; // Button group label
export const GroupButton = Style.btnSecondary; // Button in a group

/**
 * Class Common
 * 
 * Accepts
 *  object component
 * 
 * Implementation
 *  In a component's constructor, merge the component with
 *    a new instatiation of the Common class: 
 *    Object.assign(this, new Common(this));
 */
export default class Common {
  constructor(component) {
    this.props = component.props;
    this.state = component.state;

    // Bind this class's methods to the component
    this.handleTrigger = this.handleTrigger.bind(component);
    this.setTheme = this.setTheme.bind(component);
    this.getThemeRGBA = this.getThemeRGBA.bind(component);
  }

  //
  //  Menu handlers
  //

  /**
   * Enable the selected menu category
   */
  handleTrigger() {
    if(this.state.isDefaultState) {
      this.setState( {'isDefaultState': false });
    }
    this.props.dispatch(toggleMenu(this.id));
  }

  /**
   * Convert a theme base color array into an rgba string
   * @param [] themeColorArray 
   */
  getThemeRGBA(themeColorArray) {
    let prop = 'rgba(';
    for(var c in themeColorArray) {
      prop += themeColorArray[c] + ','
    }
    let trimmedProp = prop.slice(0, -1); //remove last comma
    trimmedProp += ')';
    return trimmedProp;
  }

  /**
   * Dispatch a store change based on theme changes
   * Or hard-reset individual properties that are used to style the menus
   * @param {*} props 
   */
  setTheme(props, dispatchToStore = false) {
    let baseColor = this.getThemeRGBA(props.triggers.menus[this.id].baseColor);
    let screenSize = this.props.app.screenSize;
    if (dispatchToStore) {
      if(props.app.screenSize === 'small' || props.app.screenSize === 'medium' ) {
        props.dispatch(
          setMobileTheme()
        );
      } else {
        props.dispatch(
          setDesktopTheme()
        );
      }
    } else {
      if( screenSize === 'small' || screenSize === 'medium' ) {
        this.themeColor = 'white';
        this.triggerColor = baseColor;
      } else {
        this.themeColor = baseColor;
        this.triggerColor = 'white';
      }
    }
    
  }

}
