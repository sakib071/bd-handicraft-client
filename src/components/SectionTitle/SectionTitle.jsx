
const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="lg:w-3/12 w-3/5 mx-auto">
            <p className="text-yellow-500 font-semibold italic mb-5 text-center">---{subHeading}---</p>
            <hr className="border-2 mt-3 mx-auto" />
            <h3 className="text-2xl uppercase text-center mt-3 mb-3 font-semibold">{heading}</h3>
            <hr className="border-2 mb-3 mx-auto" />
        </div>
    );
};

export default SectionTitle;