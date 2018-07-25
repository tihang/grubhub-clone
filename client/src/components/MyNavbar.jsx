import React, { Component } from 'react';
import logo from '../../src/logo.png';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

class MyNavbar extends Component{
    state = {
        isOpen : false
    }

    toggle = () =>{
        this.setState({isOpen : !this.state.isOpen});
    }

    render(){
        return <div>
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/"><img alt="Cannot Load" style={{width: '50px', height:'50px'}}src={logo}></img></NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="/search">Search</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="https://github.com/tihang">
                      GitHub
                    </NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Options
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Under Construction</DropdownItem>
                      <DropdownItem>Under Construction</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>Reset</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
          </div>;
    }

}

export default MyNavbar;