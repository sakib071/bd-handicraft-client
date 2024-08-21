import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const SingleBusiness = () => {
    const { _id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["products", _id],
        queryFn: async () => {
            const response = await axiosPublic.get(`/products/${_id}`);
            return response.data;
        },
    });

    console.log(data);


    if (isLoading) return <div className='h-[500px] w-full flex justify-center items-center'>
        <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 rounded-full animate-pulse dark:bg-teal-500"></div>
            <div className="w-4 h-4 rounded-full animate-pulse dark:bg-teal-500"></div>
            <div className="w-4 h-4 rounded-full animate-pulse dark:bg-teal-500"></div>
        </div>
    </div>;
    if (isError) return <div>Error fetching data</div>;


    if (!data) return (
        <div className="grid h-screen place-content-center bg-white px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-gray-200">404</h1>
                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>
                <p className="mt-4 text-gray-500">We can&apos;t find that page.</p>
                <a
                    href="/"
                    className="mt-6 inline-block rounded bg-teal-400 px-5 py-3 text-sm font-medium text-white hover:bg-teal-500 focus:outline-none focus:ring"
                >
                    Go Back Home
                </a>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen py-20 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold inter-800 mb-10 border-l-8 border-teal-400 pl-4">{data.data}</h1>

            <div className="grid grid-cols-2 gap-5 mx-auto">
                <figure><img className="rounded-xl w-[600px]" src={data.business_logo} alt="data Image" /></figure>
                <div className="mx-5 space-y-3">
                    <h3 className="text-3xl font-semibold">About <span className="text-teal-500 uppercase">{data?.business_name}</span></h3>
                    <p className="w-[550px] text-lg text-justify text-gray-600">{data?.description}</p>
                    <p className="w-[550px] text-lg text-justify text-gray-600">Years of Password: <span className="text-teal-500 uppercase">{data?.years_of_operation}</span></p>
                    <p className="w-[550px] text-lg text-justify text-gray-600">Likes: <span className="text-teal-500 uppercase">{data?.likes}</span></p>
                </div>
            </div>
        </div>

        //     "years_of_operation": 15,
        //         "number_of_products": 200,
        //             "likes": 1500,
        //                 "description":
    );
};

export default SingleBusiness;
