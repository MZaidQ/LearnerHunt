import React, { useRef } from 'react';
import Classes from "/styles/mbaleads.module.css";
import Link from "next/link";
import HeroSection from "@/components/Comps/HeroSection";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Head from 'next/head';
const colleges = [
  {
    name: 'BML Munjal University',
    image: '/assets/Landing/collegelogo/bml-_1_.webp',
  },
  {
    name: 'Dr. D. Y. Patil B-School',
    image: '/assets/Landing/collegelogo/hqdefault-_1_.webp',
  },
  {
    name: 'IILM University',
    image: '/assets/Landing/collegelogo/iilm-_1_.webp',
  },
  {
    name: 'SOIL Institute, Gurugram',
    image: '/assets/Landing/collegelogo/soil-_1_.webp',
  },
  {
    name: 'UPES University',
    image: '/assets/Landing/collegelogo/UPE-_1_.webp',
  },
  {
    name: 'NDIM',
    image: '/assets/Landing/collegelogo/Ndim.webp',
  },
  {
    name: 'Jims Kalkaji',
    image: '/assets/Landing/collegelogo/jims.webp',
  },
];
export default function mbaleads() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const inputRef = useRef(null);

  const focusInput = () => {
      // Focus on the input field
      if (inputRef.current) {
          inputRef.current.focus();
      }
  };
  return (
    <>
    <Head>
    <title>
    100% Free MBA Admission Consulting | Expert Educational Guidance
        </title>
        <meta
          name="description"
          content="Discover why we stand out as the top choice for MBA admission consulting. Read how our expert guidance has propelled them towards academic & career success."
        />
        {/* <!-- Open Graph (OG) Tags --> */}
<meta property="og:title" content="100% Free MBA Admission Consulting | Expert Educational Guidance"/>
<meta property="og:description" content="Discover why we stand out as the top choice for MBA admission consulting. Read how our expert guidance has propelled them towards academic & career success."/>
<meta property="og:image" content="https://www.learnerhunt.com/assets/Landing/bg-img.webp"/>
<meta property="og:url" content="https://www.learnerhunt.com"/>
<meta property="og:type" content="website"></meta>

{/* <!-- Twitter Card --> */}
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="100% Free MBA Admission Consulting | Expert Educational Guidance"/>
<meta name="twitter:description" content="Discover why we stand out as the top choice for MBA admission consulting. Read how our expert guidance has propelled them towards academic & career success."/>
<meta name="twitter:image" content="https://www.learnerhunt.com/assets/Landing/bg-img.webp"/>
<meta name="twitter:site" content="@learnerhunt"/>
<meta name="twitter:creator" content="@learnerhunt"></meta>
    </Head>
    <div className={Classes["Mba-body"]}>
      
      <div className={Classes['mba-nav']}>
        <div>
        <img
                      loading="lazy"
                      // src="/assets/images/Svglogo.svg"
                      src="/assets/images/Learnerhunt-Logo.webp"
                      alt="sagenext logo"
                      width={176}
                      height={55}
                    />
        </div>
        <div>
        <p style={{margin:'0px',fontWeight:'700'}}>
                      Sales/Support +91-8800756846
                    </p>
        </div>
      </div>
      <HeroSection inputRef={inputRef}/>
      {/* about us */}
      
      <div className={Classes['mba-Testimonials']}>
      <div className={Classes['mba-Testimonials-inner']}>
          <h3 className={Classes['mba-heading']}> Unlock Your Potential! Get Expert Guidance for MBA Admissions Today
</h3>
          <div className={Classes['mba-centerlized']}>
          <div className={Classes['mba-borderLine']}></div>
          </div>
          <div className="container">
         <p style={{lineHeight:'150%',textAlign:'center'}}>Embark on your educational journey with Learner Hunt, the leading name in career consultation based in Faridabad, We are tied up with top MBA colleges in India & boast over 7 years of unmatched experience in  MBA Admissions.</p>
        <p style={{lineHeight:'150%',textAlign:'center'}}>With a robust network encompassing 1,000+ prestigious colleges & universities across India. As Best MBA admission consultants, We open doors to unparalleled opportunities for aspiring students.</p>
        <p style={{lineHeight:'150%',textAlign:'center'}}>As we are the Best MBA admission consultants, we pride ourselves on providing 100% free counselling & unwavering support, ensuring that every individual receives personalized attention and tailored solutions.</p>
       <p style={{lineHeight:'150%',textAlign:'center'}}>Whether you're seeking admission to MBA programs or exploring other specialized fields, Learner Hunt is your trusted partner. Our comprehensive services cover everything from online admissions for MBA programs to assisting with MBA entrance exams and application deadlines.</p>
       <p style={{lineHeight:'150%',textAlign:'center'}}>Don't let the complexities of higher education hold you back. Join Learner Hunt today and unlock a world of opportunities to pursue your academic dreams.</p>
       </div>
        </div>
      </div>
       <div className={Classes['mba-weTieup']}>
      <div className={Classes['mba-Testimonials-inner']}>
          <h3 className={Classes['mba-heading']}>What we offer in MBA programs-</h3>
          <div className={Classes['mba-centerlized']}>
          <div className={Classes['mba-borderLine']}></div>
          </div>
          <div className="container">
            <p style={{textAlign:'center'}}>Gain exclusive access to top MBA programs with Learner Hunt's comprehensive services, offering personalized guidance, seamless admissions, and expert support every step of the way.</p>
            <div className="row">
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="/assets/Landing/offered/entrepreneurship.png" alt='studentname' width={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Entrepreneurship</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="/assets/Landing/offered/stock-market.png" width={100} alt='studentname' maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Financial Technology</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="/assets/Landing/offered/social-media.png" width={100} alt='studentname' maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Marketing & Innovation</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="/assets/Landing/offered/recruitment.png" alt='studentname' width={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Human Resource Management</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="\assets\Landing\offered\scientist.png" alt='studentname' width={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Data Science</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="/assets/Landing/offered/artificial-intelligence.png" alt='studentname' width={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Artificial Intelligence</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="/assets/Landing/offered/recycling-center.png" width={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Manufacturing Management</p>
                </div>
              </div> <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="/assets/Landing/offered/online-course.png" alt='studentname' width={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>And Many More courses…</p>
                </div>
              </div>
            </div>
          </div>
          <div className={Classes["Landing-button"]}>
          <div id="u_content_divider_12" className="u_content_divider v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div style={{ textAlign: 'center', lineHeight: 0 }}>
        <div style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: '#BBBBBB', width: '100%', display: 'inline-block', lineHeight: '1px', height: '0px', verticalAlign: 'middle' }}></div>
      </div>
    </div>
          <div id="u_content_button_8" className="u_content_button v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div className="v-text-align" style={{ textAlign: 'center' }}>
        <a href="#" target="_self" className="v-size-width v-line-height v-padding v-button-colors v-border v-border-radius v-font-family v-font-size v-font-weight" style={{ color: '#FFFFFF', backgroundColor: '#950304', borderRadius: '4px', lineHeight: '120%', display: 'inline-block', textDecoration: 'none', textAlign: 'center', padding: '10px 20px', width: 'auto', maxWidth: '100%', wordWrap: 'break-word', fontSize: '21px' }} onClick={focusInput}>
          Apply Now for MBA Admissions
        </a>
      </div>
    </div>
    <div id="u_content_divider_12" className="u_content_divider v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div style={{ textAlign: 'center', lineHeight: 0 }}>
        <div style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: '#BBBBBB', width: '100%', display: 'inline-block', lineHeight: '1px', height: '0px', verticalAlign: 'middle' }}></div>
      </div>
    </div>
    </div>
        </div>
      </div>
      <div className={Classes['mba-Testimonials']}>
      <div className={Classes['mba-Testimonials-inner']}>
          <h3 className={Classes['mba-heading']}>What Makes Us Different as Best MBA Admission Consultants?</h3>
          <div className={Classes['mba-centerlized']}>
          <div className={Classes['mba-borderLine']}></div>
          </div>
          <div className="container">
          <p style={{textAlign:'center'}}>Accredited services ensure credibility and trustworthiness. Guarantee 100% placement assurance, securing your future success.</p>

            <div className="row">
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="/assets/Landing/diff1.webp" alt='studentname' width={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Accredited</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="/assets/Landing/diff2.webp" alt='studentname' width={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Scholarships</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="/assets/Landing/diff3.webp" alt='studentname' width={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>1,000+ Premier Colleges & Universities</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="/assets/Landing/diff4.webp" alt='studentname' width={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Career Centre & Mentoring</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="/assets/Landing/diff5.webp" alt='studentname' width={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>100% Placement Assurance</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="/assets/Landing/expand.png" alt='studentname' width={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>And many more…</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={Classes["Landing-button"]}>
          <div id="u_content_divider_12" className="u_content_divider v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div style={{ textAlign: 'center', lineHeight: 0 }}>
        <div style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: '#BBBBBB', width: '100%', display: 'inline-block', lineHeight: '1px', height: '0px', verticalAlign: 'middle' }}></div>
      </div>
    </div>
          <div id="u_content_button_8" className="u_content_button v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div className="v-text-align" style={{ textAlign: 'center' }}>
        <a href="#" target="_self" className="v-size-width v-line-height v-padding v-button-colors v-border v-border-radius v-font-family v-font-size v-font-weight" style={{ color: '#FFFFFF', backgroundColor: '#950304', borderRadius: '4px', lineHeight: '120%', display: 'inline-block', textDecoration: 'none', textAlign: 'center', padding: '10px 20px', width: 'auto', maxWidth: '100%', wordWrap: 'break-word', fontSize: '21px' }} onClick={focusInput}>
          Apply Now for MBA Admissions
        </a>
      </div>
    </div>
    <div id="u_content_divider_12" className="u_content_divider v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div style={{ textAlign: 'center', lineHeight: 0 }}>
        <div style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: '#BBBBBB', width: '100%', display: 'inline-block', lineHeight: '1px', height: '0px', verticalAlign: 'middle' }}></div>
      </div>
    </div>
    </div>
      </div>
      <div className={Classes['mba-weTieup']}>
      <h3 className={Classes['mba-heading']}>Colleges & Universities we are tie-up </h3>
          <div className={Classes['mba-centerlized']}>
          <div className={Classes['mba-borderLine']}></div>
          </div>
          {/* <div className="container">
            <div className="row">
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="/assets/Landing/collegelogo/bml-_1_.webp" width={100} height={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>BML Munjal University</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="/assets/Landing/collegelogo/hqdefault-_1_.webp" width={100} height={100}  maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Dr. D. Y. Patil B-School</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="/assets/Landing/collegelogo/iilm-_1_.webp" width={100} height={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>IILM University</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="\assets\Landing\collegelogo\soil-_1_.webp" width={100} height={100}  maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>SOIL Institute, Gurugram</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-studentImg']} src="/assets/Landing/collegelogo/UPE-_1_.webp" width={100} height={100}  maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>UPES University</p>
                </div>
              </div>
            
            </div>
          </div> */}
          <p style={{textAlign:'center'}}>Learner Hunt boasts partnerships with 1,000+ top colleges and universities in India, offering unparalleled opportunities for MBA admission.</p>

           <Carousel
      responsive={responsive}
      swipeable={true}
      draggable={true}
      showDots={false}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="transform 300ms ease-in-out"
      transitionDuration={300}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {colleges.map((college, index) => (
        <div key={index} className='container'>
          <div className={Classes["Image-div"]}>
            <img className="mba-studentImg" style={{objectFit:'contain'}} src={college.image} alt={college.name} width={100} height={100} />
            {/* <p className="mba-studentname">{college.name}</p> */}
          </div>
        </div>
      ))}
    </Carousel>
          <div className={Classes["Landing-button"]}>
          <div id="u_content_divider_12" className="u_content_divider v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div style={{ textAlign: 'center', lineHeight: 0 }}>
        <div style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: '#BBBBBB', width: '100%', display: 'inline-block', lineHeight: '1px', height: '0px', verticalAlign: 'middle' }}></div>
      </div>
    </div>
          <div id="u_content_button_8" className="u_content_button v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div className="v-text-align" style={{ textAlign: 'center' }}>
        <a href="#" target="_self" className="v-size-width v-line-height v-padding v-button-colors v-border v-border-radius v-font-family v-font-size v-font-weight" style={{ color: '#FFFFFF', backgroundColor: '#950304', borderRadius: '4px', lineHeight: '120%', display: 'inline-block', textDecoration: 'none', textAlign: 'center', padding: '10px 20px', width: 'auto', maxWidth: '100%', wordWrap: 'break-word', fontSize: '21px' }} onClick={focusInput}>
          Apply Now for MBA Admissions
        </a>
      </div>
    </div>
    <div id="u_content_divider_12" className="u_content_divider v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div style={{ textAlign: 'center', lineHeight: 0 }}>
        <div style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: '#BBBBBB', width: '100%', display: 'inline-block', lineHeight: '1px', height: '0px', verticalAlign: 'middle' }}></div>
      </div>
    </div>
    </div>
      </div>
      <div className={Classes['mba-Testimonials']}>
        <div className={Classes['mba-Testimonials-inner']}>
          <h3 className={Classes['mba-heading']}>Testimonials</h3>
          <div className={Classes['mba-centerlized']}>
          <div className={Classes['mba-borderLine']}></div>
          </div>
          <div className="container">
            <p style={{textAlign:'center'}}>Explore what our clients have to say about their experiences with Learner Hunt through our testimonials.</p>
            <div className="row">
              
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student1.webp" alt='studentname' width={100} height={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Vishwas Verma </p>
                  <p>Learner Hunt is a game-changer! Their expert guidance made my MBA admission process seamless. I am grateful for their personalized approach and commitment to student success.</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student2.webp" alt='studentname' width={100} height={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Md Kaif </p>
                  <p>Learner Hunt is a game-changer! Their expert guidance made my MBA admission process seamless. I am grateful for their personalized approach and commitment to student success.</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student3.webp" alt='studentname' width={100} height={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Arjun Jaiswal</p>
                  <p>Exceptional service! Learner Hunt provided invaluable insights, helping me secure a spot in a top-tier MBA program. Their dedication to each student sets them apart. Highly recommended!</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student4.webp" alt='studentname' width={100} height={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Ishika Murarka</p>
                  <p>Learner Hunt exceeded my expectations! The team's knowledge of MBA admissions is unmatched. I owe my acceptance to their strategic guidance. Trust them with your aspirations!</p>
                </div>
              </div>
              <div className="col-md">
                <div className={Classes['Image-div']}>
                  <img className={Classes['mba-student']} src="/assets/Landing/studentImg/student5.webp" alt='studentname' width={100} height={100} maxWidth={100}/>
                  <p className={Classes['mba-studentname']}>Jia Oktey</p>
                  <p>Navigating the complex MBA admission process was a breeze with Learner Hunt. Their support is genuine, and the results speak for themselves. Five stars without a doubt!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={Classes["Landing-button"]}>
          <div id="u_content_divider_12" className="u_content_divider v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div style={{ textAlign: 'center', lineHeight: 0 }}>
        <div style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: '#BBBBBB', width: '100%', display: 'inline-block', lineHeight: '1px', height: '0px', verticalAlign: 'middle' }}></div>
      </div>
    </div>
          <div id="u_content_button_8" className="u_content_button v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div className="v-text-align" style={{ textAlign: 'center' }}>
        <a href="#" target="_self" className="v-size-width v-line-height v-padding v-button-colors v-border v-border-radius v-font-family v-font-size v-font-weight" style={{ color: '#FFFFFF', backgroundColor: '#950304', borderRadius: '4px', lineHeight: '120%', display: 'inline-block', textDecoration: 'none', textAlign: 'center', padding: '10px 20px', width: 'auto', maxWidth: '100%', wordWrap: 'break-word', fontSize: '21px' }} onClick={focusInput}>
          Apply Now for MBA Admissions
        </a>
      </div>
    </div>
    <div id="u_content_divider_12" className="u_content_divider v-container-padding-padding" style={{ overflowWrap: 'break-word', padding: '10px' }}>
      <div style={{ textAlign: 'center', lineHeight: 0 }}>
        <div style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: '#BBBBBB', width: '100%', display: 'inline-block', lineHeight: '1px', height: '0px', verticalAlign: 'middle' }}></div>
      </div>
    </div>
    </div>
      </div>
      <div className={Classes["mba-footer"]}>
        <p className="mba-footer-para">© 2024 Learnerhunt - <Link href={'/privacy'}>PRIVACY POLICY</Link></p>
      </div>
      <button type="button" className={Classes["npfWidgetButton"]} onClick={focusInput}>Enquire Now!</button>
    </div>
    </>
  );
}
