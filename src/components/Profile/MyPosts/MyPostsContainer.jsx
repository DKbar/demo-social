import { connect } from 'react-redux';
import { addPost } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';




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


const mapStateToProps = (state) => {
    return {
        postsData: state.profilePage.postsData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        addPost: (newPost) => {
            dispatch(addPost(newPost))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;