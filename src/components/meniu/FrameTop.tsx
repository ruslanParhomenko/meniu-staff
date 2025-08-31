import Image from "next/image";

export default function FrameTop() {
  return (
    <>
      <Image
        className="absolute top-0.5 right-0.5"
        priority
        src="../2.svg"
        alt="2"
        width={80}
        height={80}
      />
      <Image
        className="absolute top-0.5 left-0.5 -rotate-90 "
        priority
        src="../2.svg"
        alt="2"
        width={80}
        height={80}
      />
    </>
  );
}
