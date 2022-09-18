import Image from 'next/image';
import React, { memo, useEffect } from 'react'
import styled from 'styled-components'
import { connectToMetamask } from '../../utils/ethers'


const Button = styled.button<{connected?:boolean}>`
    width: 80%;
    background: ${props => props.connected ? '#DDDDDD' : 'transparent'};
    border: 1.2px solid #fff;
    color: ${props => props.connected ? '#000' : '#DDDDDD'};
    border-radius: 11px;
    font-family: 'Lato';
    font-weight: ${props => props.connected ? '500' : '100'};
    padding: 0.5rem 0 ;
    margin: 0;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    div{
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    span{
        position: relative;
        height: 100%;
        display: flex;
        font-size: 1rem;
        align-items: center;
    }
    &:hover{
        scale: 1.05;
        cursor: pointer;
        border: 1.2px solid ${props => props.connected ? '#000' : props.theme.colors.accent};
        color: ${props => props.connected ? '#000' : props.theme.colors.accent};
    }
`;

const MetamaskButton = memo(() => {
    const [isConnected, setIsConnected] = React.useState(false);
    const [account, setAccount] = React.useState(null);
    const [chain, setChain] = React.useState(null);

    useEffect(() => {
        const chainId = 137 // Polygon Mainnet
        // @ts-ignore
        const { ethereum } = window;
        if (ethereum) {
            if(ethereum.selectedAddress !== account){
                setAccount(ethereum.selectedAddress);
            }

            if (ethereum.networkVersion !== chainId) {
                    ethereum.request({
                      method: 'wallet_switchEthereumChain',
                      params: [{ chainId: '0x89' }]
                    }).then().catch((err: any) =>{
                      // This error code indicates that the chain has not been added to MetaMask
                    if (err.code === 4902) {
                      ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                          {
                            chainName: 'Polygon Mainnet',
                            chainId: '0x89',
                            nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
                            rpcUrls: ['https://polygon-rpc.com/']
                          }
                        ]
                      });
                    }
                    console.log(err);
                  });
            }
        }
    }, [account, chain, isConnected]);

    const handleLogin = async () => {
        const {provider} = await connectToMetamask();
        // @ts-ignore
        const metamaskInfo = provider.provider;
        if (provider) {
          setIsConnected(true);
          setAccount(metamaskInfo.selectedAddress);
          setChain(metamaskInfo.chainId);
        }
    }



    const setAccountListener = (provider: any) => {
      console.log('setAccountListener called');
      provider?.removeListener("chainChanged", () => {});
      provider?.removeListener("accountsChanged", () => {});
      provider.on("accountsChanged", () => {
        if (!provider.selectedAddress) {
          setAccount(null);
          setIsConnected(false);
        } 
        else {
          setIsConnected(isConnected);
          setAccount(provider.selectedAddress);
          setChain(provider.chainId);
          setIsConnected(true);
        }
        });
      provider.on("chainChanged", () => {
        console.log('chainChanged called');
          setChain(provider.chainId);
      });
    };



    useEffect(() => {
      // @ts-ignore
      const { ethereum } = window;
        if (ethereum) {
          setAccountListener(ethereum);
          if(ethereum.selectedAddress){
            setAccount(ethereum.selectedAddress);
            setChain(ethereum.chainId);
            setIsConnected(true);
          }
        } else {
          console.error("Please, install Metamask.");
        }
        return () => { 
        ethereum?.removeListener("chainChanged", () => {});
        ethereum?.removeListener("accountsChanged", () => {});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);
   


  return (
    <>
        {!isConnected ? (
                    <Button onClick={() => handleLogin() }> 
                    <div>
                        <Image src="/images/metamask.png" alt='Logo de Metamask' width={30} height={30} />
                    </div>
                    <span>
                         Metamask
                    </span>
                </Button>
        ): (
            <Button 
                onClick={() => {
                      setAccount(null);
                      setChain(null);
                      setIsConnected(false);
                } }
                connected
            > 
                <div>
                    <Image src="/images/metamask_black.png" alt='Logo de Metamask' width={30} height={30} />
                </div>
                <span>
                    Connected
                </span>
            </Button>
        )}
    </>
  )
});

MetamaskButton.displayName = 'MetamaskButton';


export default MetamaskButton;
