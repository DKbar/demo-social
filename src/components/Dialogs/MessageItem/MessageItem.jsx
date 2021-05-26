import s from './MessageItem.module.css';



const MessageItem = (props) => {
    
    
    return (
        
        props.mymessage
        ? <div className={`${s.item} ${s.i}`}>{props.message} </div>
        :<div className={`${s.item} ${s.friends}`}>{props.message} </div>
        


        
    )
}


export default MessageItem;