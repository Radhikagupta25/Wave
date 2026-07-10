import MessageBubble from "./MessageBubble";

const MessageList = ({ chat }) => {
    return (

        <div className="flex-1 overflow-y-auto bg-[#08131F] px-8 py-6">

            <div className="mx-auto flex max-w-5xl flex-col gap-4">

                {chat.messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                    />
                ))}

            </div>

        </div>

    );
};

export default MessageList;