import React, { ReactNode } from "react";
import Header from "../Header";

interface Props {
  children?: ReactNode
  // any props that come into the component
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header></Header>
      <main className="flex-grow">
        <div className="flex flex-col min-h-[100vh] bg-[#EEEEF0] p-5 gap-10">
          <div className="overflow-hidden w-full h-full flex justify-between lg:flex-row flex-col py-5 px-[28px] md:px-[48px] bg-white rounded-[16px] gap-[100px] lg:gap-10">
            <div>
              {children}
            </div>
          </div>
        </div>
      </main>

    </div>);
}