import { useTheme } from '@emotion/react';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { constants } from 'ethers';
import { parseEther } from 'ethers/lib/utils.js';
import { useState } from 'react';
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import BanditLsdtSwapAbi from '../abi/BanditLsdtSwap.json';
import IERC20Abi from '../abi/IERC20.json';
import FooterArea from '../components/layouts/FooterArea';
import HeaderBar from '../components/layouts/HeaderBar';
import {
  ADDRESS_BANDIT,
  ADDRESS_BANDITLSDTSWAP,
  ADDRESS_LSDT,
} from '../constants/addresses';
import useCountdown from '../hooks/useCountdown';
import { bnToCompact } from '../utils/bnToFixed';

const banditLsdtSwapContract = {
  address: ADDRESS_BANDITLSDTSWAP,
  abi: BanditLsdtSwapAbi,
};

const lsdtContract = {
  address: ADDRESS_LSDT,
  abi: IERC20Abi,
};

const banditContract = {
  address: ADDRESS_BANDIT,
  abi: IERC20Abi,
};

export default function Home() {
  const theme = useTheme();

  const textShadow = `0px 0px 10px ${theme.palette.primary.dark}, 0px 0px 5px ${theme.palette.primary.dark}`;

  const [lsdtValue, setLsdtValue] = useState(parseEther('0'));

  const { address, isConnecting, isDisconnected } = useAccount();

  const {
    data: swapperData,
    isError: swapperIsError,
    isLoading: swapperIsLoading,
  } = useContractReads({
    contracts: [
      {
        ...banditLsdtSwapContract,
        functionName: 'openTimestamp',
      },
      {
        ...banditLsdtSwapContract,
        functionName: 'closeTimestamp',
      },
    ],
  });

  const {
    data: banditTotalSupplyData,
    isError: banditTotalSupplyIsError,
    isLoading: banditTotalSupplyIsLoading,
  } = useContractRead({
    ...banditContract,
    functionName: 'totalSupply',
    watch: true,
  });

  const banditTotalSupply =
    !banditTotalSupplyIsError && !banditTotalSupplyIsLoading
      ? banditTotalSupplyData
      : parseEther('0');

  const {
    data: lsdtBalData,
    isError: lsdtBalIsError,
    isLoading: lsdtBalIsLoading,
  } = useBalance({
    address: address,
    token: ADDRESS_LSDT,
    watch: true,
  });

  const lsdtBal =
    !lsdtBalIsError && !lsdtBalIsLoading ? lsdtBalData?.value : parseEther('0');

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
    data: lsdtAllowanceData,
    isError: lsdtAllowanceIsError,
    isLoading: lsdtAllowanceIsLoading,
  } = useContractRead({
    ...lsdtContract,
    functionName: 'allowance',
    args: [address, ADDRESS_BANDITLSDTSWAP],
    watch: true,
  });

  const lsdtAllowance =
    !lsdtAllowanceIsLoading && !lsdtAllowanceIsError
      ? lsdtAllowanceData
      : parseEther('0');

  const [openTimestamp, closeTimestamp] =
    !swapperIsLoading && !swapperIsError && !!swapperData[0] && !!swapperData[1]
      ? [swapperData[0].toNumber(), swapperData[1].toNumber()]
      : [0, 0];

  const startTimer = useCountdown(openTimestamp, 'Started');
  const endTimer = useCountdown(closeTimestamp, 'Ended');

  const { config: configApproveLsdt } = usePrepareContractWrite({
    ...lsdtContract,
    functionName: 'approve',
    args: [ADDRESS_BANDITLSDTSWAP, constants.MaxUint256],
  });
  const {
    data: dataApproveLsdt,
    error: errorApproveLsdt,
    isLoading: isLoadingApproveLsdt,
    isSuccess: isSuccessApproveLsdt,
    isError: isErrorApproveLsdt,
    write: writeApproveLsdt,
  } = useContractWrite(configApproveLsdt);

  const { config: configBurnLsdt } = usePrepareContractWrite({
    ...banditLsdtSwapContract,
    functionName: 'burnLsdtForBandit',
    args: [lsdtValue, address],
  });
  const {
    data: dataBurnLsdt,
    error: errorBurnLsdt,
    isLoading: isLoadingBurnLsdt,
    isSuccess: isSuccessBurnLsdt,
    isError: isErrorBurnLsdt,
    write: writeBurnLsdt,
  } = useContractWrite(configBurnLsdt);

  return (
    <>
      <HeaderBar
        lsdtBal={bnToCompact(lsdtBal, 18, 5)}
        banditBal={bnToCompact(banditBal, 18, 5)}
      />
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            backgroundImage: "url('./images/plank 1 1.png')",
            maxWidth: '540px',
            width: '90vw',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Box
            as="img"
            src="https://bafybeibs6rfm3f7rhbh4kam5qrgrftbnvlkp35yka2ozrr54mdwoqqhmmq.ipfs.dweb.link/"
            sx={{
              width: '46%',
              margin: '2%',
              background: 'white',
            }}
          />
          <Box
            as="div"
            sx={{
              width: '46%',
              margin: '2%',
              backgroundImage: "url('./images/paper 1.png')",
              backgroundSize: 'cover',
              position: 'relative',
            }}
          >
            <Typography
              as="h3"
              sx={{
                color: '#701C1C',
                marginTop: 1,
                fontSize: { xs: 27, md: 40 },
              }}
            >
              BANDIT #3
            </Typography>
            <Typography
              as="h3"
              sx={{
                color: '#701C1C',
                marginTop: '-10px',
                fontSize: { xs: 16, md: 24 },
              }}
            >
              54 🎭🔫💰🏴‍☠️👤
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                as="img"
                src="./images/girl.png"
                sx={{ width: '33%', display: 'inline-block' }}
              />
              <Typography
                as="h4"
                sx={{
                  display: 'inline-block',
                  fontSize: { xs: 24, md: 36 },
                  lineHeight: 1,
                  color: 'white',
                  WebkitTextStroke: '1px #663810',
                }}
              >
                SALOON{' '}
                {/*Saloon siren, Gun Ghost, Casino Con, Bottle Binger, Horse Hustler */}
                <br />
                SIREN
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#6e1C1C',
                color: '#EFEEA3',
                paddingTop: '1.5px',
                paddingBottom: '0.5px',
                marginTop: '5px',
                fontSize: { xs: '18px', md: '24px' },
              }}
            >
              RECRUIT NOW
            </Button>
          </Box>
        </Box>
        <Typography
          as="h2"
          sx={{
            color: 'white',
            WebkitTextStroke: '1px #663810',
            fontSize: 48,
            paddingTop: 4,
          }}
        >
          YOUR POSSE
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              backgroundImage: "url('./images/SQUARE 4.png')",
              backgroundSize: 'contain',
              display: 'block',
              height: 150,
              width: 150,
              padding: 1,
            }}
          >
            <a href="https://bafybeibs6rfm3f7rhbh4kam5qrgrftbnvlkp35yka2ozrr54mdwoqqhmmq.ipfs.dweb.link/">
              <Box
                as="img"
                src="https://bafybeibs6rfm3f7rhbh4kam5qrgrftbnvlkp35yka2ozrr54mdwoqqhmmq.ipfs.dweb.link/"
                sx={{ width: '100%' }}
              />
            </a>
          </Box>
        </Box>

        <Typography
          as="h2"
          sx={{
            color: 'white',
            WebkitTextStroke: '1px #663810',
            fontSize: 48,
            paddingTop: 4,
            lineHeight: 1,
            marginTop: '100px',
            paddingBottom: '200px',
          }}
        >
          UNLEASH THE BANDIT WITHIN
          <br />
          <Typography
            as="span"
            sx={{
              color: '#663810',
              WebkitTextStroke: '1px #663810',
              fontSize: 48,
              lineHeight: 1,
            }}
          >
            AND MAXIMIZE YOUR GAINS!
          </Typography>
          <Box
            as="img"
            src="./images/GUY GIEL 1.png"
            sx={{ maxWidth: '80vw', float: 'left' }}
          />
        </Typography>
      </Box>
      <FooterArea sx={{ zIndex: 4, position: 'relative' }} />
    </>
  );
}
