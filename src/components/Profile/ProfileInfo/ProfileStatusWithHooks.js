import React, { useState, useEffect } from 'react';

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
    useEffect(() => {
        setStatus(props.status )
    }, [props.status])
 
    const activateEditMode = () =>{
         setEditMode(true)
    }
    const deactivateEditMode = () =>{
        setEditMode(false);
        props.updateStatus(status);
   }

   const changeHandler = (e) => {
       setStatus(e.target.value)
   }

    return (
        <div>
            {editMode
                ? <div>
                    <input value={status}
                        autoFocus
                        onChange={(e) => changeHandler(e)}
                        onBlur={deactivateEditMode} />
                </div>
                : <div>
                    <span onDoubleClick={activateEditMode}>{props.status ? props.status : "Статус"}</span>
                </div>
            }

        </div>
    )
}


export default ProfileStatusWithHooks;

