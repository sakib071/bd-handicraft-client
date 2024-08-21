import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Blogs = () => {
    const axiosPublic = useAxiosPublic();

    // const { data, isLoading, isError } = useQuery({
    //     queryKey: ["blogs"],
    //     queryFn: () => axiosPublic("blogs"),
    //     refetchOnWindowFocus: false,
    // });

    const { data, isLoading, isError } = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            const response = await axiosPublic.get("/blogs"); // Use GET method
            return response.data; // Return data
        },
        // refetchOnWindowFocus: false,
    });


    console.log(data);

    if (isLoading) {
        return (
            <div className='h-[500px] w-full flex justify-center items-center'>
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 rounded-full animate-pulse dark:bg-orange-500"></div>
                    <div className="w-4 h-4 rounded-full animate-pulse dark:bg-orange-500"></div>
                    <div className="w-4 h-4 rounded-full animate-pulse dark:bg-orange-500"></div>
                </div>
            </div>
        );
    }

    if (isError || !data || data.length === 0) {
        return (
            <div className="grid h-screen place-content-center bg-white px-4">
                <div className="text-center">
                    <h1 className="text-9xl font-black text-gray-200">404</h1>
                    <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>
                    <p className="mt-4 text-gray-500">Service not found.</p>
                    <a href="/" className="mt-6 inline-block rounded bg-orange-400 px-5 py-3 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring">Go Back Home</a>
                </div>
            </div>
        );
    }

    return (
        <div>
            <section className="w-full px-4 py-40 mx-auto max-w-7xl md:w-4/5">
                <div className="flex gap-5 justify-between mb-10">
                    {data?.length > 0 && data[0] && (
                        <figure className="w-1/2">
                            <img src={data[0]?.image || "/news.jpg"} className="object-cover w-full h-72 bg-center rounded" alt="blog-post" loading="lazy" />
                        </figure>
                    )}
                    <div className="w-1/2">
                        <p className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">{data[0]?.category || "Category"}</p>
                        <h2 className="mb-2 text-xl font-bold leading-snug text-gray-900">
                            <a href="#" className="text-gray-900 hover:text-orange-500">{data[0]?.title || "Featured Blog Title"}</a>
                        </h2>
                        <p className="mb-4 text-sm font-normal text-gray-600">
                            {data[0]?.excerpt || "Featured blog excerpt goes here..."}
                        </p>
                        <a className="flex items-center text-gray-700" href="#">
                            <figure className="avatar w-[50px] h-[50px]">
                                <img className="w-[50px] h-[50px] rounded-full" src={"/avatar-placeholder.jpg"} alt={`Photo of ${data[0]?.author || "Author"}`} />
                            </figure>
                            <div className="ml-2">
                                <p className="text-sm font-semibold text-gray-900">{data[0]?.author || "Author"}</p>
                                <p className="text-sm text-gray-600">{data[0]?.published_date || "Date"}</p>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {data.map((item, index) => (
                        <div key={index}>
                            <a href="#">
                                <img src={item.image || "/news.jpg"} className="object-cover w-full h-56 mb-5 bg-center rounded" alt="blog-post" loading="lazy" />
                            </a>
                            <p className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">{item?.category || "Category"}</p>
                            <h2 className="mb-2 text-xl font-bold leading-snug text-gray-900">
                                <a href="#" className="text-gray-900 line-clamp-1 hover:text-orange-500">{item?.title || "Blog Title"}</a>
                            </h2>
                            <p className="mb-4 text-sm font-normal line-clamp-3 text-gray-600">
                                {item?.excerpt || "Blog excerpt goes here..."}
                            </p>
                            <a className="flex items-center text-gray-700" href="#">
                                <figure className="avatar w-[50px] h-[50px]">
                                    <img className="w-[50px] h-[50px] rounded-full" src={"/avatar-placeholder.jpg"} alt={`Photo of ${item?.author || "Author"}`} />
                                </figure>
                                <div className="ml-2">
                                    <p className="text-sm font-semibold text-gray-900">{item?.author || "Author"}</p>
                                    <p className="text-sm text-gray-600">{item?.published_date || "Date"}</p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Blogs;
