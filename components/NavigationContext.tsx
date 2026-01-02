"use client";

import { createContext, useContext, useState, useLayoutEffect, useRef, ReactNode, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface NavigationContextType {
  isNavigating: boolean;
  navigationComplete: () => void;
}

const NavigationContext = createContext<NavigationContextType>({
  isNavigating: false,
  navigationComplete: () => {}
});

export const useNavigation = () => useContext(NavigationContext);

interface NavigationProviderProps {
  children: ReactNode;
}

function NavigationEvents({ setIsNavigating }: { setIsNavigating: (isNavigating: boolean) => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPathnameRef = useRef<string>(pathname);
  const previousSearchParamsRef = useRef<string>(searchParams.toString());

  // Use useLayoutEffect for synchronous updates before paint
  useLayoutEffect(() => {
    const currentPathname = pathname;
    const currentSearchParams = searchParams.toString();

    // Check if navigation actually occurred
    const pathnameChanged = previousPathnameRef.current !== currentPathname;
    const searchParamsChanged = previousSearchParamsRef.current !== currentSearchParams;

    if (pathnameChanged || searchParamsChanged) {
      // Immediately set navigating state (synchronously, before paint)
      setIsNavigating(true);

      // Scroll to top on route change (unless there's a hash in the URL)
      if (pathnameChanged && !window.location.hash) {
        window.scrollTo(0, 0);
      }

      // Update refs for next comparison
      previousPathnameRef.current = currentPathname;
      previousSearchParamsRef.current = currentSearchParams;

      // Auto-complete after a timeout (fallback)
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams, setIsNavigating]);

  return null; // This component is only for running the effect
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [isNavigating, setIsNavigating] = useState(false);

  const navigationComplete = () => {
    setIsNavigating(false);
  };

  return (
    <NavigationContext.Provider value={{ isNavigating, navigationComplete }}>
      {children}
      <Suspense fallback={null}>
        <NavigationEvents setIsNavigating={setIsNavigating} />
      </Suspense>
    </NavigationContext.Provider>
  );
}