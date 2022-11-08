import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiBadgeCheck } from "react-icons/hi";

function MembersList(props) {
  const { register, handleSubmit, reset } = useForm();
  const [memberList, setMemberList] = useState();
  const [difference, setDifference] = useState();

  useEffect(() => {
    setMemberList(props.memberList);
    setDifference(props.difference);

    return () => {
      setMemberList();
      setDifference();
    };
  }, [props.difference, props.memberList]);

  const onFormSubmitHandler = (data) => {
    const selected = [...data];
    // selected = data.forEach((m) => {
    //   selected.push(m);
    // });
    // props.setFormData(formData);
    reset();
    props.closeHandler();
  };

  if (memberList?.length === 0)
    return (
      <div className="flex h-full min-h-[25vh] w-full items-center justify-center text-3xl font-semibold tracking-widest text-slate-300 dark:text-slate-600 xl:mt-36 xl:ml-20 xl:block">
        No one's here &nbsp; :-(
      </div>
    );

  return (
    <form
      className="space-y-4 px-1"
      onSubmit={handleSubmit(onFormSubmitHandler)}
    >
      <ul className="grid">
        {memberList &&
          memberList?.map((user) => (
            <li
              key={user.userId}
              className="group relative grid grid-cols-8 grid-rows-2 items-center justify-start gap-x-2 rounded-lg px-2 py-2 transition-all duration-200 ease-out hover:bg-purple-100/80 hover:shadow-md hover:shadow-purple-300/40 dark:shadow-none dark:hover:bg-purple-100/10 md:grid-rows-1"
            >
              <img
                src={`users/${user.photoId}.jpg`}
                className="col-start-1 row-span-2 h-8 w-8 rounded-full"
                alt={`${user.userName}`}
              />
              <p className="col-span-4 text-sm font-bold text-slate-500">
                {user.userName}
              </p>
              <p className="col-start-2 row-start-2 text-sm text-slate-400">
                {user.userEmail}
              </p>
              <p className="col-start-6 row-span-2 text-sm text-slate-400  ">
                {user.role}
              </p>

              {props.type === "add" &&
                (difference && difference.includes(user) ? (
                  <input
                    type="checkbox"
                    className="addedMember col-start-8 row-span-2 h-4 w-4 justify-self-center"
                    name={user.userName}
                    value={user.userId}
                    {...register(`${user.userId}`)}
                  />
                ) : (
                  <span className="col-start-8 row-span-2 justify-self-center">
                    {" "}
                    <HiBadgeCheck className=" h-6 w-6 text-green-600 " />{" "}
                  </span>
                ))}

              {props.type === "remove" && (
                <input
                  type="checkbox"
                  className="addedMember col-start-8 row-span-2 h-4 w-4 justify-self-center"
                  name={user.userName}
                  value={user.userId}
                  {...register(`${user.userName}`)}
                />
              )}
            </li>
          ))}
      </ul>

      <div className="mb-8 border-t-2 border-gray-200 dark:border-gray-700"></div>
      <button
        type="submit"
        className="block w-full rounded-full bg-blue-500 p-2 text-center font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-600"
      >
        {props.type === "remove" ? "Remove" : "Add"} members
      </button>
    </form>
  );
}

export default MembersList;
