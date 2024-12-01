import { useSelector } from "react-redux";

import UserListItems from "./userListItems";
const UserList = () => {
  const { userData, isLoading } = useSelector((state) => state.user);


  return (
    <>
      <div>
        <div>
          {userData?.map((data) => {
            return <UserListItems key={data.id} user={data}/>
          })}
        </div>
      </div>
    </>
  );
};
export default UserList;
