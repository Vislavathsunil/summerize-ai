import React from 'react'

function Hero() {
    return (
        <div className='w-full text-center mt-8'>
            <h1 className='text-wrap text-5xl font-extrabold'>Sumerize articles with
                <br />
                <span className='myStyle'>Open AI GPT-4</span>

            </h1>
            <h2 className='text-wrap mt-4 font-semibold px-4 md:px-16 lg:px-24 '>
                Slimplify your reading with Summize, an
                open-source article summarizer
                that transforms lengthy articles into
                clear and concise summaries.
            </h2>
        </div>
    )
}

export default Hero;