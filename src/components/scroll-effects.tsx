"use client";

import { useEffect } from "react";

export function ScrollEffects() {
  useEffect(() => {
    document.body.setAttribute("data-effects-ready", "true");
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      document.body.removeAttribute("data-effects-ready");
    };
  }, []);

  return null;
}
