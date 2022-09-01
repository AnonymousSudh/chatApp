export const MessageBox = props => {
    console.log(props.message);
    return (
        <div id="messageBox">
            <p>{ props.message }</p>
        </div>
    )
}