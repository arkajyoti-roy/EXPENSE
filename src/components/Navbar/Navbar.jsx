const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-slate-50 to-blue-50 shadow-lg border-b border-blue-100 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-37 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-1.5 sm:p-2 rounded-full shadow-lg">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                className="w-5 h-5 sm:w-6 sm:h-6 text-white" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                ExpenseTracker
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">Manage your finances</p>
            </div>
          </div>

         
          

         
          <div className="flex items-center space-x-2 sm:space-x-3">
            

            {/* Logout Button */}
            <button className="p-1.5 sm:p-2 text-red-600  hover:bg-red-50 rounded-full transition-all duration-200 border border-red-200">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                className="w-4 h-4 sm:w-5 sm:h-5" 
                viewBox="0 0 24 24"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16,17 21,12 16,7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>

           
          </div>
        </div>

       
      </div>
    </nav>
  );
};

export default Navbar;