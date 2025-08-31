import Image from "next/image";

export default function FrameBotton() {
  return (
    <>
      <Image
        className="absolute bottom-0.5 right-0 rotate-90"
        src="../2.svg"
        alt="2"
        priority
        width={80}
        height={80}
      />
      <Image
        className="absolute bottom-0.5 left-0.5 rotate-180"
        src="../2.svg"
        alt="2"
        priority
        width={80}
        height={80}
      />
    </>
  );
}
