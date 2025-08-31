import Image from "next/image";

export default function FrameBotton() {
  return (
    <>
      <Image
        className="absolute bottom-0 right-[-10px] rotate-90"
        src="/2.svg"
        alt="2"
        priority
        width={80}
        height={80}
      />
      <Image
        className="absolute bottom-0 left-[-10px] rotate-180"
        src="/2.svg"
        alt="2"
        priority
        width={80}
        height={80}
      />
    </>
  );
}
