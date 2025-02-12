"use client"

import Image from "next/image";

const Intro = () => {
    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-4 w-9/12">
            <h1 className="text-4xl font-bold">Hi! I am Teresa</h1>
            <p className="text-base text-gray-700">I’m a Full-Stack Software Engineer and MSc Student at NYU, where I specialize in Computing, Entrepreneurship, and Innovation. I have 2+ years of experience in web development and scalable applications. I have built and optimized full-stack applications using Next.js, React, PostgreSQL, Prisma, and Tailwind CSS. </p>
        </div>
        <div className="w-3/12 flex-1">
            <Image 
                src="/images/IMG_7070.jpg" 
                alt="" 
                width={100} 
                height={100}
                className="rounded-full border-gray-100 h-36 w-36" />
        </div>
        </div>
    )

}

export default Intro;