interface WorkExperienceItem {
    startDate: string;
    endDate: string;
    companyName: string;
    jobTitle: string;
    description: string[];
    companyLink?: string;
}
const WorkExperienceData: WorkExperienceItem[] = [
    {
        startDate: "March 2024",
        endDate: "Present",
        companyName: "Self-Employed",
        jobTitle: "Software Engineer",
        description: [
            "Currently developing a scalable e-commerce platform to support artisan vendors and help them showcase and sell their products online.",
            "Built the initial platform using React, Next.js, PostgreSQL, and Tailwind CSS to ensure high performance and scalability.",
            "Implemented dynamic search, product filtering, and secure authentication for an optimized user experience.",
            "Continuously adding new features based on potential client needs, including multi-vendor management and transaction tracking.",
            "Exploring ways to expand the platform into a full business product, targeting artisan vendors across different markets."

        ],
    },
    {
        startDate: "December 2022",
        endDate: "Present",
        companyName: "Freelance",
        jobTitle: "Software Engineer",
        description: [
            "Developed a custom business website to enhance the client’s online presence and brand identity.",
            "Built a responsive, user-friendly interface using HTML, CSS, JavaScript, ensuring smooth navigation and mobile compatibility.",
            "Implemented SEO best practices to improve search visibility and increase user engagement.",
            "Delivered the project on time and within scope, demonstrating strong project management and client communication skills."
        
        ],
    }
]

const WorkExperience: React.FC = () => {
    return (
      <div className="flex flex-col gap-4 w-full -z-10">
        <h1 className="text-2xl font-bold">Work Experience</h1>
  
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          {WorkExperienceData.map((item, index) => (
            <li
              key={index}
              className={`mb-10 ms-4 ${
                index === WorkExperienceData.length - 1 ? "mb-0" : ""
              }`}
            >
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {item.startDate} - {item.endDate || "Present"}
              </time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.jobTitle} at {item.companyName}
              </h3>
              <div className="mb-4 text-base font-normal text-gray-700 dark:text-gray-400">
                <ul>
                  {item.description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>
              {item.companyLink && (
              <a
                href={item.companyLink}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                Learn more{" "}
                <svg
                  className="w-3 h-3 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default WorkExperience;
