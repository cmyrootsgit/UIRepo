import DefaultImage from "../assets/profile-image.svg";
import Image1 from "../assets/post-image-1.svg";
import Image2 from "../assets/post-image-2.svg";
import Image3 from "../assets/post-image-3.svg";

// Map userId → image
export const profileImageMap: Record<string, string> = {
  "684f9f3ab5285e1904fd99bc": Image1,
  "5c837dad8d50a808ec5cabdf": Image2,
  "5c8398548d50a80de8491757": Image3,
};

// Helper
export const getProfileImage = (userId?: string): string => {
  return userId ? profileImageMap[userId] || DefaultImage : DefaultImage;
};
