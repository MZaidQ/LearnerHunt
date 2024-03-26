import CollegeRanking from '@/components/CollegeRanking'
import HomepageHeroSection from '@/components/HomepageHeroSection'
import StudyAbroad from '@/components/StudyAbroad'
import TopColleges from '@/components/TopColleges'
import TopCourses from '@/components/TopCourses'
import TopExams from '@/components/TopExams'
import Count from '@/components/Count'
import WhyChoose from '@/components/WhyChoose'

// import WhatsAppButton from '@/components/Whatsup'


import axios from 'axios'
import Head from 'next/head'
import PopForm from '@/components/Comps/PopForm'

const StructuredDataOrg = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Decred Digital Services Pvt. Ltd.",
    url: "https://www.learnerhunt.com",
    logo: "https://www.learnerhunt.com/assets/images/Learnerhunt-Logo.webp",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+918800756846",
        contactType: "customer service",
        email: "contact@learnerhunt.com"
      }
    ],
    description: "Learnerhunt is a digital platform for educational career counseling, offering comprehensive information about top colleges and universities in India and abroad that provide undergraduate programs, postgraduate programs, MBBS, and other professional courses. We have over 300 business schools and universities registered with us. We have become a trusted source of detailed information to assist you in making the right college and career decisions."
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Educational Career Counseling",
    description: "Comprehensive educational career counseling services to help you make informed decisions about college and career paths.",
    url: "https://www.learnerhunt.com",
    provider: {
      "@type": "Organization",
      name: "Decred Digital Services Pvt. Ltd.",
      url: "https://www.learnerhunt.com",
      logo: "https://www.learnerhunt.com/assets/images/Learnerhunt-Logo.webp",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+918800756846",
        contactType: "customer service",
        email: "contact@learnerhunt.com"
      }
    }
  }
]

export default function Home({colleges,courses,exams,testeligibility,ukcolleges}) {
  // console.log(colleges)
 
  return (
    <>
      <Head>
        <title>Explore Top Colleges & Universities in India | Learnerhunt</title>
        <meta name="description" content="Discover over 1,000 colleges & universities, 150+ courses & get the latest updates on admissions, exams & news | ultimate educational career counselling platform." />
        <meta name="keyword" content="admission counselling, college admissions, university admissions, student guidance, career counselling, student support, educational portal, college details" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="facebook-domain-verification" content="dlwg9ck6pstfnxvx0h76eu38irnw2x" />
        <link rel="icon" href="/favicon.ico" />
        {/* <!-- Open Graph (OG) Tags --> */}
<meta property="og:title" content="Explore Top Colleges & Universities in India | Learnerhunt"/>
<meta property="og:description" content="Discover over 1,000 colleges & universities, 150+ courses & get the latest updates on admissions, exams & news | ultimate educational career counselling platform"/>
<meta property="og:image" content="https://www.learnerhunt.com/assets/images/Learnerhunt-Logo.webp"/>
<meta property="og:url" content="https://www.learnerhunt.com"/>
<meta property="og:type" content="website"></meta>

{/* <!-- Twitter Card --> */}
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="Explore Top Colleges & Universities in India | Learnerhunt"/>
<meta name="twitter:description" content="Discover over 1,000 colleges & universities, 150+ courses & get the latest updates on admissions, exams & news | ultimate educational career counseling platform"/>
<meta name="twitter:image" content="https://www.learnerhunt.com/assets/images/Learnerhunt-Logo.webp"/>
<meta name="twitter:site" content="@learnerhunt"/>
<meta name="twitter:creator" content="@learnerhunt"></meta>

<script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(StructuredDataOrg),
          }}
        />
      </Head>
      <HomepageHeroSection data={testeligibility}/>
      {/* <WhatsAppButton/> */}
      {/* <PopForm/> */}
      <Count/>
      <WhyChoose/>
      <TopColleges colleges={colleges}/>
      <TopCourses  courses ={courses}/>
      <CollegeRanking zones={testeligibility.zones} departments={testeligibility.departments} rankingtypes={testeligibility.rankingtypes} />
      <TopExams exams={exams}/>
      <StudyAbroad StudyAbroad={ukcolleges}/>
    </>
  )
}


// export async function getServerSideProps() {
//   try {
//     // Fetch data from external API
//     const colleges_res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/colleges?limit=4&page=0&course=mba");
//     const colleges = await colleges_res.json();

//     const courses_res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/courses?limit=-1&page=0&type=ug`);
//     const courses = await courses_res.json();

//     const exams_res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/exams?limit=4&page=0");
//     const exams = await exams_res.json();

//     const testeligibility_res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/miscellaneous/testeligibility");
//     const testeligibility = await testeligibility_res.json();

//     return {
//       props: {
//         colleges: colleges.data,
//         courses: courses.data,
//         exams: exams.data,
//         testeligibility,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       props: {
//         colleges: [],
//         courses: [],
//         exams: [],
//         testeligibility: {},
//       },
//     };
//   }
// }
export async function getServerSideProps() {
  try {
    // Fetch data from external API using Axios
    const colleges_res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/colleges?limit=4&page=0&course=mba`);
    const colleges = colleges_res.data;

    const courses_res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/courses?limit=-1&page=0&type=ug`);
    const courses = courses_res.data;

    const exams_res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/exams?limit=4&page=0`);
    const exams = exams_res.data;

    const testeligibility_res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/miscellaneous/testeligibility`);
    const testeligibility = testeligibility_res.data;

    const uk_res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/uk-colleges?limit=4&page=0&course=mba`);
    const uk = uk_res.data;


    return {
      props: {
        colleges: colleges.data,
        courses: courses.data,
        exams: exams.data,
        ukcolleges :uk.data,
        testeligibility,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        colleges: [],
        courses: [],
        exams: [],
        testeligibility: {},
      },
    };
  }
}