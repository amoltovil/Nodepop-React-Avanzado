import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
    const props = {
        isLoading: false,
        onSubmit: jest.fn(),
    };
    
    const render = () => shallow(<LoginForm {...props} />);

    test('should render', () => {
        const wrapper = render();
        //console.log(wrapper.debug());
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('form').props().className).toBe('loginForm');

    });

    test('snapshot testing', () => {
        const wrapper = render();
        expect(wrapper).toMatchSnapshot();
    });

    test('snapshot testing with is loading', () => {
        const wrapper = render();
        wrapper.setProps({ isLoading: true });
        expect(wrapper).toMatchSnapshot();
    });
    
    test('snapshot testing with an email and password', () => {
        // se renderizara con el botón habilitado
        const credentials = {email: 'Alicia', password: 'password', rememberMe: false}
        const wrapper = render();
        //wrapper.setProps({ isLoading: true });
        const emailField = wrapper.find('.loginForm-field').at(0);
        //console.log(userNameField.debug());
        emailField
            .props()
            .onChange({ target: { name: 'email', value: credentials.email } });
        const passwordField = wrapper.find('.loginForm-field').at(1);
        passwordField
            .props()
            .onChange({ target: { name: 'password', value: credentials.password } });

        const remembermeField = wrapper.find('.loginForm-checkbox');
            remembermeField
                .props()
                .onChange({ target: { name: 'rememberMe', value: credentials.rememberMe } });
    
        expect(wrapper).toMatchSnapshot();
      });

    test('should submit credentials', () => {
        const credentials = {email: 'Alicia', password: 'password', rememberMe: false}
        const wrapper = render();
        const emailField = wrapper.find('.loginForm-field').at(0);
        //console.log(userNameField.debug());
        emailField
            .props()
            .onChange({ target: { name: 'email', value: credentials.email } });
        const passwordField = wrapper.find('.loginForm-field').at(1);
        passwordField
            .props()
            .onChange({ target: { name: 'password', value: credentials.password } });

        const remembermeField = wrapper.find('.loginForm-checkbox');
            remembermeField
                .props()
                .onChange({ target: { name: 'rememberMe', value: credentials.rememberMe } });

        const form = wrapper.find('.loginForm');
        form.simulate('submit', { preventDefault: () => { }});

        expect(wrapper.find('.loginForm-submit').props().disabled).toBe(false);
        expect(props.onSubmit).toHaveBeenCalled();
        expect(props.onSubmit).toHaveBeenCalledWith(credentials);
    });
});