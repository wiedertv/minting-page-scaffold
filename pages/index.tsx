import { ethers } from 'ethers';
import type { NextPage } from 'next'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { MainLayout } from '../Layouts/MainLayout'
import { device } from '../utils/devices';
import { costToMint, idToMint, isSaleActive, mint, mintedPieces } from '../utils/ethers';
import { stringifyANumber } from '../utils/formatter';
import { useCountdown } from '../utils/hooks/useCountdown';
import { getWindowSize } from '../utils/util';

const MintingPage = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media ${device.mobileXS} {
    grid-template-columns: 1fr;
  }
  @media ${device.laptop} {
    grid-template-columns: 1fr 1fr;
  }
  position: relative;
  height: 100%;
  width: 82%;
  align-items: center;
  justify-items: center;
  align-content: center;
  justify-content: center;
  margin: 0 auto;
  `;

const ContainerText = styled.div`
  display: flex;  
  @media ${device.mobileXS} {
    grid-row: 2;
    grid-column: 1;
    width: 100%;
  }
  @media ${device.laptop} {
    grid-column: 1;
    grid-row: 1;
    width: 70%;
  }
  grid-column: 1;
  grid-row: 1;
  flex-direction: column;
  align-items: center;
  min-height: 10vh;
  width: 70%;
  position: relative;
`;
const ContainerVideo = styled.div`
  display: flex;
  @media ${device.mobileXS} {
    grid-row: 1;
    grid-column: 1;
  }
  @media ${device.laptop} {
    grid-column: 2;
    grid-row: 1;
    video {
      max-width: 400px;
      max-height: 800px;
    }
  }
  @media ${device.laptopL} {
    grid-column: 2;
    grid-row: 1;
    video {
      max-width: 450px;
      max-height: 800px;
    }
  }
  @media ${device.desktop} {
    grid-column: 2;
    grid-row: 1;
    video {
      max-width: 500px;
      max-height: 800px;
    }
  }
  @media ${device.desktopL} {
    grid-column: 2;
    grid-row: 1;
    video {
      max-width: 600px;
      max-height: 800px;
    }
  }
  grid-column: 2;
  grid-row: 1;
  flex-direction: column;
  align-items: center;
  min-height: 10vh;
  width: 70%;
  position: relative;
`;

const Title = styled.h1`
  @media ${device.mobileXS} {
    font-size: 3rem;
  }
  @media ${device.tablet} {
    font-size: 4.5rem;
  }
  @media ${device.laptop} {
    font-size: 3.5rem;
  }
  @media ${device.laptopL} {
    font-size: 5.3rem;
  }
  @media ${device.desktop} {
    font-size: 6rem;
  }
  @media ${device.desktopL} {
    font-size: 6rem;
  }
  font-size: 6rem;
  font-weight: bold;
  font-family: 'GandhiSerifBold';
  text-align: center;
  margin: 0;
  color: ${(props) => props.theme.colors.primary};
`;

const Counter = styled.h3`
  @media ${device.mobileXS} {
    font-size: 2.5rem;
  }
  @media ${device.tablet} {
    font-size: 4rem;
  }
  @media ${device.laptop} {
    font-size: 3.5rem;
  }
  @media ${device.laptopL} {
    font-size: 4.2rem;
  }
  @media ${device.desktop} {
    font-size: 5rem;
  }
  @media ${device.desktopL} {
    font-size: 5rem;
  }
  font-size: 5rem;
  font-weight: 400;
  margin: 0;
  text-align: center;
  font-family: 'GandhiSerifRegular';
  color: ${(props) => props.theme.colors.accent};
  small {
    padding: 0;
    line-height: 1;
    font-size: 4rem;
  }
  p{ 
    margin: 0;
  }
