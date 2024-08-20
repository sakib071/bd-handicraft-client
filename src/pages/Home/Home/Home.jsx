import { Helmet } from "react-helmet-async";
import Featured from "../Featured/Featured";
import Banner from "../Banner/Banner";
// import PopularMenu from "../PopularMenu/PopularMenu";
// import Testimonials from "../Testimonials/Testimonials";
import BusinessPage from "../BusinessPage/BusinessPage";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bangladeshi Handcrafts | Home</title>
            </Helmet>
            <Banner></Banner>
            <BusinessPage></BusinessPage>
            {/* <PopularMenu></PopularMenu> */}
            <Featured></Featured>
            {/* <Testimonials></Testimonials> */}
        </div>
    );
};

export default Home;