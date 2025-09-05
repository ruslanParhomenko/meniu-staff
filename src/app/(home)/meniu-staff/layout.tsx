import FrameBotton from "@/components/meniu/FrameBotton";
import FrameTop from "@/components/meniu/FrameTop";

const LayoutMeniuStaff = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <FrameTop size={60} />
      {children}
      <FrameBotton size={60} />
    </>
  );
};

export default LayoutMeniuStaff;
