import { useQuery } from "@tanstack/react-query";
import { MdOutlineWifiFind } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider"; // Assuming you have AuthContext to get user info
import CardGrid from "../../components/Loading/CardGrid";

const Products = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext); // Get the logged-in user
    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axiosPublic.get("/products");
            return response.data;
        },
        refetchOnWindowFocus: false,
    });

    // State to store favorite products for the current user
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem(`favoriteProducts_${user?.email}`);
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Handle adding/removing a product to/from favorites
    const toggleFavorite = (productId) => {
        let updatedFavorites;

        if (favorites.includes(productId)) {
            // Remove from favorites
            updatedFavorites = favorites.filter((id) => id !== productId);
        } else {
            // Add to favorites
            updatedFavorites = [...favorites, productId];
        }

        setFavorites(updatedFavorites);
        // Save favorites in local storage for the specific user
        localStorage.setItem(`favoriteProducts_${user?.email}`, JSON.stringify(updatedFavorites));
    };

    if (isLoading)
        return (
            <div className="pt-10">
                <CardGrid></CardGrid>
            </div>
        );

    if (isError)
        return (
            <section className="w-full h-[500px] flex flex-col justify-center items-center mx-auto">
                <MdOutlineWifiFind className="text-6xl text-gray-600 text-center w-full" />
                <h2 className="mt-2 text-lg font-medium text-center dark:text-white text-gray-800">No Data Found</h2>
            </section>
        );

    return (
        <div className="min-h-screen py-20 max-w-7xl mx-auto">
            <h3 className="z-10 text-2xl lg:text-3xl inter-600 lg:mb-5 mx-auto max-w-3xl dark:text-white text-black text-center">
                Business <span className="text-teal-500">Products</span>
            </h3>
            <div className="max-w-5xl xl:max-w-7xl grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 p-5 mx-auto justify-center gap-5 xl:gap-10">
                {data.map((product, index) => (
                    <Link
                        to={`/products/${product?._id}`}
                        key={index}
                        className="flex mx-auto bg-white dark:bg-gray-900 rounded-xl border dark:border-1 dark:border-gray-800 hover:dark:border-teal-500 hover:shadow-lg overflow-hidden transition hover:cursor-pointer"
                    >
                        <div className="relative">
                            <article className="lg:w-[220px] h-full rounded-l-lg">
                                <img
                                    alt={product?.business_name}
                                    src={product?.business_logo}
                                    className="lg:h-[250px] h-[230px] lg:w-full w-[220px] object-cover"
                                />
                            </article>
                            <div className="absolute top-3 left-3 flex gap-2 items-center">
                                {/* Toggle between selected and unselected heart */}
                                {favorites.includes(product?._id) ? (
                                    <FaHeart
                                        className="text-red-500 text-xl cursor-pointer"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleFavorite(product._id);
                                        }}
                                    />
                                ) : (
                                    <FaRegHeart
                                        className="text-red-500 text-xl cursor-pointer"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleFavorite(product._id);
                                        }}
                                    />
                                )}
                                <p className="text-white inter-500">{product?.likes}</p>
                            </div>
                            <div className="absolute bottom-3 left-3 flex gap-2 items-center">
                                <p className="px-2 py-[2px] text-white text-xs bg-teal-500 border border-teal-500 rounded-lg">
                                    Qty: {product?.number_of_products}
                                </p>
                            </div>
                        </div>

                        <div className="px-4 py-3 w-[180px]">
                            <div className="h-[200px]">
                                <p className="uppercase tracking-wide text-lg text-teal-500 font-semibold">
                                    {product.business_name}
                                </p>
                                <p className="mt-1 text-sm leading-tight dark:text-white text-black">
                                    Operating for {product?.years_of_operation} Years
                                </p>
                                <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm line-clamp-4 lg:line-clamp-6">
                                    {product?.description}
                                </p>
                                <div className="mt-4"></div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Products;
