import { useState } from "react";

interface AnnouncementBannerProps {
  isVisibleByDefault?: boolean;
  text?: string;
  position?: "left" | "right" | "center";
}

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({
  isVisibleByDefault = true,
  text = "⚠ This location is currently closed due to inclement weather.",
  position = "center",
}) => {
  const [isVisible, setIsVisible] = useState(isVisibleByDefault);

  if (!isVisible) return null;

  const getPositionClass = () => {
    switch (position) {
      case "left":
        return "justify-start";
      case "right":
        return "justify-end";
      case "center":
      default:
        return "justify-center";
    }
  };

  return (
    <div
      className="bg-[#1E0988] text-white p-3 relative w-full centered-container !py-4 hidden md:block"
      role="alert"
      aria-live="polite"
    >
      <div className={`flex w-full ${getPositionClass()}`}>
        <span className="text-sm font-medium">{text}</span>
      </div>
      <button
        className="absolute right-4 text-white hover:text-gray-300"
        onClick={() => setIsVisible(false)}
        aria-label="Close announcement"
      >
        ✖
      </button>
    </div>
  );
};

export default AnnouncementBanner;
