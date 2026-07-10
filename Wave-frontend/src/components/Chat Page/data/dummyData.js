const dummyData = [
    {
        id: 1,
        name: "Rahul Sharma",
        online: true,
        unread: 2,
        lastMessage: "Let's meet tomorrow.",
        time: "10:40 PM",

        messages: [
            {
                id: 1,
                sender: "other",
                text: "Hey Radhika!",
                time: "10:30 AM",
                seen: true,
            },
            {
                id: 2,
                sender: "me",
                text: "Hi Rahul!",
                time: "10:31 AM",
                seen: true,
            }
        ]
    },

    {
        id: 2,
        name: "Priya Verma",
        online: false,
        unread: 0,
        lastMessage: "😂😂😂",
        time: "9:20 PM",

        messages: [
            {
                id: 1,
                sender: "other",
                text: "Finished the assignment?",
                time: "8:10 PM",
                seen: true,
            }
        ]
    }
];

export default dummyData;