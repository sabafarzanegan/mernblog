import React, { useEffect, useRef, useState } from "react";
import { Label, TextInput, Alert, Spinner, Button } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { IoTrashBinSharp } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import profilelogo from "../asset/image/icons8-user-default-64.png";
import {
  updateStart,
  updateSuccess,
  updateFailed,
  deletuserStart,
  deletuserSuccess,
  deletuserFailed,
  signoutSuccess,
} from "./redux/UserSlice";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { app } from "../firebase";

function DashProfile() {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const pickimage = useRef();
  const [ImageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);

  const handleImgProfile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setImageURL(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (file) {
      uploadImage();
    }
  }, [file]);
  const uploadImage = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageURL(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

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
  const deletUserHandel = async () => {
    try {
      dispatch(deletuserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deletuserFailed(data.message));
      } else {
        dispatch(deletuserSuccess(data));
        Swal.fire({
          title: "حساب کاربری شما حذف شد!",
          icon: "warning",
        });
      }
    } catch (error) {
      dispatch(deletuserFailed(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="md:flex md:items-stretch md:justify-around w-full">
        <h1 className="font-vazir text-lg text-center p-4">profile</h1>
        <form
          className="flex max-w-md flex-col gap-4 w-[50%] font-vazir m-auto"
          onSubmit={updateSubmit}>
          <input
            className="hidden"
            type="file"
            accept="image/*"
            id=""
            onChange={handleImgProfile}
            ref={pickimage}
          />
          <div className="w-32 h-32 m-auto  ">
            <img
              src={imageURL || profilelogo}
              alt=""
              onClick={() => {
                pickimage.current.click();
              }}
              className="rounded-full h-full w-full object-cover cursor-pointer   border-gray-300"
            />
          </div>
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
          {currentUser.isAdmin && (
            <Link to="/create-post">
              <Button gradientDuoTone="purpleToPink" className="w-full">
                ساختن بلاگ
              </Button>
            </Link>
          )}
          <div className="flex items-center justify-between font-vazir">
            <span
              onClick={handleSignout}
              className="text-lg text-red-600 cursor-pointer flex items-center gap-x-1 rounded-md hover:border-red-600 hover:border px-2 py-1 hover:bg-red-600 hover:text-white">
              <HiOutlineLogout />
              خروج
            </span>
            <span
              onClick={deletUserHandel}
              className="text-lg text-red-600 cursor-pointer flex items-center gap-x-1 rounded-md hover:border-red-600 hover:border px-2 py-1 hover:bg-red-600 hover:text-white">
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
