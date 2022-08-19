import React from "react";
import { useForm } from "react-hook-form";
import { HiBadgeCheck } from "react-icons/hi";

function MembersList(props) {
  const { register, handleSubmit, reset } = useForm();

  const onFormSubmitHandler = (data) => {
    console.log(data);
    // props.setFormData(formData);
    reset();
    props.closeHandler();
  };

  return (
    <form
      className="px-1 space-y-4"
      onSubmit={handleSubmit(onFormSubmitHandler)}
    >
      <ul className="grid">
        {props.memberList.map((user) => (
          <li
            key={user.userId}
            className="grid grid-cols-8 items-center justify-start gap-2 rounded-lg px-2 py-2 group hover:bg-purple-100 relative"
          >
            <div className="flex items-center gap-3 col-span-3">
              <img
                src={`users/${user.photoId}.jpg`}
                className="h-8 w-8 rounded-full "
                alt={`${user.userName}`}
              />
              <p className="text-sm text-slate-500 font-bold">
                {user.userName}
              </p>
            </div>
            <p className="text-sm text-slate-400 col-span-3">
              {user.userEmail}
            </p>
            <p className="text-sm text-slate-400 col-span-1">{user.role}</p>

            {props.type === "add" &&
              (props.difference.includes(user) ? (
                <input
                  type="checkbox"
                  className="addedMember h-4 w-4 justify-self-center"
                  name={user.userName}
                  value={user.userId}
                  {...register(`${user.userName}`)}
                />
              ) : (
                <span className="justify-self-center">
                  {" "}
                  <HiBadgeCheck className="w-6 h-6 text-green-600 " />{" "}
                </span>
              ))}

            {props.type === "remove" && (
              <input
                type="checkbox"
                className="addedMember h-4 w-4 justify-self-center"
                name={user.userName}
                value={user.userId}
                {...register(`${user.userName}`)}
              />
            )}
          </li>
        ))}
      </ul>

      <div className="border-t-2 border-gray-200 mb-8"></div>
      <button
        type="submit"
        className="block w-full rounded-full p-2 text-white text-center font-semibold bg-blue-500 hover:bg-blue-600 transition-all duration-300 shadow-lg"
      >
        {props.type === "remove" ? "Remove" : "Add"} members
      </button>
    </form>
  );
}

export default MembersList;
