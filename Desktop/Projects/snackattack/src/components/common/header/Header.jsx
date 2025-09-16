import React from 'react'
import Logo from './Logo'
import Search from '../homepage/Search'
import CardCount from './CardCount'
import User from './User'
import HamburgerMenu from './HamburgerMenu'

const Header = () => {
  return (
    <div className="flex items-center justify-between gap-3 md:gap-10 px-3 md:px:10  text-color4">
      <Logo />
      <div className='flex items-center justify-between  gap-3 me-3'>
        <CardCount />
        <User />
        <HamburgerMenu />
      </div>

    </div>
  )
}

export default Header
