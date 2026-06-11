function Header() {
  return ( 
    <div className="navbar sticky top-0 z-50 bg-white shadow-sm px-4">
      <div className="flex-1">
        <a className="text-2xl font-semibold text-blue-700 ml-4">MoneyTor</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal font-semibold text-gray-500 px-1">
          <li className="mx-4 max-[961px]:hidden hover:text-blue-600"><a>Signup</a></li>
          <li className="mx-4 max-[961px]:hidden hover:text-blue-600"><a>About</a></li>
          <li className="mx-4 max-[961px]:hidden hover:text-blue-600"><a>Product</a></li>
          <li className="mx-4 max-[961px]:hidden hover:text-blue-600"><a>Pricing</a></li>
          <li className="mx-4 max-[961px]:hidden hover:text-blue-600"><a>Support</a></li>
          <li className="min-[961px]:hidden mr-2">
            <details>
              <summary><i class="fa-solid fa-bars mr-2 text-xl"></i></summary>
              <ul className="bg-white rounded-t-none p-2">
                <li className="hover:text-blue-600"><a>Signup</a></li>
                <li className="hover:text-blue-600"><a>About</a></li>
                <li className="hover:text-blue-600"><a>Product</a></li>
                <li className="hover:text-blue-600"><a>Pricing</a></li>
                <li className="hover:text-blue-600"><a>Support</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
   );
}

export default Header;