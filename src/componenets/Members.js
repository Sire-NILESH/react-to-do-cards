import React, { useState } from "react";
import CardModal from "./CardModal";
import MembersList from "./MembersList";

function getDifference(array1, array2) {
  return array1.filter((object1) => {
    return !array2.some((object2) => {
      return object1.userId === object2.userId;
    });
  });
}

function Members(props) {
  const [selectedUsers, setSelectedUsers] = useState([...props.team]);
  const allUsers = props.allUsers;
  // console.log("allusers:", allUsers);
  const difference = getDifference(allUsers, props.team);
  console.log(difference);

  const addAUser = (user) => {
    const i = selectedUsers.findIndex((u) => u.userId === user.userId);
    if (i === -1) {
      setSelectedUsers((prevState) => [user, ...prevState]);
    } else {
      return;
    }
  };

  const removeAUser = (user) => {
    const i = selectedUsers.findIndex((u) => u.userId === user.userId);
    if (i >= 0) {
      selectedUsers.splice(i, 1);
      setSelectedUsers([...selectedUsers]);
    }
    return;

    // setSelectedUsers((prevState) => {
    //   const i = prevState.findIndex((u) => u.userId === user.userId);
    //   console.log(i);
    //   prevState.splice(i, 1);
    //   console.log("prevState", prevState);
    //   return prevState;
    // });
  };

  console.log(selectedUsers);

  return (
    <div>
      <CardModal
        title="Members"
        openHandler={props.openHandler}
        closeHandler={props.closeHandler}
        isOpen={props.isOpen}
        variant="short"
      >
        <div className="flex flex-col gap-8">
          <div>
            <div className="flex mb-8">
              <span
                type="button"
                className="uppercase font-semibold text-base tracking-widest md:tracking-[4px] text-slate-600 bg-green-300 px-6 py-2 h-10 rounded-full transition-colors text-center"
              >
                {props.show === "team" ? "Team members" : "All members"}
              </span>
            </div>

            {/* <div className="mb-6">
              <p className="text-sm text-slate-500">
                {props.show === "team"
                  ? "Select to remove members from the Team"
                  : "Select to add members to Team"}
              </p>
            </div> */}

            <div className="overflow-auto">
              {/*  Members */}
              {props.show === "team" && (
                <MembersList
                  memberList={props.team}
                  closeHandler={props.closeHandler}
                  functionality={removeAUser}
                  type={"remove"}
                />
              )}

              {props.show === "all" && (
                <MembersList
                  memberList={allUsers}
                  teamList={props.team}
                  closeHandler={props.closeHandler}
                  functionality={addAUser}
                  type={"add"}
                  difference={difference}
                />
              )}
              {/* <MembersList
              memberList={memberList}
              functionality={
                memberList === selectedUsers ? removeAUser : addAUser
              }
              type={memberList === selectedUsers ? "remove" : "add"}
            /> */}
            </div>
          </div>
        </div>
      </CardModal>
    </div>
  );
}

export default Members;
