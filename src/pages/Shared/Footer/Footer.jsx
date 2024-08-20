
const Footer = () => {
    return (
        <footer className="px-4 py-12 mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-10 mb-3 md:grid-cols-3 lg:grid-cols-11 lg:gap-20">
                <div className="col-span-3">
                    <a href="#" title="Hello next Home Page" className="flex items-center">
                        <img className="w-20" src="/button.png" alt="" />
                        <span className="sr-only">Bangladeshi Handicrafts</span>
                    </a>
                    <p className="my-4 text-xs leading-normal text-gray-600">
                        Hosted in the EU 🇪🇺, with <strong>no user tracking</strong> scripts. Made all over the world by <a href="#" className="underline" target="_blank">17 amazing people</a>.
                    </p>
                </div>

                <nav className="col-span-1 md:col-span-1 lg:col-span-2">
                    <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">Contact Details</p>
                    <a className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-teal-500" href="#">Name</a>
                    <a className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-teal-500" href="#"> Email </a>
                    <a className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-teal-500" href="#">Phone</a>
                    <a className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-teal-500" href="#">Address</a>
                </nav>
                <nav className="col-span-1 md:col-span-1 lg:col-span-2">
                    <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">Social Links</p>
                    <a className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-teal-500" href="#">About Us</a>
                    <a className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-teal-500" href="#">Privacy</a>
                    <a className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-teal-500" href="#">Terms</a>
                    <a className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-teal-500" href="#">Status</a>
                </nav>
            </div>
            <div className="pt-10 mt-10 border-t border-gray-100">
                <p className="mb-0 text-xs text-center text-gray-600">Copyright &copy; 2024 Bangladeshi Handicrafts</p>
            </div>
        </footer>

    );
};

export default Footer;