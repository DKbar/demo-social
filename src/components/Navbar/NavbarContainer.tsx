import { connect } from 'react-redux';
import { DialogType } from '../../redux/dialogs-reducer';
import { AppStateType } from '../../redux/redux-store';
import Navbar from './Navbar';
/* import s from './Navbar.module.css' */


type MapStateToPropsType = {
    friends: Array<DialogType>

}

type MapDispatchToPropsType = {
    
}


let mapStateToProps = (state: AppStateType) => {
    return {
        friends: state.dialogsPage.dialogsData,
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
    }
}

const NavbarContainer = connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStateType>(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarContainer;