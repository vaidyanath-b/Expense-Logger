
import { ListgroupUI } from "@/Components/ListgroupUI";
import TotalBalanceCard from "@/Components/TotalBalanceCard";
import Logs from "./Logs";

export default function Home() {
 const items = [
   {
     name: "Grocery",
     date: 1624308800,
     image: "https://via.placeholder.com/50x50",
     budget: 50000,
   },
   {
     name: "Rent",
     date: 1624398800,
     image: "https://via.placeholder.com/50x50",
     budget: 100000,
   },
   {
     name: "Insurance",
     date: 1624488800,
     image: "https://via.placeholder.com/50x50",
     budget: 20000,
   },
   {
     name: "Utility Bill",
     date: 1624578800,
     image: "https://via.placeholder.com/50x50",
     budget: 15000,
   },
 ];

  return (
    <div className="flex flex-col overflow-auto sm:p-4 md:p-3 border-x-2 m-1 font-poppins">
      <Logs />
      {/* <TotalBalanceCard/> */}
      <ListgroupUI items={items} />
    </div>
  );
}
