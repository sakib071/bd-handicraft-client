import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'


const Testimonials = () => {

    const [reviews, setReview] = useState([]);

    useEffect(() => {
        fetch('https://bistro-boss-server-gamma-six.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReview(data))
    }, [])

    return (
        <section className="my-20">
            <SectionTitle
                subHeading="What our client say"
                heading={'Testimonials'}
            ></SectionTitle>
            {/* {reviews.length} */}
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}>
                        <div className="text-center w-1/2 mx-auto p-5">
                            <Rating
                                className="mx-auto m-5"
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p>{review.details}</p>
                            <h3 className="text-2xl text-orange-400"> {review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonials;