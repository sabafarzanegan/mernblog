import React from "react";
import { Label, TextInput } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { IoTrashBinSharp } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <div className="md:flex md:items-stretch md:justify-around w-full">
        <h1 className="font-vazir text-lg text-center p-4">profile</h1>
        <form className="flex max-w-md flex-col gap-4 w-[50%] font-vazir m-auto">
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="username"
                value="نام کاربری"
                className="font-semibold"
              />
            </div>
            <TextInput
              id="username"
              type="text"
              placeholder="name"
              defaultValue={currentUser.username}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="ایمیل" className="font-semibold" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@gmail.com"
              defaultValue={currentUser.email}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password1"
                value="رمز شما"
                className="font-semibold"
              />
            </div>
            <TextInput id="password1" type="password" />
          </div>

          <button
            type="submit"
            className="text-white mb-2 bg-purple-600 hover:bg-purple-700 font-vazir  font-medium rounded-lg text-sm py-2.5 px-5 w-full md:w-auto">
            به روز رسانی
          </button>
          <div className="flex items-center justify-between font-vazir">
            <span className="text-lg text-red-600 cursor-pointer flex items-center gap-x-1 rounded-md hover:border-red-600 hover:border px-2 py-1 hover:bg-red-600 hover:text-white">
              <HiOutlineLogout />
              خروج
            </span>
            <span className="text-lg text-red-600 cursor-pointer flex items-center gap-x-1 rounded-md hover:border-red-600 hover:border px-2 py-1 hover:bg-red-600 hover:text-white">
              <IoTrashBinSharp />
              حذف اکانت
            </span>
          </div>
        </form>
      </div>
    </>
  );
}

export default DashProfile;
