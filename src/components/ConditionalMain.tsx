'use client';

import { usePathname } from 'next/navigation';

interface ConditionalMainProps {
  children: React.ReactNode;
}

const ConditionalMain = ({ children }: ConditionalMainProps) => {
  const pathname = usePathname();
  
  // Don't add padding for admin and dashboard routes
  const shouldAddPadding = !pathname.startsWith('/admin') && !pathname.startsWith('/dashboard');
  
  return (
    <main className={shouldAddPadding ? "pt-24 sm:pt-28 md:pt-32 lg:pt-36" : ""}>
      {children}
    </main>
  );
};

export default ConditionalMain;
