import { useState } from "react";
import type { ImgHTMLAttributes } from "react";

type LazyImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  priority?: boolean;
};

export function LazyImage({
  priority = false,
  className = "",
  onLoad,
  onError,
  alt,
  src,
  ...rest
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      // Use high priority for above-the-fold, low otherwise (supported browsers only)
      fetchpriority={priority ? ("high" as any) : ("low" as any)}
      className={[
        "transition-[filter,transform,opacity] duration-500 ease-out",
        loaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-sm scale-[1.02]",
        className,
      ].join(" ")}
      referrerPolicy="no-referrer"
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        setLoaded(true);
        onError?.(e);
      }}
      {...rest}
    />
  );
}
