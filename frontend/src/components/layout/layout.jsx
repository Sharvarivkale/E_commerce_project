import React from 'react'
import Header from './header'
import Footer from './footer'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children,title,description,keywords,author}) => {
  return (
   <>
  <HelmetProvider>
  <Helmet >
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="author" content={author} />
  </Helmet>
</HelmetProvider>

   <Header></Header>
   <main className='h-[155vh] bg-[#372C2E]'>
    {children}
    <ToastContainer />
   </main>
   <Footer></Footer>
   </>
  )
}

Layout.defaultProps = {
 title:"e-commerce brand",
 description:"mern stack project",
 description:"mongodb,nodejs,reactjs,express",
 author:"Sharvari Kale"
};

export default Layout