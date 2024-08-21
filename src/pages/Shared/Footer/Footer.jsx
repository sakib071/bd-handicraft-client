import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="px-4 py-12 mx-auto max-w-7xl">
            <div className="flex justify-between gap-10 mb-3 lg:gap-20">
                <div className="w-1/3 space-y-5">
                    <a href="/" className="uppercase text-xl text-black">Bangladeshi<span className="font-bold text-teal-500">Handcrafts</span></a>
                    <a href="/" title="Hello next Home Page" className="flex items-center">
                        <img className="w-20" src="/button.png" alt="" />
                    </a>
                    <p className="my-4 text-sm text-justify leading-normal text-gray-600">
                        Discover the exquisite beauty of Bangladesh&apos;s rich heritage through its handcrafted treasures. Our shop offers a curated collection of authentic Bangladeshi handicrafts, each piece a testament to the skill and creativity of local artisans.
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

                    <div className="flex gap-5">
                        <a className="flex mb-3 text-3xl text-gray-800 transition md:mb-2 hover:text-teal-500" href="#"><FaSquareFacebook /></a>
                        <a className="flex mb-3 text-3xl text-gray-800 transition md:mb-2 hover:text-teal-500" href="#"><FaInstagram /></a>
                        <a className="flex mb-3 text-3xl text-gray-800 transition md:mb-2 hover:text-teal-500" href="#"><FaLinkedin />
                        </a>
                    </div>

                </nav>
            </div>
            <div className="pt-10 mt-10 border-t border-gray-100">
                <p className="mb-0 text-xs text-center text-gray-600">Copyright &copy; 2024 Bangladeshi Handicrafts</p>
            </div>
        </footer>

    );
};

export default Footer;