import logo from "../assets/logo.svg"

function NavBar() {
    return (
       
       <header className="w-full" >
        <nav className="flex justify-between items-center" >
            <img src={logo} alt="brand_logo" className="w-28 object-contain" />
            <button className="border-2 border-black px-4  py-1 rounded-lg">Github</button>
            
        </nav>
       </header>
    )
}

export default NavBar;