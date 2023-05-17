import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { useWeb3Modal } from '@web3modal/react';
import makeBlockie from 'ethereum-blockies-base64';
import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';

function HeaderBar({ lsdtBal, banditBal }) {
  const theme = useTheme();

  const {
    isOpen: web3ModalIsOpen,
    open: web3ModalOpen,
    close: web3ModalClose,
  } = useWeb3Modal();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background:
            'linear-gradient(180deg, rgba(0,107,213,1) 10%, rgba(0,211,192,1) 90%)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: 'center',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box as="a" sx={{ paddingRight: 1 }} href="./">
              <Box
                as="img"
                src="./logo.png"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  maxWidth: 80,
                  transition: '.25s ease-in-out',
                  '&:hover': { transform: 'rotate(-4deg)' },
                }}
              />
            </Box>
            <Box>
              <Typography as="h1">
                <Typography
                  as="span"
                  sx={{
                    fontSize: { xs: 48, md: 64 },
                    color: '#FF7900',
                    WebkitTextStroke: '1px #7F2100',
                  }}
                >
                  THE{' '}
                </Typography>
                <Typography
                  as="span"
                  sx={{
                    fontSize: { xs: 48, md: 64 },
                    color: '#FFF300',
                    WebkitTextStroke: '1px #7F2100',
                  }}
                >
                  OUTLAWS
                </Typography>
              </Typography>
              <Typography
                as="h2"
                sx={{
                  marginTop: '-20px',
                  fontSize: 35,
                  color: '#05FF00',
                  WebkitTextStroke: '1px #037F00',
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                AN LSDT NFT COLLECTION
              </Typography>
            </Box>
            <Box>
              {!!address && (
                <Tooltip title="Your Bandits">
                  <Typography>
                    <Typography
                      as="span"
                      sx={{ WebkitTextStroke: '1px #472f21', fontSize: 28 }}
                    >
                      {banditBal}🎭🔫
                    </Typography>
                  </Typography>
                </Tooltip>
              )}

              <Box>
                {!!address ? (
                  <>
                    <Tooltip title="Open Wallet Settings">
                      <Button
                        onClick={web3ModalOpen}
                        sx={{
                          width: '9em',
                          textTransform: 'unset',
                          color: 'white',
                          fontSize: 28,
                          WebkitTextStroke: '1px #472f21',
                        }}
                      >
                        <Avatar
                          alt={address}
                          src={makeBlockie(address)}
                          sx={{
                            mr: 1,
                            height: 'auto',
                            width: '0.9em',
                            border: 'solid 1px white',
                          }}
                        />
                        0x...{address.substring(38)}
                      </Button>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Tooltip title="Login Your Wallet">
                      <Button
                        onClick={web3ModalOpen}
                        sx={{
                          width: '9em',
                          fontWeight: 'bold',
                          color: 'white',
                          WebkitTextStroke: '1px #472f21',
                          fontSize: 28,
                        }}
                      >
                        Connect{' '}
                        <Box
                          as="img"
                          src="./images/CONNECT.png"
                          sx={{
                            display: 'inline-block',
                            maxWidth: 28,
                            marginLeft: 1,
                            position: 'relative',
                            top: '-3px',
                          }}
                        />
                      </Button>
                    </Tooltip>
                  </>
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>
        <Box sx={{ height: 32, position: 'relative', overflow: 'none' }}>
          <Box
            as="img"
            src="./images/Vector 1.png"
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
            }}
          />
          <Box
            as="img"
            src="./images/BUILDING 2.png"
            sx={{
              position: 'absolute',
              left: 5,
              bottom: 3,
              width: '20vw',
              maxWidth: 100,
            }}
          />
          <Box
            as="img"
            src="./images/CACTUS 1.png"
            sx={{
              position: 'absolute',
              left: '22vw',
              bottom: '2vw',
              width: '7vw',
              maxWidth: 30,
            }}
          />
          <Box
            as="img"
            src="./images/horse-set.png"
            sx={{
              position: 'absolute',
              right: '5vw',
              bottom: '1.5vw',
              width: 100,
            }}
          />
        </Box>
      </AppBar>
    </>
  );
}
export default HeaderBar;
