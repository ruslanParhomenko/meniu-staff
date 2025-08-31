import Image from "next/image";
export default function Footer() {
  return (
    <footer className="flex flex-col gap-9 items-center justify-center py-7">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://casino-nuovo.md/"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/nova-casino.svg"
          alt="casino"
          width={16}
          height={16}
        />
        go to casino.md →
      </a>
    </footer>
  );
}
