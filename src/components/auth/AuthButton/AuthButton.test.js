import React from 'react';
import { shallow } from 'enzyme';
import { Confirmation } from '../../shared';
//import { AUTH_LOGOUT, } from '../../../store/types';
//import { authLogout } from '../../../store/actions';

import AuthButton from './AuthButton';

describe('AuthButton', () => {
    const props = {
        className: '',
        isLogged: true,
        onLogout: jest.fn(),
        onConfirm: jest.fn(), 
    };
    
    const api = {
        auth: { logout: jest.fn().mockResolvedValue() },
      };

    const dispatch = jest.fn()

    const render = () => shallow(<Confirmation {...props} />);

    test('should render', () => {
        const wrapper = render();
        //console.log(wrapper.props());
        expect(wrapper.exists()).toBe(true);
        //expect(wrapper.find('onConfirm').props()).toBe('onConfirm');
        //expect(wrapper.props().isLogged).to.equal(true);
        //wrapper.find('Confirmation').invoke('onConfirm')().then(() => {
          //  expect().toBeCalled();
        //});
    });

    test('snapshot testing', () => {
        const wrapper = render();
        expect(wrapper).toMatchSnapshot();
    });

});
