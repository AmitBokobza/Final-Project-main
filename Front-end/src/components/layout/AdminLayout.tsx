import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";

interface AdminLayoutProps {
    
}
 
const AdminLayout: FunctionComponent<AdminLayoutProps> = () => {
    return (
        <>
        <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
        </>
      );
}
 
export default AdminLayout;