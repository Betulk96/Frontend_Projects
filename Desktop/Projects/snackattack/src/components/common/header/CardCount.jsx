"use client"

import UseCart from '@/hook/useCart'
import { useRouter } from 'next/navigation'
import { MdShoppingBasket } from 'react-icons/md'
const CardCount = () => {
  const { cartPrdcts } = UseCart()
  const router = useRouter();
  return (
    <div onClick={() => router.push('/cart')} className="hidden md:flex relative hover:cursor-pointer">
      <MdShoppingBasket size="30" className='text-color2' />
      <div className='absolute -top-1 -right-2 text-xs bg-color5 w-5 h-5 flex items-center justify-center rounded-full'>{cartPrdcts?.length}</div>
      {/* -top-1 : yukarıda 1 kısmı, -right-2 : sağa 2 kısmı */}
    </div>
  )
}

export default CardCount