import Link from "next/link";
import Image from "next/image";
import title from "@/public/resources/img/piggieslogo_5.png";

export default function Title() {
  return (
    <div className="flex justify-center">
      <Link href={"/"}>
        <Image
          src={title}
          width={400}
          height={400}
          alt="piggiesLogo"
          priority
          className="w-96 md:w-[500px] h-auto p-4"
        />
      </Link>
    </div>
  );
}
