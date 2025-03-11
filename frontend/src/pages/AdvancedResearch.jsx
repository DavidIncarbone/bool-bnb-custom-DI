import axios from "axios"
import React from "react";
import FilteredSearch from "../components/FilteredSearch";
import CardAdvResearch from "../components/CardAdvResearch";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect, useState } from "react";
import LoaderCard from "../components/LoaderCard";
import { motion } from "framer-motion";
import Pagination from "../components/Pagination"
import { useSearchContext } from "../contexts/SearchContext";



export default function AdevancedResearch() {

    const { addLike, isLoading, setIsLoading, isHomePage, resetForm
    } = useGlobalContext();
    const {
        handleOnChange, handleOnSubmit, searchFormData, tempFormData, setTempFormData,
        isPaginationFlag, filteredApi, apartmentsCount, page, numPages, handleFilteredPageChange, fetchApi,
        useSearchParams
    } = useSearchContext();
    const delayAnim = 0.05;
    function handleReset() {
        setTempFormData(
            {
                search: "",
                category: "",
                minRooms: "",
                minBeds: ""
            }
        )

    }
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const search = searchParams.get('search') || '';
        const category = searchParams.get('category') || '';
        const minRooms = searchParams.get('minRooms') || '';
        const minBeds = searchParams.get('minBeds') || '';

        setTempFormData({
            search,
            category,
            minRooms,
            minBeds
        });
        fetchApi();
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }, [searchParams, searchFormData, page]);
    return (
        <>
            <FilteredSearch submit={handleOnSubmit} onChange={handleOnChange} tempFormData={tempFormData} handleReset={handleReset} />
            <div className="container m-auto row mb-3">
                <h3 className="pt-5">
                    {filteredApi.length < 1 ? "" : (
                        <>
                            Results for your research: {apartmentsCount}{" "}
                            {searchFormData?.search ? (
                                <>for <strong>{searchFormData.search}</strong></>
                            ) : (
                                ""
                            )}
                        </>
                    )}
                </h3>


                {filteredApi.length >= 1 ?
                    filteredApi?.map((apartment, index) => (
                        <div className="col-12 col-md-6 col-lg-3 g-4" style={{ height: "27rem" }} key={apartment.id} >
                            {
                                isLoading ? <LoaderCard />
                                    :
                                    (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5, delay: index * delayAnim }} // Ritardo progressivo
                                        >
                                            <CardAdvResearch apartment={apartment} addLike={addLike} />
                                        </motion.div>
                                    )
                            }
                        </div>
                    ))
                    :
                    <div className="text-center py-5 no-query">
                        <h3 className="display-5">No results found for this research</h3>
                    </div>}
                {!isPaginationFlag &&
                    <div>
                        <Pagination filteredPage={page} handleFilteredPageChange={handleFilteredPageChange} numFilteredPages={numPages} />
                    </div>}
            </div>
        </>
    )
}