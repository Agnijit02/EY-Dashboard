import { Outlet } from 'react-router-dom';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Header from '../components/layout/Header';
import MobileSidebar from '../components/layout/MobileSidebar';
import Sidebar from '../components/layout/Sidebar';

function DashboardLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F5F5F5] text-[#1A1A1A]">
      <Sidebar />
      <MobileSidebar />

      <div className="flex min-w-0 flex-1 flex-col h-full overflow-hidden">
        <Header />

        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
          <div className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
            <Breadcrumbs />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;