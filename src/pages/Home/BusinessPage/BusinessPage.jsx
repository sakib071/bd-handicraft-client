import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";
import getBusiness from "../../../hooks/getBusiness";
import CardGrid from "../../../components/Loading/CardGrid";

const BusinessPage = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: () => getBusiness(),
    });

    if (isLoading) return <CardGrid />;
    if (isError) return <div>Error fetching data</div>;

    console.log(data);

    const displayedProduct = data && data.length > 4
        ? data.slice(0, 6)
        : data;

    return (
        <div>
            <div className='max-w-7xl mx-auto flex'>
                <h3 className="z-10 text-4xl inter-600 mb-5 mx-auto max-w-3xl text-black pt-20">Business <span className="text-teal-500">Products</span></h3>
            </div>
            <div className="min-h-screen my-20 max-w-7xl mx-auto">
                <div className="max-w-5xl lg: xl:max-w-7xl grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-5 mx-auto justify-center gap-5 xl:gap-10">
                    {/* {products.map((product, index) => (
                        <Link
                            to={`/products/${product.toLowerCase()}`} // Ensure country name is lowercase
                            key={index}
                            className="overflow-hidden w-full rounded-lg shadow shadow-orange-100 transition hover:shadow-lg hover:shadow-orange-100 hover:cursor-pointer"
                        >
                            <img
                                alt={product.business_name}
                                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                                className="xl:h-56 lg:h-48 w-full object-cover"
                            />

                            <div className="bg-white p-4 w-full">
                                <h3 className="mt-0.5 text-lg text-gray-900 inter-600">{product.business_name}</h3>
                                <p className="mt-2 mb-5 h-16 line-clamp-3 text-sm/relaxed text-gray-500">{product.business_name}</p>
                            </div>
                        </Link>
                    ))} */}
                    {displayedProduct.map((product, index) => (
                        <div key={index} className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                            <div className="md:flex">
                                <div className="md:flex-shrink-0">
                                    <img className="h-full w-full object-cover md:w-48" src={product.business_logo} alt="product image"></img>
                                </div>
                                <div className="p-8">
                                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{product.business_name}</div>
                                    <p className="block mt-1 text-lg leading-tight font-medium text-black">Operating for 15 Years</p>
                                    <p className="mt-2 text-gray-500">Quantity: {product.number_of_products}</p>
                                    <p className="mt-2 text-gray-500">Likes: {product.likes}</p>
                                    <div className="mt-4">
                                        <a href="/products/handicrafts-of-bengal" className="text-indigo-600 hover:text-indigo-900">View Products</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}

                </div>
            </div>
        </div>

    );
};

export default BusinessPage;