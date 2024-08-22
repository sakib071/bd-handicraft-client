import './Banner.css'

const Banner = () => {
    return (
        <section id="bannerBG" className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center lg:px-8">
                <div className="w-full text-center mx-auto uppercase">
                    <h1 className="block font-semibold lg:font-bold text-white text-xl lg:text-4xl">
                        Welcome to<span className="text-xl font-bold lg:text-4xl text-teal-500"> Bangladeshi Handicrafts</span><br />
                        The Future of Bangladeshi Handicrafts
                    </h1>
                </div>
            </div>
        </section>
    );
};

export default Banner;