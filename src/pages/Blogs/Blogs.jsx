import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect } from "react";

const Blogs = () => {
    const axiosPublic = useAxiosPublic();
    const code = `
    import React, { useState } from 'react';

    const Counter = () => {
        const [count, setCount] = useState(0);

        return (
            <div>
                <p>You clicked {count} times</p>
                <button onClick={() => setCount(count + 1)}>
                    Click me
                </button>
            </div>
        );
    }

    export default Counter;
    `;
    const { data, isLoading, isError } = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            const response = await axiosPublic.get("/blogs"); // Use GET method
            return response.data; // Return data
        },
        // refetchOnWindowFocus: false,
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


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
            <article className="px-4 py-20 mx-auto max-w-5xl" itemID="#" itemScope>
                <img src="https://i.ibb.co/KrHqMLr/banner.jpg" className="object-cover object-top w-full h-64 bg-center rounded-lg" alt="blog-image" />
                {
                    data.map((item, index) => (
                        <div key={index} className="mb-20">
                            <div className="w-full mx-auto mb-8 text-left lg:max-w-6xl">
                                <p className="mt-6 mb-2 text-xs font-semibold tracking-wider uppercase text-teal-500">{item?.slug}</p>
                                <h1 className="mb-3 text-lg font-bold leading-tight text-gray-900 md:text-xl" itemProp="headline" title={item?.title}>
                                    {item?.title}
                                </h1>
                                <div className="flex space-x-2">
                                    {
                                        item?.related_concepts?.map((tag, index) => (
                                            <p key={index} className="bg-gray-100 text-black badge" href="#">{tag}</p>

                                        ))
                                    }
                                </div>
                            </div>
                            <div className="w-full mx-auto prose lg:max-w-5xl">
                                <p>
                                    {item.description}
                                </p>
                            </div>
                            <pre className="whitespace-pre-wrap bg-slate-800 text-white text-sm rounded-lg max-w-5xl my-5 mx-auto">
                                <code>{code}</code>
                            </pre>
                            <div className="w-full mx-auto prose lg:max-w-5xl">
                                <p>
                                    {item.content}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </article>
        </div>
    );
};

export default Blogs;
