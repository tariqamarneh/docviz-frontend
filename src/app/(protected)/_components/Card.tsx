import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

interface CardProps {
    summary: string;
    keyData: string;
    insights: string
}


const Card: React.FC<CardProps> = ({ summary, keyData, insights }) => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        const pin = gsap.fromTo(sectionRef.current, {
            translateX: 0
        }, {
            translateX: "-380vw",
            ease: 'none',
            duration: 1,
            scrollTrigger: {
                trigger: triggerRef.current,
                start: 'top top',
                end: '+=2250',
                scrub: 0.6,
                pin: true
            }
        })

        return () => {
            pin.kill()
        }
    }, [])

    const keyPhrases = keyData.split(",").map((phrase, index) => (
        <div
            key={index}
            className="m-2 p-3 border rounded-lg bg-gray-300 shadow-md dark:bg-gray-600 dark:text-white"
        >
            {phrase.trim()}
        </div>
    ));

    return (
            <section className={` ${summary ? '' : 'hidden'}`}>
                <div ref={triggerRef}>
                    <div ref={sectionRef} className="h-[100vh] w-[300vw] flex flex-row relative">
                        <div className="h-[100vh] w-[100vw] flex justify-center items-center">
                            <div className="w-[70vw] h-[70vh] border-2 rounded-2xl border-black dark:border-white p-5 flex flex-col justify-center items-center overflow-scroll text-center">
                                <h3 className="text-2xl text-black dark:text-white">Summary</h3>
                                <br />
                                <p className="text-black dark:text-white h-[70%]">{summary}</p>
                            </div>
                        </div>
                        <div className="h-[100vh] w-[100vw] flex justify-center items-center">
                            <div className="w-[70vw] h-[70vh] border-2 rounded-2xl border-black dark:border-white p-5 flex flex-col justify-center items-center overflow-scroll">
                                <h3 className="text-2xl text-black dark:text-white">Key phrases</h3>
                                <br />
                                <div className="flex flex-wrap justify-center text-black dark:text-white max-h-[70%]">{keyPhrases}</div>
                            </div>
                        </div>
                        <div className="h-[100vh] w-[100vw] flex justify-center items-center">
                            <div className="w-[70%] h-[70%] border-2 rounded-2xl border-black dark:border-white p-5 flex flex-col justify-center items-center overflow-scroll text-center">
                                <h3 className="text-2xl text-black dark:text-white">Insights</h3>
                                <br />
                                <p className="text-black dark:text-white h-[70%]">{insights}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    );
}
export default Card;
