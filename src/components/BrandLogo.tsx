
type BrandLogoProps = {
  showName?: boolean;
  light?: boolean;
};

export default function BrandLogo({
  showName = true,
  light = true,
}: BrandLogoProps) {
  return (
    <a href="/" className="inline-flex items-center gap-3">
      <svg
        viewBox="0 0 48 48"
        width="42"
        height="42"
        fill="none"
        aria-label="P Technologies symbol"
        role="img"
      >
        <path
          d="M9 39V9H25C34 9 39 14 39 22C39 30 34 35 25 35H19"
          stroke="#438BFF"
          strokeWidth="5"
          strokeLinecap="square"
        />
        <path
          d="M19 35V25H26"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="square"
        />
      </svg>

      {showName && (
        <span
          className={`text-base font-bold tracking-[0.16em] ${
            light ? "text-white" : "text-[#101827]"
          }`}
        >
          P TECHNOLOGIES
        </span>
      )}
    </a>
  );
}
