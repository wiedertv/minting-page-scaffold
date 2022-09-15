import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { device } from '../../utils/devices';
import { getWindowSize } from '../../utils/util';
import Burger from '../BurgerMenu';
import MetamaskButton from '../MetamaskButton';

const NavigationBar = styled.nav`
  @media ${device.mobileXS} {
    display: none;
  }
  @media ${device.laptop} {
    display: grid;
  }
  display: grid;
  min-height: 10vh;
  position: relative;
  z-index: 10;
  align-items: center;
`;

const Items = styled.ul`
  padding: 0;
  margin: 0;
  justify-self: center;
  align-items: center;
  font-family: Lato;
  font-weight: 100;
  font-size: 1.1rem;
  width: 80%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const Item = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  a{
    &:hover {
      color: ${props => props.theme.colors.accent};
    }
  }
`;

export const Menu = () => {
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
      <NavigationBar>
        <Items>
          <Item>             
            <a href="https://nosolounjpg.com/" target={'_blank'} rel="noreferrer">Information</a>
          </Item>
          <Item>
            <a href="https://nosolounjpg.com/" target={'_blank'} rel="noreferrer">Legal Announcements</a>
          </Item>
          <Item> 
            <Image src="/images/iso.png" alt='Logo de NOJPG' width={26.25} height={70} />
          </Item>
          <Item>
            <a href="https://nosolounjpg.com/" target={'_blank'} rel="noreferrer">Frequent Questions</a>
          </Item>
          <Item> {width > 1023 ? <MetamaskButton /> : null} </Item>
            
        </Items>
      </NavigationBar>
      <Burger />
    </>
  )
}
