type LoaderProps = {
  label?: string;
};

export default function Loader({ label = "Loading..." }: LoaderProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm dark:bg-gray-950/70"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-lg dark:bg-gray-900">
        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-white" />
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </span>
      </div>
    </div>
  );
}
