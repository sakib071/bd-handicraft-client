import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router";
import useCart from "../../hooks/useCart";

const ProductCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = () => {
        if (user && user.email) {
            //send cart to the database
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        // alert("Food added successfully");
                        //refetch the cart to update the cart items to counts 
                        refetch();
                    }
                })
        } else {
            alert("Please login first");
            navigate("/login", { state: { from: location } });
        }
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="font-bold bg-slate-900 text-white absolute right-5 top-5 px-2 py-1 rounded-md">${price}</p>
            <div className="card-body">
                <h2 className="text-xl font-bold text-center">{name}</h2>
                <p className="text-center text-sm">{recipe}</p>
                <div className="card-actions justify-end">
                    <button onClick={handleAddToCart} className="btn btn-outline mt-2 border-0 border-b-4 bg-slate-50 text-amber-500 flex mx-auto">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;