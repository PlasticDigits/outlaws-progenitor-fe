import { useTheme } from '@emotion/react';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { BigNumber, constants } from 'ethers';
import { parseEther } from 'ethers/lib/utils.js';
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import IERC20Abi from '../../abi/IERC20.json';
import OutlawsProgenitorMintAbi from '../../abi/OutlawsProgenitorMint.json';
import {
  ADDRESS_BANDIT,
  ADDRESS_OUTLAWS_PROGENITOR_MINT,
} from '../../constants/addresses';
import { OUTLAW_PERSONALITIES } from '../../constants/textLoopups';
import useCountdown from '../../hooks/useCountdown';
import useOutlawMetadata from '../../hooks/useOutlawMetadata';
import { getIpfsUrl } from '../../utils/getIpfsJson';
import TxStatus from './TxStatus';

const lookup = ['Bottle', 'Casino', 'Gun', 'Horse', 'Saloon'];

export default function OutlawMinter({ nftId }) {
  const theme = useTheme();

  const { address, isConnecting, isDisconnected } = useAccount();

  const { metadata } = useOutlawMetadata(nftId);

  const startTimer = useCountdown(1684476000, 'OPEN');

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
    data: banditAllowanceData,
    isError: banditAllowanceIsError,
    isLoading: banditAllowanceIsLoading,
  } = useContractRead({
    address: ADDRESS_BANDIT,
    abi: IERC20Abi,
    functionName: 'allowance',
    args: [address, ADDRESS_OUTLAWS_PROGENITOR_MINT],
    watch: true,
  });

  const banditAllowance =
    !banditAllowanceIsLoading && !banditAllowanceIsError
      ? banditAllowanceData
      : parseEther('0');

  const { config: configApproveBandit } = usePrepareContractWrite({
    address: ADDRESS_BANDIT,
    abi: IERC20Abi,
    functionName: 'approve',
    args: [ADDRESS_OUTLAWS_PROGENITOR_MINT, constants.MaxUint256],
  });
  const {
    data: dataApproveBandit,
    error: errorApproveBandit,
    isLoading: isLoadingApproveBandit,
    isSuccess: isSuccessApproveBandit,
    isError: isErrorApproveBandit,
    write: writeApproveBandit,
  } = useContractWrite(configApproveBandit);

  const { config: configMintOutlaw } = usePrepareContractWrite({
    address: ADDRESS_OUTLAWS_PROGENITOR_MINT,
    abi: OutlawsProgenitorMintAbi,
    functionName: 'mint',
    args: [],
    overrides: {
      gasLimit: 200000,
    },
  });
  const {
    data: dataMintOutlaw,
    error: errorMintOutlaw,
    isLoading: isLoadingMintOutlaw,
    isSuccess: isSuccessMintOutlaw,
    isError: isErrorMintOutlaw,
    write: writeMintOutlaw,
  } = useContractWrite(configMintOutlaw);

  return (
    <>
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
        {!!metadata && !!metadata?.image && (
          <Box
            as="img"
            src={getIpfsUrl(metadata.image)}
            sx={{
              width: '46%',
              margin: '2%',
              background: 'white',
            }}
          />
        )}
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
              fontSize: { xs: 25, md: 38 },
            }}
          >
            OUTLAW #{nftId}
          </Typography>
          <Typography
            as="h3"
            sx={{
              color: '#701C1C',
              marginTop: '-10px',
              fontSize: { xs: 16, md: 24 },
            }}
          >
            {50 + Number(nftId) * 2} 🎭🔫💰🏴‍☠️👤
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
              src={
                !!metadata
                  ? `./images/trait-${metadata.attributes[2].value}.png`
                  : undefined
              }
              sx={{
                width: '35%',
                display: 'inline-block',
                paddingLeft: 2,
              }}
            />
            <Typography
              as="h4"
              sx={{
                display: 'inline-block',
                fontSize: { xs: 24, md: 36 },
                lineHeight: 1,
                color: 'white',
                WebkitTextStroke: '1px #663810',
                paddingRight: 2,
              }}
            >
              {!!metadata && OUTLAW_PERSONALITIES[metadata.attributes[2].value]}
            </Typography>
          </Box>
          {startTimer == 'OPEN' ? (
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
              onClick={() => {
                if (banditAllowance?.lt(banditBal ?? BigNumber.from(0))) {
                  //approve
                  writeApproveBandit();
                } else {
                  //Burn
                  writeMintOutlaw();
                }
              }}
            >
              RECRUIT NOW
            </Button>
          ) : (
            <Typography
              as="p"
              sx={{
                color: 'white',
                WebkitTextStroke: '1px #663810',
                fontSize: { xs: '18px', md: '24px' },
              }}
            >
              {startTimer}
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ color: '#6E1C1C' }}>
        Approve Status:{' '}
        {banditAllowance?.gte(banditBal ?? BigNumber.from(0)) ? (
          <Typography as="span" sx={{ color: 'black' }}>
            OK
          </Typography>
        ) : (
          <Typography as="span" sx={{ color: 'black' }}>
            Click "Recruit Outlaw" to approve
          </Typography>
        )}
        <TxStatus
          isLoading={isLoadingApproveBandit}
          isSuccess={isSuccessApproveBandit}
          isError={isErrorApproveBandit}
          txHash={dataApproveBandit?.hash}
          errMsg={errorApproveBandit?.message}
        />
        <br />
        Recruit Tx Info:{' '}
        <TxStatus
          isLoading={isLoadingMintOutlaw}
          isSuccess={isSuccessMintOutlaw}
          isError={isErrorMintOutlaw}
          txHash={dataMintOutlaw?.hash}
          errMsg={errorMintOutlaw?.message}
        />
      </Box>
    </>
  );
}
