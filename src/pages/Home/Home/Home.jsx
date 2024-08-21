import { Helmet } from "react-helmet-async";
import Featured from "../Featured/Featured";
import Banner from "../Banner/Banner";
import BusinessPage from "../BusinessPage/BusinessPage";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bangladeshi Handcrafts | Home</title>
            </Helmet>
            <Banner></Banner>
            <BusinessPage></BusinessPage>
            <Featured></Featured>
        </div>
    );
};

export default Home;