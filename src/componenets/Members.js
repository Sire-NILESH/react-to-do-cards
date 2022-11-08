import React, { useState, useEffect } from "react";
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
  const [team, setTeam] = useState([...props.team]);
  const [allUsers, setAllUsers] = useState([...props.team]);

  useEffect(() => {
    setAllUsers(props.allUsers);
    setTeam(props.team);
  }, [props.allUsers, props.team]);
  // const allUsers = props.allUsers;
  // console.log("allusers:", allUsers);
  // const difference = getDifference(allUsers, team);
  var difference;

  if (allUsers?.length > 0 && team?.length > 0)
    difference = getDifference(allUsers, team);
  // const difference = getDifference(allUsers, props.team);
  console.log(difference);

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
            <div className="mb-8 flex">
              <span
                type="button"
                className="h-10 rounded-full bg-green-400/90 px-6 py-2 text-center text-base font-semibold uppercase tracking-widest text-slate-600 transition-colors  md:tracking-[4px]"
              >
                {props.show === "team" ? "Team members" : "All members"}
              </span>
            </div>

            <div className="overflow-y-auto overflow-x-hidden">
              {/*  Members */}
              {props.show === "team" && (
                <MembersList
                  memberList={team}
                  // memberList={props.team}
                  closeHandler={props.closeHandler}
                  type={"remove"}
                />
              )}

              {props.show === "all" && (
                <MembersList
                  memberList={allUsers}
                  teamList={team}
                  // teamList={props.team}
                  closeHandler={props.closeHandler}
                  type={"add"}
                  difference={difference}
                />
              )}
            </div>
          </div>
        </div>
      </CardModal>
    </div>
  );
}

export default Members;
