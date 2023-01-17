import React from "react";
import Image from "next/image";
export const ListgroupUI = ({ items }) => {
  return (
    <div class="flex justify-center flex-col bg-black py-5">
      <div className="title ">
        <h1 className="text-2xl text-white p-2 px-5 font-semibold">Recent Expenses</h1>
      </div>
      <ul class="bg-black rounded-lg  w-full text-slate-100">
        {items.map((item) => (
          <li class="px-4 py-2 w-full">
            <div class="flex flex-row">
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
                    <p className="text-sm text-slate-300">
                      {new Date(item.date * 1000).toUTCString().split(" ").join(" ").split(" ").slice(1, 4).join(" ") }
                    </p>
                  </div>
                </div>
              </div>
              <div className="basis-1/2">
                <div className="flex flex-col flex-end justify-end">
                  <p className="text-xl font-semibold flex-end text-right">-₹{item.budget}</p>
                  {/* <p className="text-sm">
                    {(item.budget / 1000) * 100}% of monthly budget spent
                  </p> */}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
