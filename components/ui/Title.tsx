import Link from "next/link";
import Image from "next/image";
import title from "@/public/resources/img/piggiesTitle.png";

export default function Title() {
  return (
    <div className="flex justify-center">
      <Link href={"/"}>
        <Image
          src={title}
          width={700}
          height={700}
          alt="piggiesLogo"
          priority
          className="w-96 md:w-[700px] h-auto p-4"
        />
      </Link>
    </div>
  );
}
