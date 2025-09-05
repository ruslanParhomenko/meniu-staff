import FrameBotton from "@/components/meniu/FrameBotton";
import FrameTop from "@/components/meniu/FrameTop";

const LayoutMeniuStaff = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <FrameTop size={80} />
      {children}
      <FrameBotton size={80} />
    </>
  );
};

export default LayoutMeniuStaff;
