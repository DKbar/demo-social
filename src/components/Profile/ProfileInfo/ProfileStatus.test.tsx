import { create } from 'react-test-renderer'
import ProfileStatus from './ProfileStatus'
import React from 'react'

describe('ProfileStatus component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status='temp' />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('temp');
    })

    test('after creation spans should be displayed', () => {
        const component = create(<ProfileStatus status='temp' />);
        const root = component.root;
        let span = root.findByType('span');
        expect(span).not.toBeNull();
    })

    test('after creation input should not be displayed', () => {
        const component = create(<ProfileStatus status='temp' />);
        const root = component.root;
        expect(()=>{
            let input = root.findByType('input');
        }).toThrow()
    })

    test('span should correct status', () => {
        const component = create(<ProfileStatus status='temp' />);
        const root = component.root;
        let span = root.findByType('span');
        expect(span.children[0] ).toBe('temp');
    })

    test('input should be displayed in editMode', () => {
        const component = create(<ProfileStatus status='temp' />);
        const root = component.root;
        let span = root.findByType('span');
        span.props.onDoubleClick();
        let input = root.findByType('input');
        expect(input.props.value).toBe("temp");
        /* expect(input).not.toBeNull(); */
/*         expect(()=>{
            let span = root.findByType('span');
        }).toThrow() */
    })

    test('callback should be called ', () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status='temp' updateStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    })
})