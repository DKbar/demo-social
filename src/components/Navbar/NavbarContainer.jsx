import { connect } from 'react-redux';
import Navbar from './Navbar';
/* import s from './Navbar.module.css' */


let mapStateToProps = (state) => {
    return {
        friends: state.dialogsPage.dialogsData,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
    }
}

const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarContainer;