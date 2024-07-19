import Link from "next/link";
import Image from "next/image";

export default function Title() {
  return (
    <div className="flex justify-center">
      <Link href={"/"}>
        <Image
          src={"/resources/pic/piggiesLogo_3.png"}
          width={400}
          height={400}
          alt="piggiesLogo"
          priority
          className="w-80 md:w-[500px] h-auto p-4"
        />
      </Link>
    </div>
  );
}
