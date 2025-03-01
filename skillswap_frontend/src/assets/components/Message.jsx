function Message(props) {
    const sender = props.msg.sender.id== localStorage.getItem("user_id"); // Fixed comparison

    return (
        <div className={`flex ${sender ? "justify-end" : "justify-start"} my-2`}>
            <div className="w-fit bg-gray-700 py-4 px-6 text-lg border-none rounded-xl text-white">
                {props.msg.content}
            </div>
        </div>
    );
}

export default Message;
