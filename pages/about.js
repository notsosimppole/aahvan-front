
function About() {
    return (
        <div className="bg-[#996A16] ">
            <div className="flex flex-col pl-12 pt-12 w-[55vw]">
                <p className="stencil text-4xl text-[white] pb-8">About</p>
                <p className="font-inter text-lg pb-20 text-white"> <span className="text-black font-bold">Aahvaan</span> is North India’s largest sports festival conducted by Department of Physical Education & Sports, Delhi Technological University. From 20+ sports events to cultural events and EDM nights Aahvaan has it all.<br></br>
                    <br></br>
                    The word Aahvaan means <span className="text-black font-bold">‘Call to Challenge’</span>  in hindi and the festival lives up to its name by providing a platform for students to showcase their skills in 20+ sports events, develop their sporting skills, and interact with peers from different college & universities.
                    <br></br>
                    <br></br>
                    The festival features wide range of sports including cricket, football, basketball, volleyball, table tennis, badminton, chess, athletics etc.
                    Apart from sports events, Aahvaan also offers cultural events and competitions making the festival complete entertainment package.</p>
            </div>
            <img src='/static/images/about.png' className='absolute right-[0vw] h-[600px] mt-[-80vh]' />

        </div>
    )
}

export default About    