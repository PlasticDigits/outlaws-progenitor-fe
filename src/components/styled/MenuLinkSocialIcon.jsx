import { useTheme } from '@mui/material';

export default function MenuLinkSocialIcon({
  href,
  src,
  alt,
  width,
  height,
  css,
}) {
  const theme = useTheme();
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      css={{
        paddingTop: '8px',
        '&:hover': {
          borderBottom: 'solid 1px',
          paddingTop: '9px',
          color: theme.palette.primary.light,
        },
        ...css,
      }}
    >
      <img src={src} alt={alt} width={width} height={height} />
    </a>
  );
}
