import React from "react";

interface loginotpFloatingNavProps {
  className?: string;
  children?: React.ReactNode; // This allows the component to accept children
}

export const loginotpFloatingNav: React.FC<loginotpFloatingNavProps> = ({ className, children }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};