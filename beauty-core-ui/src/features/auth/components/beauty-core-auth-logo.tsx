import Image from "next/image";

type BeautyCoreAuthLogoProps = {
  tone?: "adaptive" | "inverse";
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

const DEFAULT_LOGO =
  "/logos/beauty-core-logo-horizontal.webp";

const INVERSE_LOGO =
  "/logos/beauty-core-logo-horizontal-inverse.webp";

function mergeClassNames(
  className: string | undefined,
  themeClassName: string,
) {
  return [className, themeClassName]
    .filter(Boolean)
    .join(" ");
}

export function BeautyCoreAuthLogo({
  tone = "adaptive",
  className,
  width = 220,
  height = 58,
  priority = false,
}: BeautyCoreAuthLogoProps) {
  if (tone === "inverse") {
    return (
      <Image
        src={INVERSE_LOGO}
        alt="Beauty Core"
        width={width}
        height={height}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <>
      <Image
        src={DEFAULT_LOGO}
        alt="Beauty Core"
        width={width}
        height={height}
        priority={priority}
        className={mergeClassNames(
          className,
          "block dark:hidden",
        )}
      />

      <Image
        src={INVERSE_LOGO}
        alt="Beauty Core"
        width={width}
        height={height}
        priority={priority}
        className={mergeClassNames(
          className,
          "hidden dark:block",
        )}
      />
    </>
  );
}
