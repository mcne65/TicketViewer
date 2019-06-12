import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header.ui';

describe('Test for App component', () => {
    it('renders without crashing', () => {
        shallow(<Header />)
    });
});