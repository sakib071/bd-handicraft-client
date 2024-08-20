import './Banner.css'
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';
// import img1 from '../../../assets/home/01.jpg';
// import img2 from '../../../assets/home/02.jpg';
// import img3 from '../../../assets/home/03.png';
// import img4 from '../../../assets/home/04.jpg';
// import img5 from '../../../assets/home/05.png';
// import img6 from '../../../assets/home/06.png';

const Banner = () => {
    return (
        // <Carousel>
        //     <div>
        //         <img src={img1} />
        //     </div>
        //     <div>
        //         <img src={img2} />
        //     </div>
        //     <div>
        //         <img src={img3} />
        //     </div>
        //     <div>
        //         <img src={img4} />
        //     </div>
        //     <div>
        //         <img src={img5} />
        //     </div>
        //     <div>
        //         <img src={img6} />
        //     </div>
        // </Carousel>
        <section id="bannerBG" className="">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center lg:px-8">
                <div className="w-full text-center mx-auto uppercase">
                    <h1 className="block font-bold text-white text-3xl lg:text-4xl">
                        Welcome to<span className="text-3xl font-bold lg:text-4xl text-teal-500"> Bangladeshi Handicrafts</span><br />
                        The Future of Bangladeshi Handicrafts
                    </h1>
                    <div className="mt-8 flex flex-wrap w-fit gap-4 text-center mx-auto">
                        {/* <SearchBox></SearchBox> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;