import React, { Component } from 'react';
import logo from '../../src/logo.png';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

class MyNavbar extends Component {
  state = {
        modal: false,
        isOpen : false
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  }

  toggle = () =>{
    this.setState({isOpen : !this.state.isOpen})
  }

  render() {
    return <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><img alt="Cannot Load" style={{ width: '50px', height: '50px' }} src={logo}></img></NavbarBrand>
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
            <Button color="danger" onClick={this.toggleModal}>Sign in</Button>
          </Nav>
        </Collapse>
      </Navbar>
      <Modal isOpen={this.state.modal} toggle={this.toggleModal.bind(this)}>
        <ModalHeader toggle={this.toggleModal}>Sign In!</ModalHeader>
        <ModalBody>
          Sign in function coming soon.
            </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggleModal}>OK! Got it.</Button>{' '}
          <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

    </div>;
  }

}

export default MyNavbar;


