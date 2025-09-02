import Image from "next/image";

export default function FrameTop() {
  return (
    <>
      <Image
        className="absolute top-0 right-0"
        priority
        src="../2.svg"
        alt="2"
        width={80}
        height={80}
      />
      <Image
        className="absolute top-0 left-0 -rotate-90 "
        priority
        src="../2.svg"
        alt="2"
        width={80}
        height={80}
      />
    </>
  );
}
