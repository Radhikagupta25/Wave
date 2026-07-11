import UserCard from "./UserCard";

const UserList = ({ users, onSelect }) => {

    return (

        <div className="mt-8 space-y-4">

            {users.map(user => (

                <UserCard
                    key={user._id}
                    user={user}
                    onClick={() => onSelect(user)}
                />

            ))}

        </div>

    );

};

export default UserList;