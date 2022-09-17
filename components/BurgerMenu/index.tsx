import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { bool, func } from 'prop-types';
import styled from 'styled-components';
import { device } from '../../utils/devices';
import Image from 'next/image';
import MetamaskButton from '../MetamaskButton';
import { getWindowSize } from '../../utils/util';


export const StyledBurger = styled.button<{open: boolean}>`
  @media ${device.mobileXS} {
    display: flex;
  }
  @media ${device.laptop} {
    display: none;
  }
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${props => props.theme.backgrounds.accent};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const BurgerWrapper = styled.div`
    @media ${device.mobileXS} {
        display: grid;
    }
    @media ${device.laptop} {
        display: none;
    }
    display: none;
    grid-template-columns: 1fr 1fr;
    min-height: 10vh;
    position: relative;
    z-index: 10;
    align-items: center;
    justify-items: center;
    padding: 1rem 0;
`;

const NavigationMenu = styled.nav<{open: boolean}>`

  @media ${device.laptop} {
    display: none;
  }
  display: flex;
  z-index: 5;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  flex-direction: column;
  justify-content: center;
  background: ${props => props.theme.backgrounds.primary};
  height: 100vh;
  text-align: left;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  
  @media ${device.mobileS} {
    width: 100%;
    display: flex;      
    font-size: 1.5rem;
    text-align: center;
  }
  @media ${device.mobileM} {
    width: 100%;
    display: flex;
  }
  @media ${device.mobileL} {
    width: 100%;
    display: flex;
  }
  @media ${device.tablet} {
    width: 100%;
    display: flex;
  }

  button {
    margin: 0 auto;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    font-family: 'Lato', sans-serif;
    letter-spacing: 0.1rem;
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: color 0.3s linear;
    
    @media ${device.mobileS} {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${props => props.theme.colors.accent};
    }
  }
`;

const Burger = () => {
    const [open, setOpen] = useState(false);
    const [{width, height}, setWindowSize] = useState({width: 0, height: 0});

    useEffect(() => {
      setWindowSize(getWindowSize());
  
      window.addEventListener('resize', () => setWindowSize(getWindowSize()));
  
      return () => {
        window.removeEventListener('resize', ()=> setWindowSize(getWindowSize()));
      };
    }, []);
  return (
    <>     
      <BurgerWrapper>
            <Image src="/images/iso.png" alt='Logo de NOJPG' width={26.5} height={70} />
            <StyledBurger open={open} onClick={() => setOpen(!open)}>
                <div />
                <div />
                <div />
            </StyledBurger>
        </BurgerWrapper>
        <NavigationMenu open={open}>
            { width < 1024 ? <MetamaskButton /> : null }
            <a href="https://notonlyajpg.com/" target={'_blank'} rel="noreferrer">Information</a>

            <a href="https://notonlyajpg.com/terms-conditions/" target={'_blank'} rel="noreferrer">Legal Announcements</a>

            <a href="https://notonlyajpg.com/faq/" target={'_blank'} rel="noreferrer">Frequent Questions</a>
        </NavigationMenu>


    </>
  )
}
export default Burger;