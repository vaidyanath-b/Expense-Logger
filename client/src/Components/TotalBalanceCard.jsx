import React from 'react'

const TotalBalanceCard = () => {
  return (
    <div
      className="flex flex-col flex-start  bg-gray-500  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 
 gap-8 pb-10 p-5 rounded-3xl m-5"
    >
      <div className="text-white text-3xl font-bold">BALANCE</div>
      <div className="text-white text-4xl font-semibold">₹ 1,00,000</div>
      <div className="flex flex-row justify-between gap-16">
        <div className="flex flex-end flex-col p-5  rounded-lg text-white text-center font-semibold">
          <h1>Income</h1>
          <div className="text-white text-xl font-semibold">₹ 1,00,000</div>
        </div>
        <div className="flex flex-end flex-col p-5  rounded-lg text-white text-center font-semibold">
          <h1>Expense</h1>
          <div className="text=black text-xl font-semibold">₹ 1,00,00</div>
        </div>
      </div>
    </div>
  );
}

export default TotalBalanceCard