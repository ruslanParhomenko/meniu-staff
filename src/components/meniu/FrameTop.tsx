import Image from "next/image";

export default function FrameTop({ size }: { size: number }) {
  return (
    <>
      <Image
        className="absolute top-0 right-0 rotate-180"
        priority
        src="/bottom.png"
        alt="2"
        width={size}
        height={size}
      />
      {/* <Image
        className="absolute top-0 left-0"
        priority
        src="/top.png"
        alt="2"
        width={size}
        height={size}
      /> */}
    </>
  );
}
