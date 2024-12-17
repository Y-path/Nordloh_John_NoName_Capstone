// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        
        <nav className=" bg-black rounded-lg sticky top-0 z-1000 w-full">
            {/* <div className="mx-auto max-w-7xl px-2 sm:px-6 "> */}
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left- flex items-center sm:hidden"></div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">
                        <div className="flex items-center justify-center shrink-1 flex-1 sm:justify-start" >
                            <img
                                alt="Your Company"
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=purple&shade=500"
                                className="h-11 w-auto"
                            />
                             <NavLink to="/" className="text-white text-4xl hover:text-purple-500 block px-7 py-2 data-[focus]:bg-gray-100 data-[focus]:outline-none">
                        Genreator
                    </NavLink>
                        </div>
                    
                      </div>
                    
                    <NavLink to="/" className="text-white hover:text-purple-500 block px-4 py-2 data-[focus]:bg-gray-100 data-[focus]:outline-none">
                        Home
                    </NavLink>
                    <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <NavLink to="/reviews" className="text-white hover:text-purple-500 block px-4 py-2 data-[focus]:bg-gray-100 data-[focus]:outline-none">
                        Reviews
                    </NavLink>
                    <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <NavLink to="/favorites" className="text-white hover:text-purple-500 block px-4 py-2 data-[focus]:bg-gray-100 data-[focus]:outline-none">
                        Favorites
                    </NavLink>
                    <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <NavLink to="/contact" className="text-white hover:text-purple-500 block px-4 py-2 data-[focus]:bg-gray-100 data-[focus]:outline-none">
                        Contact
                    </NavLink>
                  
                    
                </div>
            </div>
            
            
        </nav>
        
    )
}