import { Helmet } from "react-helmet-async";
import Featured from "../Featured/Featured";
import Banner from "../Banner/Banner";
import BusinessPage from "../ProductsPage/Products";
import History from "../../../components/History/History";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bangladeshi Handcrafts | Home</title>
            </Helmet>
            <Banner></Banner>
            <BusinessPage></BusinessPage>
            <History></History>
            <Featured></Featured>
        </div>
    );
};

export default Home;