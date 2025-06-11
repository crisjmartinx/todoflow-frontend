"use client";
import React from "react";

export default function page() {
  return (
    <div className="container-items  h-screen">
      <div className="max-w-[1600px] mx-auto">
        <div className="pt-[8rem] px-5">
          <h2 className="text-black font-semibold text-4xl text-center">
            Próximamente!
          </h2>
        </div>
      </div>

      <div
        className="bg-[#ebebebc9] h-auto w-full fixed z-50 bottom-0 "
        style={{ boxShadow: "0px 39px 45px 100px #ebebeb" }}
      ></div>
    </div>
  );
}
