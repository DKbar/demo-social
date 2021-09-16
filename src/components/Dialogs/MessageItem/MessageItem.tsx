import s from './MessageItem.module.css';

type PropsType = {
    mymessage: boolean
    message: string
}
const MessageItem : React.FC<PropsType> = ({mymessage, message}) => {
    
    
    return (
        
        mymessage
        ? <div className={`${s.item} ${s.i}`}>{message} </div>
        :<div className={`${s.item} ${s.friends}`}>{message} </div>
        


        
    )
}


export default MessageItem;