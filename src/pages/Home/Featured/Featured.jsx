import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImage from "../../../assets/home/featured.jpg"
import './Featured.css';

const Featured = () => {
    return (
        <div className="featured-item text-white flex justify-center bg-fixed mb-20 mt-20">
            <div className="absolute w-1/2 mx-auto mt-20">
                <SectionTitle
                    heading={"Featured items"}
                    subHeading={"Check It Out"}
                ></SectionTitle>
            </div>
            <div className="h-[60vh] md:flex gap-10 p-5 pt-44 px-36 justify-center items-center bg-black bg-opacity-50">
                <div className="">
                    <img src={featuredImage} alt="" />
                </div>
                <div className="">
                    <p>Aug 20, 2023</p>
                    <p className="uppercase">Where can i get some?</p>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima rerum, est vel libero culpa illo amet molestiae numquam commodi reiciendis inventore quidem reprehenderit, ducimus voluptatibus iusto repudiandae sit veniam quae beatae animi ratione consectetur. Quod cupiditate eius consequatur saepe, tenetur vel ullam assumenda at atque, debitis deserunt, optio commodi sunt?</p>
                    <button className="btn btn-outline mt-5 border-0 border-b-4">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;