import React, { useEffect, useState, useSyncExternalStore } from 'react'

import link_icon from "../assets/link.svg"
import { IoEnterOutline } from 'react-icons/io5'
import { useLazyGetSummaryQuery } from '../store/article';
import { FaRegCopy } from 'react-icons/fa';
import loader from "../assets/loader.svg"
import tick from "../assets/tick.svg"
import enter from "../assets/enter.svg"
import { TiTick } from 'react-icons/ti';
import { MdDelete } from 'react-icons/md';
import { stringify } from 'postcss';

function Demo() {

    const [article, setArticle] = useState({
        url: "",
        summary: "",
    });



    const [urlCopied, setUrlCopied] = useState("");

    // fetching old summaries done by user
    useEffect(() => {
        // const localStorageStoredSummaries = JSON.parse(localStorage.getItem("articles"));
        // if (localStorageStoredSummaries) {
        //     setAllArticles(localStorageStoredSummaries);
        // }
        getLocalSummaries();

    }, [])

    // function for getting all old searched summaries

    function getLocalSummaries() {
        const localStorageStoredSummaries = JSON.parse(localStorage.getItem("articles"));
        if (localStorageStoredSummaries) {
            setAllArticles(localStorageStoredSummaries);
        }
    }

    const [allArticles, setAllArticles] = useState([])

    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await getSummary({ articleUrl: article.url })

        if (data?.summary) {
            const newArticle = { ...article, summary: data.summary };

            const updatedArticles = [...allArticles, newArticle];
            // setAllArticles(updatedArticles);

            localStorage.setItem("articles", JSON.stringify(updatedArticles));
            getLocalSummaries();
            setArticle({ url: "", summary: data?.summary });


            console.log(article);
        }

    }


    const handleCopy = (url) => {
        setUrlCopied(url);
        navigator.clipboard.writeText(url);
        setTimeout(() => {
            setUrlCopied("");
        }, 3000);
    }

    const handleRemove = (url) => {

        const index = allArticles.findIndex((ele) => ele.url === url);

        if (index > -1) {
            allArticles.splice(index, 1);
            localStorage.setItem("articles", JSON.stringify(allArticles));
            getLocalSummaries();
        }
    }



    return (
        <section className='w-full'>
            <div className='px-2 md:px-20 lg:px-40 mb-8'>
                <form onSubmit={handleSubmit} className='relative  flex justify-center items-center'>
                    <img src={link_icon} alt="link_icon" className='absolute left-0 ml-3 my-2 w-5' />
                    <input type="url" placeholder='Enter your url' required value={article.url} onChange={(e) => { setArticle({ ...article, url: e.target.value }) }} className=' w-full bg-white rounded-md  py-1 px-10 flex justify-center peer outline-none text-base  placeholder:text-base placeholder:text-gray-600 ' />
                    <button type='submit' className='absolute right-0 mr-2  focus:border-gray-700 peer-focus:border-gray-700 peer-focus:text-gray-700'> <img src={enter} alt="enter_icon" className='w-4' /> </button>
                </form>

                {/* URL histories */}
                <div className='mt-4 max-h-60 overflow-y-auto '>
                    {
                        allArticles.length > 0 && <div className='flex flex-col gap-2'>
                            {allArticles.map((ele, index) => (
                                <button key={index} className='bg-white w-full rounded-md flex justify-between items-center p-3  ' onClick={() => {
                                    setArticle({
                                        url: "",
                                        summary: ele.summary,
                                    })
                                }} >
                                    <p className='flex items-center  gap-4'>
                                        {urlCopied === ele.url
                                            ? <TiTick className='text-green-300' /> : <FaRegCopy onClick={(e) => {
                                                e.stopPropagation();
                                                handleCopy(ele.url)
                                            }} />}
                                        <span className='text-base md:text-lg text-blue-700  max-sm:truncate max-w-[150px] '>{ele.url}</span>
                                    </p>
                                    <MdDelete className='text-red-400' onClick={(e) => {
                                        e.stopPropagation(); // stops prp
                                        handleRemove(ele.url)
                                    }} />
                                </button>
                            ))}
                        </div>
                    }
                </div>


                {/* Show all summaries */}
                <div className='flex flex-col flex-1 mt-6' >
                    {
                        isFetching ? <div className='flex justify-center'><img src={loader} className='w-20 h-20 object-contain ' /></div> :
                            error ?
                                (<p className='text-base font-semibold text-center'>
                                    Well, that wasn't supposed to happen... <br /> <span className='text-sm text-gray-600'>{error?.data?.error.split('.')[0]}.</span>
                                </p>) :
                                (
                                    article.summary && <div className='flex flex-col gap-2 mt-4' >
                                        <h2 className='text-2xl md:text-3xl font-semibold'>Article <span className='text-cyan-600'>Summary</span> </h2>

                                        <div className='bg-gray-100 p-4 rounded-lg'>
                                            <p className='text-base md:text-lg  font-sans  font-medium text-gray-700'>{article.summary}</p>
                                        </div>
                                    </div>
                                )
                    }
                </div>
            </div>

            {/* All rights are reserved */}
            <div>
                <p className='text-center text-slate-600 text-sm  py-4 ' >&copy;Sunil, All rights are reserved.</p>
            </div>



        </section>
    )
}

export default Demo