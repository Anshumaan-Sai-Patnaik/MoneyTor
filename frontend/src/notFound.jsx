import Footer from "./footer";
import Header from "./header";
import {Link} from 'react-router-dom'

function NotFound() {
  return ( 
    <>
      <Header />
      <div className="flex flex-col m-4 ml-7 p-2 min-[800px]:m-15">
        <h1 className="text-black text-lg mb-2">404</h1>
        <h1 className="text-black text-2xl font-semibold mb-2">Sorry could'nt find that page</h1>
        <p className="text-black">We couldn’t find the page you were looking for. Visit <span className="text-blue-600 hover:text-black"><Link to='/'>Zerodha’s home page</Link></span></p>
      </div>
      <Footer />
    </>
   );
}

export default NotFound;