import { endpoints } from "@/constants/viewport";
const getViewport = () => {
  let result;

  const width =
    typeof window === "object"
      ? window?.innerWidth || document?.body?.clientWidth
      : 0;
  const height =
    typeof window === "object"
      ? window?.innerHeight || document?.body.clientHeight
      : 0;
  // |0px     600px    960px    1280px   1920px
  if (width > endpoints.lg) {
    result = {
      name: "desktop",
      isDesktop: true,
      isTablet: false,
      isMobile: false,
      height: height,
      width: width,
    };
  } else if (width > endpoints.md) {
    result = {
      name: "tablet",
      isDesktop: false,
      isTablet: true,
      isMobile: false,
      height: height,
      width: width,
    };
  } else {
    result = {
      name: "mobile",
      isDesktop: false,
      isTablet: false,
      isMobile: true,
      height: height,
      width: width,
    };
  }

  if (height > 900) {
    result.name += "-high";
  } else {
    result.name += "-small";
  }

  return result;
};

export default getViewport;
