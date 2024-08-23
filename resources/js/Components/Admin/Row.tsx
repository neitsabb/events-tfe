export const Row: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex gap-4 w-full">{children}</div>;
};
