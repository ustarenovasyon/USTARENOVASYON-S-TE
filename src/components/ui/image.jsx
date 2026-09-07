import * as React from "react";
import { cn } from "@/lib/utils";

const FALLBACK_IMAGE_URL = "/assets/renovation-placeholder.svg";

const Image = React.forwardRef(({ src, fittingType = "fill", className, onError, ...props }, ref) => {
  const [imgSrc, setImgSrc] = React.useState(src || FALLBACK_IMAGE_URL);

  React.useEffect(() => {
    setImgSrc(src || FALLBACK_IMAGE_URL);
  }, [src]);

  return (
    <img
      ref={ref}
      src={imgSrc}
      className={cn(fittingType === "fit" ? "object-contain" : "object-cover", className)}
      loading={props.loading || "lazy"}
      onError={(event) => {
        if (imgSrc !== FALLBACK_IMAGE_URL) setImgSrc(FALLBACK_IMAGE_URL);
        onError?.(event);
      }}
      {...props}
    />
  );
});
Image.displayName = "Image";

export { Image };
