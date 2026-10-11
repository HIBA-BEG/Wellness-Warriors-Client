import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Sidebar from './Sidebar';

function DashboardLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="hidden h-screen w-60 shrink-0 p-3 md:block">
        <Sidebar />
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />
          <div className="relative h-full w-64 max-w-[80vw] p-3">
            <Sidebar onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1 overflow-y-auto">
        <div className="sticky top-0 z-20 flex items-center gap-3 bg-dark-green px-4 py-3 text-white md:hidden">
          <button type="button" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <FaBars />
          </button>
          <span className="font-semibold">Wellness Warriors</span>
        </div>
        {children}
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold text-black sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">{children}</div>
    </div>
  );
}

export default DashboardLayout;
