import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuBG from '../../../assets/menu/banner3.jpg'
import dessertBG from '../../../assets/menu/dessert-bg.jpeg'
import pizzaBG from '../../../assets/menu/pizza-bg.jpg'
import saladBG from '../../../assets/menu/salad-bg.jpg'
import soupBG from '../../../assets/menu/soup-bg.jpg'
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCateogry/MenuCategory';

const Menu = () => {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')

    return (
        <div>
            <Helmet>
                <title>Bistro | Menu</title>
            </Helmet>
            <Cover img={menuBG} title={"our menu"}></Cover>
            {/*  main cover */}
            <div className='mt-10'>
                <SectionTitle subHeading={"Don't miss"} heading={"Today's Offer"}></SectionTitle>
            </div>
            {/* offered menu items */}
            <MenuCategory items={offered}></MenuCategory>
            <MenuCategory items={dessert} title={"dessert"} img={dessertBG} ></MenuCategory>
            <MenuCategory items={pizza} title={"pizza"} img={pizzaBG}></MenuCategory>
            <MenuCategory items={salad} title={"salad"} img={saladBG}></MenuCategory>
            <MenuCategory items={soup} title={"soup"} img={soupBG}></MenuCategory>
        </div>
    );
};

export default Menu;