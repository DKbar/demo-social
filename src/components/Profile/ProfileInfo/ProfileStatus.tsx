import React, { ChangeEvent } from 'react';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
    
}

type StateType = {
    editMode: boolean,
    status: string
}
class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true,
        });
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    }

    changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: PropsType){
        if (prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            });
        }
    }


    render() {
        return (
            <div>
                {this.state.editMode
                    ? <div>
                        <input value={this.state.status}
                            autoFocus
                            onChange={(e) => this.changeHandler(e)}
                            onBlur={this.deactivateEditMode} />
                    </div>
                    : <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status /* ? this.props.status : "11" */}</span>
                    </div>
                }

            </div>
        )
    }
}

export default ProfileStatus;

