import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { NavDropdown } from 'app/shared/layout/header/header-components';
import { AccountMenu } from 'app/shared/layout/header/menus';

describe('AccountMenu', () => {
  let mountedWrapper;

  const authenticatedWrapper = () => {
    if (!mountedWrapper) {
      mountedWrapper = shallow(<AccountMenu isAuthenticated />);
    }
    return mountedWrapper;
  };
  const guestWrapper = () => {
    if (!mountedWrapper) {
      mountedWrapper = shallow(<AccountMenu />);
    }
    return mountedWrapper;
  };

  beforeEach(() => {
    mountedWrapper = undefined;
  });

  // All tests will go here

  it('Renders a authenticated AccountMenu component', () => {
    const dropdown = authenticatedWrapper().find(NavDropdown);
    expect(dropdown).to.have.length(1);
    expect(dropdown.find({ to: '/login' })).to.have.length(0);
    expect(dropdown.find({ to: '/logout' })).to.have.length(1);
  });

  it('Renders a guest AccountMenu component', () => {
    const dropdown = guestWrapper().find(NavDropdown);
    expect(dropdown).to.have.length(1);
    expect(dropdown.find({ to: '/login' })).to.have.length(1);
    expect(dropdown.find({ to: '/logout' })).to.have.length(0);
  });
});
