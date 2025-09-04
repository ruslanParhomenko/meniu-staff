import FrameBotton from "@/components/meniu/FrameBotton";
import FrameTop from "@/components/meniu/FrameTop";

const LayoutMeniuStaff = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <FrameTop size={50} />
      {children}
      <FrameBotton size={50} />
    </>
  );
};

export default LayoutMeniuStaff;
