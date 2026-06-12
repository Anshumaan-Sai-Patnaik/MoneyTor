import {Link} from 'react-router-dom'

function Header() {
  return ( 
    <div className="navbar sticky top-0 z-50 bg-white shadow-sm px-4">
      <div className="flex-1">
        <Link to='/' className="text-2xl font-semibold text-blue-700 ml-4">MoneyTor</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal font-semibold text-gray-500 px-1">
          <li className="mx-4 max-[961px]:hidden hover:text-blue-600"><Link to='/signup'>Signup</Link></li>
          <li className="mx-4 max-[961px]:hidden hover:text-blue-600"><Link to='/about'>About</Link></li>
          <li className="mx-4 max-[961px]:hidden hover:text-blue-600"><Link to='/product'>Product</Link></li>
          <li className="mx-4 max-[961px]:hidden hover:text-blue-600"><Link to='/pricing'>Pricing</Link></li>
          <li className="mx-4 max-[961px]:hidden hover:text-blue-600"><Link to='/support'>Support</Link></li>
          <li className="min-[961px]:hidden mr-2">
            <details>
              <summary><i class="fa-solid fa-bars mr-2 text-xl"></i></summary>
              <ul className="bg-white rounded-t-none p-2">
                <li className="hover:text-blue-600"><Link to='/signup'>Signup</Link></li>
                <li className="hover:text-blue-600"><Link to='/about'>About</Link></li>
                <li className="hover:text-blue-600"><Link to='/product'>Product</Link></li>
                <li className="hover:text-blue-600"><Link to='/pricing'>Pricing</Link></li>
                <li className="hover:text-blue-600"><Link to='/support'>Support</Link></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
   );
}

export default Header;