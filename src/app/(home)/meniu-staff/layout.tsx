import FrameBotton from "@/components/meniu/FrameBotton";
import FrameTop from "@/components/meniu/FrameTop";

const LayoutMeniuStaff = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <FrameTop size={40} />
      {children}
      <FrameBotton size={40} />
    </>
  );
};

export default LayoutMeniuStaff;
