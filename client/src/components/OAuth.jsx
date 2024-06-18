import React from "react";
import { Button } from "flowbite-react";
import { FaGoogle } from "react-icons/fa";

function OAuth() {
  const handelGoogle = async () => {};
  return (
    <Button
      onClick={handelGoogle}
      gradientMonochrome="purple"
      outline
      className="w-full ">
      <span className="font-vazir text-md font-bold flex items-center justify-center gap-x-1">
        ورود با حساب گوگل
        <FaGoogle />
      </span>
    </Button>
  );
}

export default OAuth;
