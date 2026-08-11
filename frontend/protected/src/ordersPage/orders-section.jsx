import { Link } from 'react-router-dom'

function OrdersSection() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-7 max-[600px]:gap-5 px-4 text-center">
      <i className="fa-regular fa-rectangle-list text-[5rem] max-[600px]:text-[3.5rem] text-gray-300"></i>
      <p className="text-lg max-[600px]:text-base font-light text-gray-400">You haven't placed any orders today</p>
      <Link to='/' className="btn btn-primary h-[40px] rounded-sm border-blue-600 bg-blue-600 px-8 text-sm font-medium text-white hover:border-blue-700 hover:bg-blue-700">Get started</Link>
    </div>
   );
}

export default OrdersSection;
