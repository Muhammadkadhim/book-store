import { Carousel } from "flowbite-react";
import axios from "axios";
import { useState, useEffect } from "react";
import TrendingBook from "./TrendingBook";
import LoadingBooks from "./LoadingBooks";

export default function Hero() {
    const [trendingBooks, setTrendingBooks] = useState();
    useEffect(() => {
        axios
            .get("http://openlibrary.org/trending/now.json?limit=5")
            .then((data) => {
                const books = data.data.works.map((work) => {
                    const {
                        key,
                        author_name,
                        cover_i,
                        edition_count,
                        first_publish_year,
                        title,
                    } = work;

                    return {
                        id: key,
                        title: title,
                        author: author_name,
                        cover: `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`,
                        edition_count: edition_count,
                        first_publish_year: first_publish_year,
                        price: Math.floor(Math.random() * (15 - 5 + 1)) + 5,
                    };
                });
                setTrendingBooks(books);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            {trendingBooks ? (
                <div className="w-11/12 mx-auto md:w-full h-[300px]  md:h-[500px] mt-20 flex justify-center items-center">
                    <Carousel>
                        {trendingBooks.map((book) => {
                            return <TrendingBook book={book} />;
                        })}
                    </Carousel>
                </div>
            ) : (
                <div className="w-11/12 mx-auto md:w-12/12 h-56 md:h-[500px] mt-20 flex items-center">
                    <LoadingBooks />
                </div>
            )}
        </>
    );
}
