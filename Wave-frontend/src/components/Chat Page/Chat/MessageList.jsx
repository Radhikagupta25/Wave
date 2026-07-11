import MessageBubble from "./MessageBubble";

const MessageList = ({ messages }) => {
    return (
        <div className="relative flex-1 overflow-y-auto bg-[#08131F] px-8 py-6">

            <div
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{
                    backgroundImage: "url('/waves-bg.jpg')",
                }}
            />

            <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-4">

                {messages.map((message) => (
                    <MessageBubble
                        key={message._id}
                        message={message}
                    />
                ))}

            </div>

        </div>
    );
};

export default MessageList;