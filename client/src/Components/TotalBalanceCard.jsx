import React from 'react'

const TotalBalanceCard = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 pb-10 p-5">
      <div className="text-white text-3xl font-bold">BALANCE</div>
      <div className="text-white text-4xl font-semibold">₹ 1,00,000</div>
      <div className="flex flex-row justify-center gap-16">
        <div className="flex flex-end flex-col p-5  bg-white rounded-lg text-black text-center font-semibold">
          <h1>Income</h1>
          <div className="text-black text-xl font-semibold">₹ 1,00,000</div>
        </div>
        <div className="flex flex-end flex-col p-5 bg-white rounded-lg text-black text-center font-semibold">
          <h1>Expense</h1>
          <div className="text=black text-xl font-semibold">₹ 1,00,00</div>
        </div>
      </div>
    </div>
  );
}

export default TotalBalanceCard