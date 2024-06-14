import React, { useState } from "react";
import { Label, TextInput, Alert, Spinner } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { IoTrashBinSharp } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import { updateStart, updateSuccess, updateFailed } from "./redux/UserSlice";
import Swal from "sweetalert2";
function DashProfile() {
  const [formData, setFormData] = useState({});

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const updateSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailed(data.message));
      } else {
        dispatch(updateSuccess(data));
        Swal.fire({
          title: "اطلاعات جدیدباموفقیت ثبت شد.",
          icon: "success",
        });
      }
    } catch (error) {
      dispatch(updateFailed(error.message));
    }
  };
  return (
    <>
      <div className="md:flex md:items-stretch md:justify-around w-full">
        <h1 className="font-vazir text-lg text-center p-4">profile</h1>
        <form
          className="flex max-w-md flex-col gap-4 w-[50%] font-vazir m-auto"
          onSubmit={updateSubmit}>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="userna me"
                value="نام کاربری"
                className="font-semibold"
              />
            </div>
            <TextInput
              id="username"
              type="text"
              placeholder="name"
              onChange={handleChange}
              defaultValue={currentUser.username}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="ایمیل" className="font-semibold" />
            </div>
            <TextInput
              id="email"
              type="email"
              onChange={handleChange}
              placeholder="name@gmail.com"
              defaultValue={currentUser.email}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password"
                value="رمز شما"
                className="font-semibold"
              />
            </div>
            <TextInput id="password" type="password" onChange={handleChange} />
          </div>

          <button
            type="submit"
            className="text-white mb-2 bg-purple-600 hover:bg-purple-700 font-vazir  font-medium rounded-lg text-sm py-2.5 px-5 w-full md:w-auto">
            {loading ? (
              <>
                <Spinner size="md" color="purple" />
                <span className="pl-3">در حال ارسال...</span>
              </>
            ) : (
              "به روز رسانی"
            )}
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
          {error && <Alert color="failure">{error}</Alert>}
        </form>
      </div>
    </>
  );
}

export default DashProfile;
