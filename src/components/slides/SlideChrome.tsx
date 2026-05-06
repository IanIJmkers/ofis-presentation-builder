import type { Brand } from '../../types';
import { DEFAULT_LOGO_DARK, DEFAULT_LOGO_WHITE } from '../../brand/assets';

type Props = {
  brand: Brand;
  slideNumber?: string;
  variant?: 'default' | 'dark';
  showTopBar?: boolean;
  showBottomBar?: boolean;
  showLogo?: boolean;
  showSlideNumber?: boolean;
};

export default function SlideChrome({
  brand,
  slideNumber,
  variant = 'default',
  showTopBar = true,
  showBottomBar = true,
  showLogo = true,
  showSlideNumber = true,
}: Props) {
  const useWhiteLogo = variant === 'dark';
  const logoSrc =
    (useWhiteLogo ? brand.logoWhiteDataUrl : brand.logoDataUrl) ??
    (useWhiteLogo ? DEFAULT_LOGO_WHITE : DEFAULT_LOGO_DARK);

  return (
    <>
      {showTopBar && variant !== 'dark' ? <div className="top-bar" /> : null}
      {showBottomBar && variant !== 'dark' ? <div className="bottom-bar" /> : null}
      {showLogo ? (
        <div className="logo" style={variant === 'dark' ? { color: 'white' } : undefined}>
          <img
            src={logoSrc}
            alt={brand.logoText}
            style={brand.logoHeight ? { height: brand.logoHeight } : undefined}
            onError={(e) => {
              // Fallback to the wordmark text if the asset isn't on disk yet
              const img = e.currentTarget;
              img.style.display = 'none';
              const fallback = img.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = 'inline-flex';
            }}
          />
          <span
            style={{
              display: 'none',
              alignItems: 'center',
              gap: 10,
              color: variant === 'dark' ? 'white' : 'var(--primary)',
            }}
          >
            <span
              className="logo-icon"
              style={variant === 'dark' ? { background: 'white' } : undefined}
            />
            {brand.logoText}
          </span>
        </div>
      ) : null}
      {showSlideNumber && slideNumber ? (
        <div className="slide-num">{slideNumber}</div>
      ) : null}
    </>
  );
}
