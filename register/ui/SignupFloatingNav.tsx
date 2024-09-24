import React from "react";

interface SignupFloatingNavProps {
  className?: string;
  children?: React.ReactNode; // This allows the component to accept children
}

export const SignupFloatingNav: React.FC<SignupFloatingNavProps> = ({ className, children }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};