import {RxHamburgerMenu} from 'react-icons/rx'
const HamburgerMenu = () => {
  return (
    <div className='relative flex md:hidden'>
      {/* md ekrandan sonra görünür olsun  md:hidden */}
        <RxHamburgerMenu size="25"/>
    </div>
  )
}

export default HamburgerMenu