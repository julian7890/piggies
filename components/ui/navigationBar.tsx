"use client";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavigationBar() {
  const pathname = usePathname();
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress < 0.98) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  });

  return (
    <div
      className={`flex h-16 md:h-20 justify-around md:justify-center md:gap-8 items-center text-md md:text-2xl bg-[#39737C] py-2 sticky top-0 z-10 transition`}
      ref={ref}
    >
      <AnimatePresence mode={"popLayout"}>
        {visible ? (
          <motion.div
            layoutScroll
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeInOut" }}
            className={`relative md:absolute left-2 h-full w-48 md:w-72 pointer-events-none
          `}
          >
            <Image
              src={"/resources/img/piggiesTitle.png"}
              fill
              alt="logo"
              className="h-auto w-auto object-contain"
              sizes="auto"
              priority
            />
          </motion.div>
        ) : (
          ""
        )}
      </AnimatePresence>
      <Link
        href={"/"}
        className={`rounded-xl p-2 md:p-4 hover:bg-[#212E41]/60 ${
          pathname == "/"
            ? "bg-[#212E41] pointer-events-none select-none"
            : "bg-[#212E41]/80"
        }`}
      >
        <div>Stats</div>
      </Link>
      <Link
        href={"/submit"}
        className={`rounded-xl p-2 md:p-4 hover:bg-[#212E41]/60 ${
          pathname == "/submit"
            ? "bg-[#212E41] pointer-events-none select-none"
            : "bg-[#212E41]/80"
        }`}
      >
        <div>Submit Match</div>
      </Link>
    </div>
  );
}
