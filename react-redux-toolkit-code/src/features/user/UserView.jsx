import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "./userSlice";

function UserView() {
  const data = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div>
      <br />
      <button onClick={() => dispatch(getUsers())}>Fetch Users</button>
      {data.loading && <div>Loading...</div>}
      {!data.loading && data.error ? <div>Error: {data.error}</div> : null}
      {!data.loading && data.data.length ? (
        <div>
          {data.data.map((user) => (
            <div key={user.id}>{user.name}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default UserView;
