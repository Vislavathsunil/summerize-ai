import logo from "../assets/logo.svg"

function NavBar() {
    return (

        <header className="w-full" >
            <nav className="flex justify-between items-center" >
                <img src={logo} alt="brand_logo" className="w-28 object-contain" />
                <button className="border  border-gray-400 px-4  py-1 rounded-lg font-semibold  hover:bg-white">  <a href="https://github.com/Vislavathsunil/summerize-ai" target="_blank">Github</a> </button>

            </nav>
        </header>
    )
}

export default NavBar;