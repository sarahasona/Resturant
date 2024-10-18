import { Outlet } from "react-router-dom"; 
import Sidebar from "../components/Sidebar";

function AccountView() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4"> 
        <Outlet />
      </div>
    </div>
  );
}

export default AccountView;
