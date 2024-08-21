import LoadingCard from './LoadingCard';

const CardGrid = () => {
    const cards = Array(6).fill(null);

    return (
        <div className="max-w-6xl grid grid-cols-3 mt-20 h-screen place-content-center mx-auto">
            {cards.map((_, index) => (
                <LoadingCard key={index} />
            ))}
        </div>
    );
};

export default CardGrid;
