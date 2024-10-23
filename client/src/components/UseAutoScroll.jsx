import React, { useEffect } from "react";

const UseAutoScroll = ({ containerRef }) => {
  useEffect(() => {
    const container =
      containerRef && containerRef.current ? containerRef.current : "";

    if (!container) return;

    const originalScrollPosition = container.scrollTop;
    const originalScrollHeight = container.scrollHeight;

    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 50
      ) {
        container.scrollTo({
          top: originalScrollPosition,
          behavior: "smooth",
        });
      }
    };

    // Observe the last message item
    const lastMessageItem = container.querySelector(".message-item:last-child");
    if (lastMessageItem) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            handleScroll();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(lastMessageItem);

      return () => {
        observer.disconnect();
      };
    }

    // Fallback: Observe the entire container
    const containerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleScroll();
        }
      },
      { threshold: 0.1 }
    );

    containerObserver.observe(container);

    return () => {
      containerObserver.disconnect();
    };
  }, []);

  return null;
};

export default UseAutoScroll;
