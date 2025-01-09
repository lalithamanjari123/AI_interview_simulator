"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../../lib/redux/store";
import { ResumeForm } from "./_components/ResumeForm";
import { Resume } from "./_components/Resume";

export default function Create() {
  return (
    <Provider store={store}>
      <main className="relative h-screen w-full overflow-hidden bg-gray-50">
        <div className="grid grid-cols-3 md:grid-cols-6 h-full">
          {/* Apply overflow and height styles directly */}
          <div className="col-span-3 h-full overflow-y-auto bg-white">
            <ResumeForm />
          </div>
          <div className="col-span-3 h-full overflow-hidden">
            <Resume />
          </div>
        </div>
      </main>
    </Provider>
  );
}
