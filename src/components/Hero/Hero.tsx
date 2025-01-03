"use client";
import { useGSAP } from "@gsap/react";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitText from "@gregoire.ciles/split-text";

import AnimatedShinyText from "../ui/animated-shiny-text";
import Particles from "../ui/particles";
import { useTheme } from "next-themes";
import OrbitingCircles from "../ui/orbiting-circles";
import Image from "next/image";
import TechStack from "./Tech-stack";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blurRef = useRef<HTMLDivElement>(null);
  const words = ["Web Apps", "Sass", "Big Things"];
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");
  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);
  useGSAP(() => {
    // create wrapper element each word

    const elements = words.map((word, index) => {
      const div = document.createElement("div");

      div.textContent = word;
      div.className = `absolute top-2.5 lg:top-4 md:top-3.5 w-full lg:text-4xl  md:text-3xl text-4xl font-itim font-medium ${
        index === 0 && "dark:text-purple-500 text-orange-500"
      } ${index === 1 && "dark:text-sky-500 text-blue-500"} ${
        index === 2 && "dark:text-lime-500 text-green-500 "
      }`;
      containerRef.current?.appendChild(div);
      return div;
    });

    // Create the animation timeline
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.3 });

    elements.forEach((el, index) => {
      const splitText = new SplitText(el);
      tl.from(
        splitText.chars,
        {
          opacity: 0,
          y: 50,
          rotateX: -90,
          stagger: {
            each: 0.05,
            from: "start",
            ease: "power2.inOut",
          },
          duration: 0.5,
          // repeat: -1,
        },
        "<"
      ).to(
        splitText.chars,
        {
          opacity: 0,
          y: -50,
          rotateX: 90,
          stagger: {
            each: 0.05,
            from: "end",
            ease: "expo.inOut",
          },

          delay: 1.2,
          // repeat: -1,
        },
        "<1"
      );
    });

    // Cleanup
    return () => {
      tl.kill();
      elements.forEach((el) => el.remove());
    };
  }, []);
  useGSAP(() => {
    gsap.fromTo(
      ".blur-effect",
      {
        opacity: 0,

        filter: "blur(10px)",
      },
      {
        opacity: 1,

        filter: "blur(0px)",
        duration: 1,
        ease: "power2.inOut",
      }
    );
  }, []);
  return (
    <section className="  flex flex-wrap  lg:justify-between justify-center items-center overflow-hidden  gap-2  w-full h-full lg:h-screen lg:mt-0 mt-10 px-5">
      <div className="space-y-5  lg:w-[45%] w-full  ">
        {/* Shiny Text */}

        <div className="group rounded-full w-56 lg:mx-0 mx-auto border-border bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200  dark:bg-neutral-900 dark:hover:bg-neutral-800">
          <AnimatedShinyText className="inline-flex items-center  w-full justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 font-itim">
            <span className="text-sm lg:text-base">A Top Notch Web Agency</span>
          </AnimatedShinyText>
        </div>

        {/* Title */}

        <div className="flex flex-col place-items-center lg:place-items-start gap-2.5  md:gap-5 ">
          <span className=" lg:text-7xl text-5xl  font-semibold font-josefin-sans blur-effect ">
            Build Your
          </span>

          <div className="flex flex-col lg:flex-row gap-1 lg:gap-3 items-center">
            <span
              ref={blurRef}
              className="lg:text-7xl text-5xl font-semibold font-josefin-sans blur-effect"
            >
              Dream
            </span>

            {/* Animated Words */}

            <div
              ref={containerRef}
              className="relative md:w-44 w-80 lg:text-start text-center h-16   overflow-hidden  blur-effect"
              // style={{ lineHeight: "60px", verticalAlign: "bottom" }}
            />
          </div>

          <span className="lg:text-4xl font-semibold  font-josefin-sans blur-effect">
            With Us 🫂
          </span>
        </div>
      </div>

      {/* <div className="relative flex h-[450px] w-full lg:w-[45%]      flex-col items-center justify-center   overflow-hidden rounded-lg  bg-background ">
        <OrbitingCircles
          className="md:size-[40px] lg:size-[50px] size-[30px] border-none bg-transparent"
          duration={20}
          delay={20}
          radius={80}
        >
          <Icons.figma />
        </OrbitingCircles>
        <OrbitingCircles
          className="md:size-[40px] lg:size-[50px] size-[30px] border-none bg-transparent"
          duration={20}
          delay={10}
          radius={80}
        >
          <Icons.postgres />
        </OrbitingCircles>

        <OrbitingCircles
          className="md:size-[40px] lg:size-[50px] size-[30px] border-none bg-transparent"
          radius={190}
          duration={20}
          reverse
        >
          <Icons.hono />
        </OrbitingCircles>
        <OrbitingCircles
          className="md:size-[40px] lg:size-[50px] size-[30px] border-none bg-transparent"
          radius={190}
          duration={20}
          delay={20}
          reverse
        >
          <Icons.gitHub />
        </OrbitingCircles>
        <OrbitingCircles
          className="md:size-[40px] lg:size-[50px] size-[30px] border-none bg-transparent"
          radius={190}
          duration={20}
          delay={15}
          reverse
        >
          <Icons.openai />
        </OrbitingCircles>

        <OrbitingCircles
          className="md:size-[40px] lg:size-[50px] size-[30px] border-none bg-transparent"
          radius={190}
          duration={20}
          delay={25}
          reverse
        >
          <Icons.supabase />
        </OrbitingCircles>
      </div> */}
      <TechStack />

      {/* Particles background */}

      <Particles
        className="absolute inset-0 w-full"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </section>
  );
};

export default Hero;

const Icons = {
  gitHub: () => (
    <svg width="100" height="100" viewBox="0 0 438.549 438.549">
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      />
    </svg>
  ),
  postgres: () => (
    <Image
      src={"/postgresql.svg"}
      alt="PostgreSQL"
      width={40}
      height={40}
      className=""
    />
  ),
  openai: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="dark:fill-slate-200 fill-slate-800"
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  ),
  hono: () => (
    <Image src={"/hono.svg"} alt="Hono" width={40} height={40} className="" />
  ),

  figma: () => (
    <Image src={"/figma.svg"} alt="Figma" width={40} height={40} className="" />
  ),
  supabase: () => (
    <Image
      src={"/supabase.svg"}
      alt="supabase"
      width={40}
      height={40}
      className=""
    />
  ),
};
