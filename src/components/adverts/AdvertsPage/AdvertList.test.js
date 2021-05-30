import React from 'react';
import { shallow } from 'enzyme';

import AdvertList from './AdvertsList';

describe('AdvertList', () => {
    const props = {
        adverts: []
    };
    
    const render = () => shallow(<AdvertList {...props} />);

    test('should render', () => {
        const wrapper = render();
        //console.log(wrapper.debug());
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('ul').props().className).toBe('advertsList');

    });

    test('snapshot testing', () => {
        const wrapper = render();
        expect(wrapper).toMatchSnapshot();
    });
});