import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-blur').forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '50px 0px 50px 0px',
      threshold: 0.05,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll('.reveal-blur');

    elements.forEach((el) => observer.observe(el));

    // Fallback: ensure all elements reveal within 1.2s
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal-blur').forEach((el) => el.classList.add('is-revealed'));
    }, 1200);

    return () => {
      clearTimeout(timer);
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}
