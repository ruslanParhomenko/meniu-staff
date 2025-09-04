import Image from "next/image";

export default function FrameBotton({ size }: { size: number }) {
  return (
    <>
      <Image
        className="absolute bottom-0 right-0 rotate-90"
        src="/2.svg"
        alt="2"
        priority
        width={size}
        height={size}
      />
      <Image
        className="absolute bottom-0 left-0 rotate-180"
        src="/2.svg"
        alt="2"
        priority
        width={size}
        height={size}
      />
    </>
  );
}
