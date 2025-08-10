
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const useNavigation = (navLinks: string[]) => {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    // If the path is not the root, set the active ID based on the path.
    // This is for pages like /sobre
    if (pathname !== '/') {
        setActiveId(pathname);
        return;
    }
    
    // For the root path, handle scroll-based active state.
    setActiveId('#hero'); // Default for top of the page

    const handleScroll = () => {
      // Create an array of IDs from the nav links that are section links.
      const sectionIds = navLinks.map(link => link.startsWith('#') ? link.substring(1) : null).filter(Boolean) as string[];

      let currentSectionId = '';
      
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section is in the viewport (with a 150px offset from the top).
          if (rect.top <= 150) {
            currentSectionId = `#${id}`;
          }
        }
      }

      // If no section is in view at the top, check if we're at the very top of the page.
      if (window.scrollY < 200 && currentSectionId === '') {
        setActiveId('#hero') // A default or home link.
      } else {
        setActiveId(currentSectionId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Cleanup the event listener on component unmount.
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, navLinks]);

  return activeId;
};

export default useNavigation;
