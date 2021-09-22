
import profileReducer, { actions } from './profile-reducer';

let state = {
    postsData: [
        { id: 0, message: 'Hi', likesCount: 14 },
        { id: 1, message: 'It\'s my first post', likesCount: 18 }
    ]
}

test('length of post should be increment', () => {
    let action = actions.addPost('test');

    let newState = profileReducer (state, action);

    expect(newState.postsData.length).toBe(3);
});


test('post should be test', () => {
    let action = actions.addPost('test');
    let newState = profileReducer (state, action);

    expect(newState.postsData[2].message).toBe('test')
});

test('after deleting length of post should be decrement', () => {
    let action = actions.deletePost(1);
    let newState = profileReducer (state, action);

    expect(newState.postsData.length).toBe(1);
});