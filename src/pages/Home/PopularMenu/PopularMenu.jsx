import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {

    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');

    return (
        <section className="mb-14">
            <SectionTitle
                heading={"From our menu"}
                subHeading={"Popular items"}
            ></SectionTitle>
            <div className="grid md:grid-cols-2 gap-10 mt-10">
                {
                    popular.map(item =>
                        <MenuItem
                            key={item._id}
                            item={item}
                        ></MenuItem>)
                }
            </div>
            <button className="btn btn-outline mx-auto mt-5 border-0 border-b-4">View full menu</button>

        </section >
    );
};

export default PopularMenu;