import './Banner.css'

const Banner = () => {
    return (
        <section id="bannerBG" className="">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center lg:px-8">
                <div className="w-full text-center mx-auto uppercase">
                    <h1 className="block font-bold text-white text-3xl lg:text-4xl">
                        Welcome to<span className="text-3xl font-bold lg:text-4xl text-teal-500"> Bangladeshi Handicrafts</span><br />
                        The Future of Bangladeshi Handicrafts
                    </h1>
                </div>
            </div>
        </section>
    );
};

export default Banner;