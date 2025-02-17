import { useState, useEffect } from "react";
import { getOnePage } from "../apiService/pageApiService";
import { useParams } from "react-router-dom";

const Page = () => {
    const [page, setPage] = useState([]);
    const { id } = useParams();


    useEffect(() => {
        const fetchPage = async () => {

            try {
                const response = await getOnePage(id);

                setPage(response);
            }
            catch (error) {
                console.log('Error fetching Book', error.message);
            }
        };

        fetchPage();
    }, [id]);

    return (
        <>
            <div className="container w-50 shadow-lg p-3 mb-5 bg-white rounded">
                <div className="row ps-5 pe-5">
                    <div className="col">
                        <h2>{page.PageTitle}</h2>
                    </div>
                </div>
                <div className="row ps-5 pe-5 pt-2">
                    <div className="col">
                        <p><strong>Category </strong>{page.category}</p>
                    </div>
                </div>
                <div className="row ps-5 pe-5 pt-2">
                    <div className="col">
                        <p><strong>Author</strong>{page.director}</p>
                    </div>
                </div>
                <div className="row ps-5 pe-5 pt-2">
                    <div className="col">
                        <p><strong>Description</strong>{page.description}</p>
                    </div>
                </div>
            </div>
        </>


    );
}

export default Page;