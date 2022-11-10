import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { HomePage } from '../components/HomePage';
import { configure } from 'enzyme';
import { Link } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme';


configure({ adapter: new Adapter() });


describe.skip("Test HomePage component", () => {
  it('uses Router for logout functionality', () => {
    console.log( 'in Home page test')
    const children = shallow(<HomePage />);
    console.log(children, 'in Home page')
    expect(children.find(Link)).to.have.length(1);
  });
});
