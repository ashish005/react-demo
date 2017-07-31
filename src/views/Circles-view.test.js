/**
 * Created by ashishchaturvedi on 31/07/17.
 */
import React from 'react';
import {shallow, mount} from 'enzyme';
import CirclesView from './Circles-view'

describe('<CirclesView />', () => {
    it('shallow-renders text inside it', () => {
        const wrapper = shallow(<CirclesView />);
        const p = wrapper.find('h2');
        expect(p.text()).toBe('Circles');
    });

    it('should render an `.circleArea`', () => {
        const wrapper = shallow(<CirclesView />);
        expect(wrapper.find('.circleArea').length).toBe(2);
    });

    /*it('should render an `.icon-star`', () => {
        const wrapper = shallow(<MyComponent />);
        expect(wrapper.find('.icon-star')).to.have.length(1);
    });

    it('should render children when passed in', () => {
        const wrapper = shallow((
            <MyComponent>
                <div className="unique" />
            </MyComponent>
        ));
        expect(wrapper.contains(<div className="unique" />)).to.equal(true);
    });

    it('simulates click events', () => {
        const onButtonClick = sinon.spy();
        const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
        wrapper.find('button').simulate('click');
        expect(onButtonClick.calledOnce).to.equal(true);
    });*/
});
/*
test('TodoComponent renders the text inside it', () => {
    const todo = { id: 1, done: false, name: 'Buy Milk' };
    const wrapper = mount(
        <Todo todo={todo} />
    );
    const p = wrapper.find('.toggle-todo');
    expect(p.text()).toBe('Buy Milk');
});*/
