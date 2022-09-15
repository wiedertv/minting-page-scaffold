import { FC, PropsWithChildren } from "react"
import Head from "next/head"
import { Menu } from "../components/Menu"
import styled from "styled-components"
import { device } from "../utils/devices"
import Image from "next/image"

interface Props {
    title?: string
    description?: string
}

const MainWrapper = styled.main`
  display: flex;
  justify-items: center;
  align-items: center;
  min-height: 83.4vh;
  position: relative;
`

const FooterStyled = styled.footer`
  position: relative;
  z-index: 10;
  min-height: 3vh;
  width: 100vw;
  padding: 1vh   5vw;
  background: ${(props) => props.theme.backgrounds.secondary};
  color: ${(props) => props.theme.colors.secondary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media ${device.mobileXS} {
    flex-direction: column;
    p{
      font-size: 0.8rem;
    }

    @media ${device.laptop} {
      flex-direction: row;
      justify-content: space-between;
      p{
        color: ${(props) => props.theme.colors.offColor};
        font-size: 0.8rem;
      }
}
`


export const MainLayout: FC<PropsWithChildren<Props>> = ({ children, title, description }) => {
  return (
    <> {/* <React.Fragment> */ }
        <Head>
        <title>{ title || 'Not Only a JPG' }</title>
        <meta name="description" content={`${
            description || 
            "Not Only a JPG is a platform for 3d crypto Art."}`
            } />
        <link rel="ico" href="/favicon.ico" />
        </Head>
        <Menu />
        <MainWrapper>
            
            {children}
        
        </MainWrapper>
        


        <FooterStyled>
            <Image src="/images/logo_tipografico.png" alt='Logo Tipografico de Not Only A JPG' width={100} height={50} />
            <p>
              NOJPG is a registered trademark - 2022.
            </p>
        </FooterStyled>
    </>
  )
}
