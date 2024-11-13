import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import logo1 from "../../assets/images/Oslogo.png";

export const Logo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const fadeNavigation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(-100%)",
    config: {
      duration: 800,
      delay: 100,
    },
  });

  useEffect(() => {
    const loaderDelay = 50;

    // Simulate loading delay with setTimeout
    setTimeout(() => {
      if (inView) {
        setIsVisible(true);
      }
    }, loaderDelay);
  }, [inView]);

  const navigate = useNavigate();
  const [visibleMObile, setVisibleMObile] = useState(false);

  const handleFadeIn = () => {
    setVisibleMObile((pre) => !pre);
    document.body.style.overflow = visibleMObile ? "visible" : "hidden";
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <animated.section
      ref={ref}
      style={fadeNavigation}
      className=" w-full inset-0 top-0 left-0 bottom-0 z-50  h-[92px] bg-white  justify-between p-[15px] mb-40px xl:py-[10px] xl:px-[40px] "
    >
      <Link to="/">
        <img src={logo1} className="w-[70px] md:w-[70px]" alt="" />
      </Link>
    </animated.section>
  );
};
