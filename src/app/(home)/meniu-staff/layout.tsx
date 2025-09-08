import FrameBotton from "@/components/meniu/FrameBotton";
import FrameTop from "@/components/meniu/FrameTop";

const LayoutMeniuStaff = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="py-4 h-screen">
      <FrameTop size={50} />
      {children}
      <FrameBotton size={50} />
    </div>
  );
};

export default LayoutMeniuStaff;
