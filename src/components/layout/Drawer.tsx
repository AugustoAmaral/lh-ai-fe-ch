import { ReactNode } from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Drawer({ isOpen, onClose, children }: DrawerProps) {
  return (
    <>
      <aside
        className={`
          fixed inset-y-0 right-0 z-20 w-full sm:w-96 lg:w-[420px]
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        aria-label="Citation details"
        aria-hidden={!isOpen}
      >
        <div className="h-full bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 shadow-xl flex flex-col overflow-hidden transition-colors">
          {children}
        </div>
      </aside>

      <div
        className={`
          fixed inset-0 bg-slate-900/50 dark:bg-slate-950/70 z-10 transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
        aria-hidden="true"
      />
    </>
  );
}
