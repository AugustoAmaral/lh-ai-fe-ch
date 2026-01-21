export function LoadingState() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 relative">
          <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
          Loading Brief
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Verifying citations...
        </p>
      </div>
    </div>
  );
}
