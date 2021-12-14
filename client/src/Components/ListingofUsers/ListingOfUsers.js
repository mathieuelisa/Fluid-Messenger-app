const ListingOfUsers = ({ users }) => {
  return (
    <div>
      {users?.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
};

export default ListingOfUsers;
