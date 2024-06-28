import React from "react";

function About() {
  return (
    <>
      <h1 className="font-vazir font-bold text-center mt-5 text-xl">
        about blog mern
      </h1>
      <p className="w-[80%] m-auto p-2 text-left mb-16">
        Blog mern is a MERN stack project that the front end part has been
        developed by sabafarzanegan. This project is developed with tailwind css
        ,flowbite react library style ,reduxTlk for managing users and redux
        persist for saving data in localstorage. This project includes dark
        theme, profile managing for user, dashboard part for admin to manage
        users,posts and comments and comment section for each post.
      </p>
    </>
  );
}

export default About;
