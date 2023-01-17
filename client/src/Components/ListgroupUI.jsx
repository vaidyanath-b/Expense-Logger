import React from "react";
import Image from "next/image";
export const ListgroupUI = ({ items }) => {
  return (
    <div className="flex justify-center flex-col bg-white py-5 rounded-t-xl">
      <div className="title ">
        <h1 className="text-2xl text-black p-2 font-semibold">Recent Expenses</h1>
      </div>
      <ul className="bg-white rounded-lg border border-gray-200 w-full text-gray-900">
        {items.map((item) => (
          <li className="px-6 py-2 border-b border-gray-200 w-full">
            <div className="flex flex-row">
              <div className="icon_name basis-1/2">
                <div className="flex flex-row gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                  />
                  <div className="flex flex-col">
                    <h1 className="text-lg font-semibold">{item.name}</h1>
                    <p className="text-sm text-slate-700">
                      {new Date(item.date * 1000).toUTCString().split(" ").join(" ").split(" ").slice(1, 4).join(" ") }
                    </p>
                  </div>
                </div>
              </div>
              <div className="basis-1/2">
                <div className="flex flex-col  justify-end">
                  <p className="text-xl font-semibold">₹{item.budget}</p>
                  <p className="text-sm">
                    {(item.budget / 1000) * 100}% of monthly budget spent
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
