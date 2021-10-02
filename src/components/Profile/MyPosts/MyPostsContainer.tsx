import { connect } from 'react-redux';
import { actions } from '../../../redux/profile-reducer';
import { AppStateType } from '../../../redux/redux-store';
import MyPosts, { DispatchPropsType, MapPropsType } from './MyPosts';




/* const MyPostsContainer = () => {
    debugger
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState();
                    let addPost = () => {
                        store.dispatch(addPostActionCreator());
                    }
                    let postChange = (text) => {
                        store.dispatch(postChangeActionCreator(text));
                    }
                   return < MyPosts
                        updateNewPostText={postChange}
                        addPost={addPost}
                        postsData={state.profilePage.postsData}
                        newPostText={state.profilePage.newPostText}
                    />
                }


            }
        </StoreContext.Consumer>
    )
} */


const mapStateToProps = (state: AppStateType) => {
    return {
        postsData: state.profilePage.postsData,
    }
}

/* const mapDispatchToProps = (dispatch) => {
    return {

        addPost: (newPost) => {
            dispatch(actions.addPost(newPost))
        }
    }
} */

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {addPost: actions.addPost})(MyPosts);

export default MyPostsContainer;