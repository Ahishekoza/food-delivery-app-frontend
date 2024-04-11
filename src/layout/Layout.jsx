/* eslint-disable react/prop-types */

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'

const Layout = ({children,showHero=false}) => {
  return (
    <>
      <div className=' flex flex-col min-h-screen w-full'>
        <Header/>
       {showHero&& <Hero/>}
        <div className='container mx-auto py-10 flex-1'>
            {children}
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default Layout