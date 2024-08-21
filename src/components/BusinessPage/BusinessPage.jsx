import { useQuery } from "@tanstack/react-query";
import { MdOutlineWifiFind } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import CardGrid from "../Loading/CardGrid";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const BusinessPage = () => {
    const axiosPublic = useAxiosPublic();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axiosPublic.get("/products");
            return response.data;
        },
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <CardGrid />;
    if (isError) return <section className="w-full mx-auto">
        <MdOutlineWifiFind className='text-6xl text-gray-600 text-center w-full' />
        <h2 className="mt-2 text-lg font-medium text-center text-gray-800">No Data Found</h2>
    </section>;

    // console.log(data);

    const displayedProduct = data && data.length > 4
        ? data.slice(0, 6)
        : data;

    return (
        <div className="my-20 bg-white dark:bg-gray-900">
            <h3 className="z-10 text-4xl inter-600 mb-5 mx-auto max-w-3xl dark:text-white text-black text-center">Business <span className="text-teal-500">Products</span></h3>
            <div className="max-w-5xl xl:max-w-7xl grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-5 mx-auto justify-center gap-5 xl:gap-10">
                {displayedProduct.map((product, index) => (
                    <Link to={`/products/${product?._id}`} key={index} className="flex mx-auto bg-white dark:bg-gray-900 rounded-xl border dark:border-1 dark:border-gray-800 hover:dark:border-teal-500 hover:shadow-lg overflow-hidden transition hover:cursor-pointer">
                        <div className="relative">
                            <article className="w-[220px] h-full rounded-l-lg">
                                <img
                                    alt={product?.business_name}
                                    src={product?.business_logo}
                                    className="h-full w-full object-cover"
                                />
                            </article>
                            <div className='absolute top-3 left-3 flex gap-2 products-center'>
                                <FaHeart className='text-red-500 text-xl' />
                                <p className='text-white inter-500'>{product?.likes}</p>
                            </div>
                            <div className='absolute bottom-3 left-3 flex gap-2 products-center'>
                                <p className='px-2 py-[2px] text-white text-xs bg-teal-500 border border-teal-500 rounded-lg'>Qty: {product?.number_of_products}</p>
                            </div>
                        </div>

                        <div className="px-4 py-3 w-[180px]">
                            <div className="h-[200px]">
                                <p className="uppercase tracking-wide text-lg text-teal-500 font-semibold">{product.business_name}</p>
                                <p className="mt-1 text-base leading-tight font-medium dark:text-white text-black">Operating for 15 Years</p>
                                <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm line-clamp-6">{product?.description}</p>
                                <div className="mt-4">
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>
        </div >

    );
};

export default BusinessPage;