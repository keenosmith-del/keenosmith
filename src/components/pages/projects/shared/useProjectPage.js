import { useLayoutEffect, useRef } from "react";
import useScrollFade from "../../../../hooks/useScrollFade.js";

export default function useProjectPage() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const page = ref.current;
    const hero = page.querySelector("article > header");
    hero?.classList.add("project-hero");
    const content = hero?.firstElementChild;
    content?.classList.add("project-hero-content");
    const targets = [content, ...page.querySelectorAll("article > section")].filter(Boolean);
    const footer = page.querySelector(":scope > footer");
    if (footer) targets.push(footer);
    targets.forEach(element => element.setAttribute("data-scroll-fade", ""));
  }, []);
  useScrollFade(ref);
  return ref;
}
