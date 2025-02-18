import React, { memo, useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import { FaYoutube } from "react-icons/fa";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";
import kl from "../assets/kl.png";


import video from "../assets/intro3.mp4";
import logo from "../assets/logo.png";

import partner from "../assets/partner.png"


const timelineData = [

  {
    year: 2024,
    title: "A Global Showcase of Talent and Culture",
    description: "In 2024, the festival saw an astounding 20,000 students from all corners of the world, including a growing number of international participants, making it one of the largest and most inclusive cultural events in India. The sheer scale and global participation reflect the fest’s expanding reach and its significance as a major platform for young talent.",
    image: "https://res.cloudinary.com/ds18h1q0k/image/upload/v1735379758/2024i_b6r9hy.jpg",
  },
  {
    year: 2023,
    title: "A Global Celebration of Talent and Culture",
    description:
      "In 2023, Surabhi reached new heights with over 15,000 students participating, including a significant number of international students from various countries. This made Surabhi not only one of the largest cultural fests in India but also a truly global celebration of youth, talent, and diversity.",
    image: "https://res.cloudinary.com/ds18h1q0k/image/upload/v1735379758/2023i_dp6r0u.jpg",
  },
  {
    year: 2022,
    title: "A National Celebration of Talent and Culture",
    description:
      "In 2022, Surabhi witnessed a remarkable participation of over 14,000 students, making it one of the largest and most anticipated cultural fests in the country.",
    image: "https://res.cloudinary.com/ds18h1q0k/image/upload/v1735379758/2022i_ihzcmw.jpg",
  },
];




const chiefGuests = [
  {
    name: "Ram Miriyala",
    role: "Singer",
    image: "https://res.cloudinary.com/ds18h1q0k/image/upload/v1735379766/g2_nwtfyi.jpg"
  },
  {
    name: "Yashwanth ",
    role: "Dance Choreographer",
    image: "https://res.cloudinary.com/ds18h1q0k/image/upload/v1735380176/g4_be5vwm.jpg"
  },
  {
    name: "Roshini Sahota",
    role: "Actress",
    image: "https://res.cloudinary.com/ds18h1q0k/image/upload/v1735379751/g7_sqofuv.jpg"
  },
  {
    name: "Harsha Chemudu",
    role: "Actor",
    image: "https://res.cloudinary.com/ds18h1q0k/image/upload/v1735379767/g1_gth4yu.jpg"
  },


  {
    name: "Naveen IAS",
    role: "IAS",
    image: "https://res.cloudinary.com/ds18h1q0k/image/upload/v1735379765/g3_ccux51.jpg"
  },
  {
    name: "Pranav Kaushik",
    role: "Actor",
    image: "https://res.cloudinary.com/ds18h1q0k/image/upload/v1735379764/g5_kfp48m.jpg"
  },
  {
    name: "Vamsi Pujith",
    role: "Actor",
    image: "https://res.cloudinary.com/ds18h1q0k/image/upload/v1735379762/g6_qeve0t.jpg"
  },

  {
    name: "Garima Bhardwaj",
    role: "Designer",
    image: "https://res.cloudinary.com/ds18h1q0k/image/upload/v1735379761/g8_zzrckr.jpg"
  },
  {
    name: "Navin Tammala",
    role: "Singer",
    image: "https://res.cloudinary.com/ds18h1q0k/image/upload/v1735379751/g9_dyrmfz.jpg"
  },
  {
    name: "Deepak",
    role: "Music Composer",
    image: "https://res.cloudinary.com/ds18h1q0k/image/upload/v1735379760/g10_zneydh.jpg"
  },
  {
    name: "Ananda Vardhan",
    role: "Actor",
    image: "https://res.cloudinary.com/ds18h1q0k/image/upload/v1735379759/g11_yvh7me.jpg"
  }
];

const participationSteps = [
  {
    id: 1,
    title: "Explore Events List",
    description: "Browse through our diverse range of cultural events and competitions"
  },
  {
    id: 2,
    title: "Event Registration",
    description: "Complete the registration process for your chosen events"
  },
  {
    id: 3,
    title: "Event Schedule",
    description: "Check the detailed schedule to plan your participation"
  },
  {
    id: 4,
    title: "Select Event",
    description: "Choose your preferred events from the available options"
  },
  {
    id: 5,
    title: "Event Requirements",
    description: "Review all requirements and guidelines for your selected events"
  },
  {
    id: 6,
    title: "Attend Event",
    description: "Join us at the venue and showcase your talent"
  }
];

const g1 = 'https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/q2c0ccumfs2iztxhxcmh';
const g2 = 'https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/i7qhjtrikaqcfqgnkyvk';
const g3 = 'https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/jjkoq15gzm93zkygnckw';
const g4 = 'https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/buadaqs3homnlaqpctwe';
const g5 = 'https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/kp3tn5gewnyaabc4gms6';
const g6 = 'https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/ag1jyj78fkw4moqavptl';
const g7 = 'https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/apowslnjwi6db0fmezfq';
const g8 = 'https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/sskhxznpaphul2lyekkm';
const g9 = 'https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/bqcb7hzkflw4v9nhcpfb';
const g10 = 'https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/gsuh21bq4eiveiaklalz';
const g11 = 'https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/aulomipj8ukf4cboywbg';


const Home = () => {


  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 28,
    hours: 0,
    minutes: 32,
    seconds: 44,
  });

  const [currentGuest, setCurrentGuest] = useState(0);

  useEffect(() => {
    const targetDate = new Date('2025-03-07T00:00:00+05:30');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const nextGuests = () => {
    setCurrentGuest((prev) => (prev + 3 >= chiefGuests.length ? 0 : prev + 3));
  };

  const prevGuests = () => {
    setCurrentGuest((prev) => (prev - 3 < 0 ? chiefGuests.length - 3 : prev - 3));
  };

  const visibleGuests = chiefGuests.slice(currentGuest, currentGuest + 3);

  const particleOptions = {
    fullScreen: {
      enable: true,
      zIndex: -100,
    },
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 900,
        },
      },
      opacity: {
        value: 0.3,
      },
      size: {
        value: 2,
      },
      move: {
        speed: 1,
      },
    },
    fpsLimit: 120,
  };

  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCarouselVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const carouselElement = document.querySelector('.carousel');
    if (carouselElement) {
      observer.observe(carouselElement);
    }

    return () => observer.disconnect();
  }, []);

  // Timeline images
  const TimelineImage = memo(({ item }) => (
    <img
      src={item.image}
      alt={item.title}
      className="rounded-lg shadow-xl w-full"
    />
  ));

  // Carousel images
  const CarouselImage = memo(({ src, index }) => (
    <img
      src={src}
      alt={`Carousel image ${index + 1}`}
      className="w-72 h-80 object-cover rounded-lg"
    />
  ));

  // Chief guest images
  const ChiefGuestImage = memo(({ guest }) => (
    <div className="flex flex-col items-center">
      <img
        src={guest.image}
        alt={guest.name}
        className="w-full h-60 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold text-white">{guest.name}</h3>
      <p className="text-purple-400">{guest.role}</p>
    </div>
  ));

  return (
    <div className="relative w-full">
      <div className="bg-black text-white overflow-x-hidden">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particleOptions}
          className="absolute inset-0 z-0 hidden md:block pointer-events-none"
        />
        <div
          className="relative min-h-screen flex items-center justify-center bg-black p-4"
          ref={containerRef}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full rounded-3xl h-full object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-black/70" />

          <div className="flex flex-col gap-11">
            <div className="flex w-full md:hidden items-center justify-center">
              <motion.img
                src={kl}
                alt="SURABHI"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-40 object-contain sm:w-64 md:w-48 z-10"
              />
            </div>

            <motion.img
              src={logo}
              alt="SURABHI"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-60 object-contain sm:w-64 md:w-96 z-10"
            />
          </div>
        </div>
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-4 z-50 gap-4 text-center"
            >
              <div className="bg-purple-900/20 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-4xl md:text-6xl font-bold flip-card">
                  {String(timeLeft.days).padStart(2, "0")}
                </div>
                <div className="text-sm mt-2">Days</div>
              </div>
              <div className="bg-purple-900/20 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-4xl md:text-6xl font-bold flip-card">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div className="text-sm mt-2">Hours</div>
              </div>
              <div className="bg-purple-900/20 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-4xl md:text-6xl font-bold flip-card">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <div className="text-sm mt-2">Minutes</div>
              </div>
              <div className="bg-purple-900/20 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-4xl md:text-6xl font-bold flip-card">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <div className="text-sm mt-2">Seconds</div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-saint-carell font-bold mb-6 md:mb-8 text-center text-white"
          >
            What about Surabhi
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-300 z-50"
            >
              <p>
                Surabhi 2025 is a two-day International Cultural fest hosted by KL University, celebrating student creativity through music, dance, drama, and artistic expression. Featuring renowned artists alongside exceptional student talent, the event showcases diversity in a vibrant and supportive environment. This year, the fest is focused on overcoming past challenges to deliver an enriched and memorable experience for both participants and attendees.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-full aspect-video rounded-lg overflow-hidden">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/LrSxZu86Jn0?si=WYeoEUB_ygvzPoqF&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
              <a
                href="https://youtu.be/LrSxZu86Jn0"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-colors duration-300"
              >
                <FaYoutube className="text-xl" />
                View on YouTube
              </a>
            </motion.div>
          </div>
        </div>


        <div className="py-16 ">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-saint-carello md:text-6xl font-bold text-white mb-4">
                How to Participate?
              </h2>
              <div className="w-1/3 h-1 bg-purple-400 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
              {participationSteps.map((step, index) => (
                <div
                  key={step.id}
                  className="relative bg-purple-900/20 rounded-xl p-8 backdrop-blur-sm border border-purple-500/20 group hover:border-purple-500/40 transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_-10px_rgba(196,130,252,0.2)]"
                >

                  <div className="absolute -top-6 left-6 w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-2xl font-bold text-white transform -rotate-12 group-hover:rotate-0 transition-transform duration-300 shadow-lg">
                    {step.id}
                  </div>
                  {index !== participationSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 right-0 w-8 h-0.5 bg-purple-500/20 transform translate-x-full" />
                  )}
                  <Link to="/events" className="mt-8">
                    <h3 className="text-2xl font-bold text-purple-400 mb-4 group-hover:text-purple-300 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                      {step.description}
                    </p>
                  </Link>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chief Guest Section */}
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-saint-carell font-bold mb-6 md:mb-8 text-center text-white"
          >
            Previous Chief Guests
          </motion.h2>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {visibleGuests.map((guest, index) => (
                <ChiefGuestImage key={index} guest={guest} />

              ))}
            </div>

            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={prevGuests}
                className="bg-purple-900/50 p-2 rounded-full hover:bg-purple-900 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextGuests}
                className="bg-purple-900/50 p-2 rounded-full hover:bg-purple-900 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative max-w-6xl mx-auto px-4 py-16"
          style={{ overflow: "hidden" }}
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-saint-carell font-bold mb-12 text-center z-50"
          >
            Our Journey
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <motion.div
              className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-1 h-full bg-purple-900"
              style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            />

            {/* Timeline items */}
            {timelineData.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`flex flex-col  sm:flex-row items-start sm:items-center mb-16 sm:mb-24 ${index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
              >
                <div className="w-full sm:w-1/2 pl-12 sm:px-8 mb-4 sm:mb-0">
                  <TimelineImage item={item} />
                </div>
                <div className="w-full sm:w-1/2 pl-12 sm:px-8">
                  <div className="bg-purple-900/20 p-4 sm:p-6 rounded-lg">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">
                      {item.year}
                    </h3>
                    <h4 className="text-lg sm:text-xl text-purple-400 mb-3">
                      {item.title}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="guests">
          <div className="scroll-container">
            <div className="imgscroll">
              <img src={g1} alt="" className="g1" />
              <img src={g2} alt="" className="g1" />
              <img src={g3} alt="" className="g1" />
              <img src={g4} alt="" className="g1" />
              <img src={g5} alt="" className="g1" />
              <img src={g6} alt="" className="g1" />
              <img src={g7} alt="" className="g1" />
              <img src={g8} alt="" className="g1" />
              <img src={g9} alt="" className="g1" />
              <img src={g10} alt="" className="g1" />
              <img src={g11} alt="" className="g1" />

            </div>
          </div>
        </div>

        {/* Our Partners Section */}

        <div className="w-full py-12 sm:py-16 px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-saint-carell font-bold mb-8 sm:mb-12 text-center z-50"
          >
            Our Partners
          </motion.h2>
          <div className="">
            <div className="flex justify-center">
              <img src={partner} alt="" className="g1 h-32 w-80" />

            </div>
          </div>

        </div>

        {/* Map Section */}
        <div className="w-full py-12 sm:py-16 px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-saint-carell font-bold mb-8 sm:mb-12 text-center z-50  "
          >
            Find Us Here
          </motion.h2>
          <div className="max-w-6xl flex justify-center rounded-2xl mx-auto h-[300px] sm:h-[400px] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.6199592497847!2d80.62045731486546!3d16.441945088657577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f0a2a7d81943%3A0x8ba5d78f65df94b8!2sK%20L%20University!5e0!3m2!1sen!2sin!4v1677834271952!5m2!1sen!2sin&key=YOUR_GOOGLE_MAPS_API_KEY"
              width="80%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="rounded-2xl z-50"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
