import { useContext } from "react";
import { useRouteError } from "react-router-dom";
import { ThemeContext } from "./providers/ThemeProvider";

const ErrorPage = () => {
    const { theme } = useContext(ThemeContext);

    const error = useRouteError();
    // console.error(error);


    return (
        <section className={`grid h-screen place-content-center text-center space-y-5 ${theme === 'dark' ? 'bg-slate-800-500' : 'bg-white'}`}>
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-full text-center">
                    <h2 className="mb-8 text-gray-600">
                        <span className="uppercase text-xl tracking-widest dark:text-white text-gray-500">{error.statusText || error.message}</span>
                        <p className="mt-4 mb-8 text-gray-400">Sorry, we couldn&apos;t find this page.</p>
                    </h2>
                    <a rel="noopener noreferrer" href="/" className="px-5 py-3 font-semibold rounded bg-teal-400 text-white hover:bg-teal-500 transition-all ease-in-out">Back to homepage</a>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;
