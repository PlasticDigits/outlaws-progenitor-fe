import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { parseEther } from 'ethers/lib/utils.js';
import { useAccount, useBalance, useContractRead } from 'wagmi';
import IERC20Abi from '../abi/IERC20.json';
import IERC721EnumerableAbi from '../abi/IERC721Enumerable.json';
import OutlawDisplay from '../components/elements/OutlawDisplay';
import OutlawMinter from '../components/elements/OutlawMinter';
import FooterArea from '../components/layouts/FooterArea';
import HeaderBar from '../components/layouts/HeaderBar';
import { ADDRESS_BANDIT, ADDRESS_OUTLAWS_NFT } from '../constants/addresses';
import useAccountNfts from '../hooks/useAccountNfts';
import { bnToCompact } from '../utils/bnToFixed';

const banditContract = {
  address: ADDRESS_BANDIT,
  abi: IERC20Abi,
};

export default function Home() {
  const theme = useTheme();

  const { address, isConnecting, isDisconnected } = useAccount();

  const {
    data: banditBalData,
    isError: banditBalIsError,
    isLoading: banditBalIsLoading,
  } = useBalance({
    address: address,
    token: ADDRESS_BANDIT,
    watch: true,
  });

  const banditBal =
    !banditBalIsLoading && !banditBalIsError
      ? banditBalData?.value
      : parseEther('0');

  const {
    data: outlawSupplyData,
    isError: outlawSupplyIsError,
    isLoading: outlawSupplyIsLoading,
  } = useContractRead({
    address: ADDRESS_OUTLAWS_NFT,
    abi: IERC721EnumerableAbi,
    functionName: 'totalSupply',
    watch: true,
  });

  const outlawSupply =
    !outlawSupplyIsLoading && !outlawSupplyIsError
      ? outlawSupplyData
      : parseEther('0');

  const outlawNftIds = useAccountNfts(ADDRESS_OUTLAWS_NFT);

  return (
    <>
      <HeaderBar banditBal={bnToCompact(banditBal, 18, 5)} />
      <Box
        css={{
          position: 'relative',
          backgroundColor: theme.palette.primary.dark,
          backgroundImage: "url('./images/TEXTURE 1.png')",
          backgroundSize: 'contain',
          paddingBottom: '50px',
        }}
      >
        <Typography
          as="h2"
          sx={{
            color: 'white',
            WebkitTextStroke: '1px #663810',
            fontSize: 48,
            paddingTop: 2,
          }}
        >
          RECRUIT OUTLAWS
        </Typography>
        <OutlawMinter nftId={outlawSupply.toString()} />
        <Typography
          as="h2"
          sx={{
            color: '#6E1C1C',
            fontSize: 48,
            paddingTop: 4,
          }}
        >
          YOUR POSSE
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            maxWidth: '1120',
            padding: 1,
            flexWrap: 'wrap',
          }}
        >
          {!!outlawNftIds &&
            outlawNftIds.accountNftIdArray.length > 0 &&
            [...outlawNftIds.accountNftIdArray].map((val, i) => (
              <OutlawDisplay key={val.toString()} nftId={val.toString()} />
            ))}
        </Box>
        <Grid
          container
          spacing={1}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: { xs: 2, md: 5 },
            flexFlow: { xs: 'column-reverse', md: 'row' },
          }}
        >
          <Grid xs={12} md={6} sx={{ textAlign: 'right' }}>
            <Box
              as="img"
              src="./images/GUY GIEL 1.png"
              sx={{ maxWidth: '100%' }}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Typography
              as="h2"
              sx={{
                color: '#6E1C1C',
                fontSize: 36,
                paddingTop: 4,
                lineHeight: 1,
                marginTop: '100px',
                textAlign: 'left',
              }}
            >
              UNLEASH THE BANDIT WITHIN
              <br />
              <Typography
                as="span"
                sx={{
                  color: 'black',
                  fontSize: 36,
                  lineHeight: 1,
                }}
              >
                AND MAXIMIZE YOUR GAINS!
              </Typography>
            </Typography>

            <Typography
              as="div"
              sx={{
                color: '#6E1C1C',
                fontSize: { xs: 16, md: 28 },
                paddingTop: 4,
                lineHeight: 1,
                paddingBottom: '200px',
                textAlign: 'left',
              }}
            >
              BUILD YOUR GANG OF OUTLAWS TO GET HEIST POWER BONUSES.
              <br />
              CHOOSE YOUR PERSONALITIES WISELY!
              <Box
                sx={{
                  display: 'inline-block',
                  backgroundImage: "url('./images/plank 1 1.png')",
                  maxWidth: '540px',
                  color: 'white',
                  WebkitTextStroke: '1px black',
                }}
              >
                <ul>
                  <li>1 OUTLAW: 25% Bonus</li>
                  <li>PAIR (2 SAME PERSONALITY): 50% Bonus</li>
                  <li>3 OF A KIND: 100% Bonus</li>
                  <li>4 OF A KIND: 200% Bonus</li>
                  <li>STRAIGHT (5 DIFFERENT PERSONALITIES): 400% Bonus</li>
                </ul>
              </Box>
              <br />
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <FooterArea sx={{ zIndex: 4, position: 'relative' }} />
    </>
  );
}
