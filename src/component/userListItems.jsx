import { useDispatch } from "react-redux";
import { deleteUser } from "../slices/userslice";
const UserListItems = ({ user }) => {
  const dispatch = useDispatch();

  const handelDelete = (id) => {
    dispatch(deleteUser(id));
  };
  return (
    <div key={user.id} className=" w-[700px] border p-2 rounded overflow-auto">
      <div className="text-[24px] m-2 flex justify-between  border border-black p-2 ">
        <button
          onClick={() => handelDelete(user.id)}
          className="rounded-[100%] bg-red-400 w-[50px] mr-1"
        >
          X
        </button>
        <div> {user.name}</div>
        <div>
          <button className=" bg-blue-700 rounded text-[12px] text-white w-[100px] h-[30px]">
            {" "}
            expand
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserListItems;