`;

const Description = styled.p`
  @media ${device.mobileXS} {
    font-size: 1rem;
  }
  @media ${device.tablet} {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  @media ${device.laptop} {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  @media ${device.laptopL} {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
  @media ${device.desktop} {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  @media ${device.desktopL} {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  font-size: 1.5rem;
  font-weight: 300;
  text-align: center;
  font-family: 'GandhiSerifRegular';
  margin: 0;
  color: ${(props) => props.theme.colors.secondary};
  `;

const MintingWrapper = styled.div`
  @media ${device.mobileXS} {
    margin: 1rem 0 0 0;
  }
  @media ${device.laptop} {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const FormControllerWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  align-items: center;
  width: 100%;
  `;

const FormControllerButton = styled.button`
  font-size: 2.2rem;
  padding: 0 0.7rem;
  margin: 0;
  font-weight: 300;
  text-align: center;
  background: ${(props) => props.theme.backgrounds.offColor};
  border: none;
  color: ${(props) => props.theme.colors.primary};
  border-radius: 100%;
  font-family: 'GandhiSerifRegular';
  &:hover{
    cursor: pointer;
  }
  &:focus{
    outline: none;
  }
`;

const FormControllerInput = styled.input`
  @media ${device.mobileXS} {
    font-size: 1rem;
    width: 15%;
  }
  @media ${device.tablet} {
    font-size: 2rem;  
    width: 15%;
    max-width: 15%;
  }
  @media ${device.laptop} {
    font-size: 2rem;  
    max-width: 15%;
  }
  font-size: 2rem;
  border: 2px solid white;
  border-radius: 7px;
  padding: 0.5rem 0;      
  font-family: 'GandhiSerifRegular';
  margin: 0;
  text-align: center;
  background: transparent;
  color: ${props => props.theme.colors.primary};
  max-width: 15%;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
  -webkit-appearance: none;
    margin: 0;
  }
  &[type=number] {
    -moz-appearance: textfield;
  }
`;
const MintButton = styled.button`
  background: ${props => props.theme.backgrounds.accent};
  color: ${props => props.theme.colors.primary };
  border: 1px solid ${props => props.theme.backgrounds.primary};
  border-radius: 10px;
  width: 50%;
  padding: 0.8rem 2.5rem;
  font-family: 'GandhiSerifRegular';
  margin: 1rem 0.5rem 0 0.5rem;
  font-size: 1.4rem;


  &:hover {
      cursor: pointer;
      opacity: 0.8;
  }

  &:disabled {
      background: #535353;
      opacity: 0.8;
      cursor: not-allowed;
  }
`;

const TotalMinted = styled.h3`
  @media ${device.mobileXS} {
    margin: 1rem 0.5rem 0 0.5rem;
  }
  @media ${device.laptop} {
    margin: 0;
  }
  font-size: 1.3rem;
  font-weight: 300;
  margin: 0;
  font-family: 'GandhiSerifRegular';
  text-align: center;
  padding: 0.7rem 0 0 0;
  margin: 1rem 0.5rem 0 0.5rem;
  color: ${(props) => props.theme.colors.secondary};
`;

const BackgroundSphere = styled.div`
  position: absolute;
  top: 10%;
  left: 0;
  width: 30%;
  height: 30%;
  filter: blur(100px);
  background: ${(props) => props.theme.backgrounds.accent};
  border-radius: 100%;
  animation: BackgroundSphere 28s ease-in-out infinite;

`;

const Home: NextPage<{TARGET_DATE: number}> = ({TARGET_DATE}) => {

  const [days, hours, minutes, seconds] = useCountdown(TARGET_DATE);
  const [{width, height}, setWindowSize] = useState({width: 0, height: 0});
  const [quantity, setQuantity] = useState(0);
  const [totalMinted, setTotalMinted] = useState(0);
  const [costPerPiece, setCostPerPiece] = useState(0);
  const [account, setAccount] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setWindowSize(getWindowSize());

    window.addEventListener('resize', () => setWindowSize(getWindowSize()));

    return () => {
      window.removeEventListener('resize', ()=> setWindowSize(getWindowSize()));
    };
  }, []);

  const setAccountListener = (provider: any) => {
    provider.removeListener("accountsChanged", () => {});
    provider.on("accountsChanged", () => {
      if (!provider.selectedAddress) {
        setAccount(null);
      } 
      else {
        setAccount(provider.selectedAddress);
      }
      });

  };

  useEffect(() => {
    // @ts-ignore
    const { ethereum } = window;
    if(ethereum && account){
      setAccountListener(ethereum);
      mintedPieces().then((respuesta)=>{
        setTotalMinted(Number(respuesta));
      })
      costToMint().then((respuesta)=>{
        setCostPerPiece(Number(respuesta));
      })
      isSaleActive().then((respuesta)=>{
        setIsActive(respuesta);
      })
    }
  }, [account])

  const handleMint = () => {
    mint(quantity);
    mintedPieces().then((respuesta)=>{
      console.log('que hubo',Number(respuesta));
      setTotalMinted(Number(respuesta));
    })
  }


  return (
    <>

      <MainLayout >
        <MintingPage > 
          <ContainerText>
            <Title>Waleska</Title>
            <Counter>
              {
                 minutes > 10 ? (
                  <>
                    <small>
                      Mint starts in:
                    </small>
                    <p>
                      {days}d {hours}:{minutes}:{seconds}
                    </p>
                  </>
                 ):
                 minutes < 0 && seconds < 0 ? (
                  "Mint is Over"
                 ) : (<>
                          <small>
                            Remaining time:
                          </small>
                          <p>
                             00:{minutes < 10 ? "0"+ minutes: minutes}:{seconds < 10 ? "0"+ seconds: seconds}
                          </p>
                      </>)                 
              } 
            </Counter>
            <Description>
              Exclusive Mint of art in collaboration <br/>
              with Waleska for Not Only a JPG.
            </Description>
            <MintingWrapper>
                <FormControllerWrapper>
                  <FormControllerButton
                    onClick={ () => setQuantity((prev) => prev <= 0 ? prev : prev - 1 ) } 
                  >
                    −
                  </FormControllerButton>
                  <FormControllerInput 
                  type="number"
                  readOnly 
                  value={stringifyANumber(quantity)} />
                  <FormControllerButton
                    onClick={ () => setQuantity((prev) => prev >= 30 ? prev : prev + 1 ) } 
                    >
                    +
                  </FormControllerButton>
                </FormControllerWrapper>
                <TotalMinted>
                  {
                    account ? (
                      <>
                        Cost per piece: { costPerPiece/ 10**18 } MATIC
                      </>
                    ) :
                    null
                  }
                </TotalMinted>
                <MintButton 
                  disabled={!isActive || !account}
                  onClick={()=> {
                      handleMint();
                  }}
                  >
                Mint  
              </MintButton>
              <TotalMinted>
                {
                  account ? (
                    <>
                      Minted Pieces: { totalMinted }
                    </>
                  ): null
                }
              </TotalMinted>
            </MintingWrapper>


          </ContainerText>
          <ContainerVideo>
            {width > 0 && height > 0 ? (
              <video 
              style={{"zIndex": 1}} 
              src={require('../utils/assets/video.webm')}  
              width={width > 280 && width < 1024 && width*0.8 || width } 
              height={width > 280 && width < 1024 && height/2 || height } 
              autoPlay 
              loop 
              muted 
            />
            ): null}
          </ContainerVideo>
        </MintingPage>
      </MainLayout>
    </>
  )
}

export default Home;
