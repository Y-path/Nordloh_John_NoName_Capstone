import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className=" bg-black rounded-lg sticky top-0 z-1000 w-full">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left- flex items-center sm:hidden"></div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">
                        <div className="flex items-center justify-center shrink-1 flex-1 sm:justify-start" >
                          
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="#de67ff" className="size-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                              </svg>
                                 
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