import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAccount } from 'wagmi';
import { OUTLAW_PERSONALITIES } from '../../constants/textLoopups';
import useOutlawMetadata from '../../hooks/useOutlawMetadata';
import { getIpfsUrl } from '../../utils/getIpfsJson';

const lookup = ['Bottle', 'Casino', 'Gun', 'Horse', 'Saloon'];

export default function OutlawDisplay({ nftId }) {
  const theme = useTheme();

  const { address, isConnecting, isDisconnected } = useAccount();

  const { metadata } = useOutlawMetadata(nftId);

  return (
    <>
      <Box
        sx={{
          backgroundImage: "url('./images/SQUARE 4.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          display: 'block',
          width: 150,
          height: 180,
          padding: 1,
        }}
      >
        {!!metadata && !!metadata?.image && (
          <>
            <a href={getIpfsUrl(metadata.image)}>
              <Box
                as="img"
                src={getIpfsUrl(metadata.image)}
                sx={{ width: '100%' }}
              />
            </a>

            <Typography
              as="p"
              sx={{ paddingTop: '4px', color: '#701C1C', fontSize: 18 }}
            >
              {!!metadata &&
                '#' +
                  nftId +
                  ' ' +
                  OUTLAW_PERSONALITIES[metadata.attributes[2].value]}
            </Typography>
          </>
        )}
      </Box>
    </>
  );
}
