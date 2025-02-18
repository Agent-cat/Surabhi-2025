import React, { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";



const Gallery = () => {
  const [selectedEvent, setSelectedEvent] = useState("Vastrashala");
  const [selectedImage, setSelectedImage] = useState(null);

  // Define events first with memoization
  const events = useMemo(() => ({
    Natayaka: [
      {
        image: "https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/rujqmccrolwh0mauzdjl"
      },
      {
        image: "https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/lp8qbr0ayhm45zrklyox"
      },
      {
        image: "https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/uc7xng6t2idqpz6xi3bt"
      },
      {
        image: "https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/uc7xng6t2idqpz6xi3bt"
      },
      {
        image: "https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/cbc7crd4sugm1efgrcmx"
      },

    ],
    Chitrakala: [
      {
        image: "https://res.cloudinary.com/vishnu2005/image/upload/f_auto,q_auto/imojqcrvc6zh00bgdgrl"
      },
      {
        image: "https://res.cloudinary.com/vishnu2005/image/upload/f_auto,q_auto/zrvhpewod57jo60284xl"
      },
      {
        image: "https://res.cloudinary.com/vishnu2005/image/upload/f_auto,q_auto/imojqcrvc6zh00bgdgrl"
      },



    ],
    Nritya: [
      {
        image: "https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/sf4pvcmerjbmjodbbkzu"
      },
      {
        image: "https://res.cloudinary.com/vishnu2005/image/upload/f_auto,q_auto/prvyhc1ymgir2ddxcqbf"
      },
      {
        image: "https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/z9azkalce0atetbo2bup"
      },
      {
        image: "https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/z9azkalce0atetbo2bup"
      },
      { image: "https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/bzy6v6yvficpfg1whfxy" },

    ],
    Raaga: [
      {
        image: "https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/aia96c9di15gcxdzl8yg"
      },
      {
        image: "https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/fsxw9jyttztqcvz1leml"
      },
      { image: "https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/u4tkqqbbjq5gyhundtvb" },
      {
        image: "https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/hpycdwp1subfmwsrpgd8"
      },
      { image: "https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/u4tkqqbbjq5gyhundtvb" },


    ],
    CineCarnival: [
      { image: "https://i.imghippo.com/files/vtIK7188pAI.jpg" },
      { image: "https://i.imghippo.com/files/WHXl6230xw.jpg" },
      { image: "https://i.imghippo.com/files/im2573eg.jpg" },
      { image: "https://i.imghippo.com/files/agB4246MHA.jpg" },
      { image: "https://i.imghippo.com/files/fLa2578Yis.jpg" },
      { image: "https://i.imghippo.com/files/sLmQ8981xMs.jpg" },
      { image: "https://i.imghippo.com/files/sLmQ8981xMs.jpg" },
      { image: "https://i.imghippo.com/files/EUa6624jVk.jpg" },
    ],
    Sahithya: [
      {
        image: "https://res.cloudinary.com/vishnu2005/image/upload/f_auto,q_auto/xkwmveyttcxd7qg5x0dr"
      },
      {
        image: "https://res.cloudinary.com/vishnu2005/image/upload/f_auto,q_auto/ayelavartxdknw9eb8xe"
      },
      {
        image: "https://res.cloudinary.com/vishnu2005/image/upload/f_auto,q_auto/vbu9x52ys5ju3rmuqjag"
      },
      {
        image: "https://res.cloudinary.com/vishnu2005/image/upload/f_auto,q_auto/bnlo5ppknymul0n7j7n8"
      },
      {
        image: "https://res.cloudinary.com/vishnu2005/image/upload/f_auto,q_auto/c5m8ydmaw6yfp5ulfqsr"
      },
      {
        image: "https://res.cloudinary.com/vishnu2005/image/upload/f_auto,q_auto/wcn0ek9ztpo7uuu5nmmc "
      },

    ],
    Vastrashala: [
      {
        image: "https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/jnpqqarwsfgmiyyta4wp"
      },
      {
        image: "https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/obotkukt4aqcfjwxzxnc"
      },
      {
        image: "https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/pt6cw3chmhb7lbasc4yh"//ndadna
      },
      {
        image: "https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/pt6cw3chmhb7lbasc4yh"
      },
      {
        image: "https://res.cloudinary.com/vishnu2005/image/upload/f_auto,q_auto/ifpoieisg5iulkehjwps"
      },
      {
        image: "https://res.cloudinary.com/vishnu2005/image/upload/f_auto,q_auto/xbluwxy3qjejnxfnhlvh"
      },
      {
        image: "https://res.cloudinary.com/vishnu2005/image/upload/f_auto,q_auto/j3ytvfppkftixjg44lmr"
      },
      { image: "https://res.cloudinary.com/djr4t6hid/image/upload/f_auto,q_auto/n0x73xxjpe49j8xylc3h" },

    ],
  }), []);

  // Optimize current event items calculation
  const currentEventItems = useMemo(() => {
    return events[selectedEvent] || [];
  }, [events, selectedEvent]);

  // Optimize image loading with intersection observer
  const LQIP = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="; // 1x1 pixel transparent gif

  useEffect(() => {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      },
      { rootMargin: '50px' }
    );

    const images = document.querySelectorAll('.lazy-image');
    images.forEach(img => {
      img.src = LQIP; // Set LQIP as initial source
      imageObserver.observe(img);
    });

    return () => {
      images.forEach(img => imageObserver.unobserve(img));
    };
  }, [selectedEvent]);

  // Optimize event selection
  const handleEventSelect = useCallback((eventName) => {
    setSelectedEvent(eventName);
  }, []);

  // Optimize image selection
  const handleImageSelect = useCallback((image) => {
    setSelectedImage(image);
  }, []);

  // Optimize image close
  const handleImageClose = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // Optimize image rendering with memo
  const ImageComponent = React.memo(({ image, onClick, className }) => (
    <img
      className={`lazy-image ${className}`}
      data-src={image}
      src={LQIP}
      srcSet={
        `${image}?w=300 300w, ${image}?w=600 600w, ${image}?w=900 900w`
      }
      sizes="(max-width: 600px) 300px, (max-width: 900px) 600px, 900px"
      alt="Event"
      onClick={onClick}
      loading="lazy"
      decoding="async"
    />
  ));

  return (
    <div className="min-h-screen bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pt-20">
        <motion.h1
          className="text-6xl md:text-7xl text-center font-playfair bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Gallery
        </motion.h1>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(events).map((eventName, index) => (
            <motion.button
              key={eventName}
              className={`px-6 py-3 rounded-full text-lg font-medium transition-all relative
                ${selectedEvent === eventName
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                  : "bg-purple-900/30 text-purple-300 hover:bg-purple-800/40"
                }
                before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full 
                before:border-2 before:border-purple-500 before:rounded-full before:opacity-0 
                hover:before:opacity-100 before:transition-all before:duration-300 before:scale-110
                hover:before:scale-100`}
              onClick={() => handleEventSelect(eventName)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {eventName.replace(/([A-Z])/g, " $1").trim()}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedEvent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8"
          >
            {[0, 1, 2, 3].map((rowIndex) => {
              const items = currentEventItems.slice(
                rowIndex * 3,
                (rowIndex + 1) * 3
              );

              if (!items.length) return null;

              return (
                <motion.div
                  key={rowIndex}
                  className="grid grid-cols-12 gap-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: rowIndex * 0.1 }}
                >
                  {rowIndex % 2 === 0 ? (
                    <>
                      <motion.div
                        className="col-span-8 aspect-video bg-gradient-to-br from-purple-900/30 to-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer"
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 0 20px rgba(147, 51, 234, 0.2)",
                        }}
                        transition={{ duration: 0.3 }}
                        onClick={() => handleImageSelect(items[0]?.image)}
                      >
                        {items[0]?.image && (
                          <ImageComponent
                            image={items[0].image}
                            onClick={() => handleImageSelect(items[0].image)}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                      </motion.div>
                      <motion.div
                        className="col-span-4 aspect-square bg-gradient-to-br from-purple-900/30 to-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer"
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 0 20px rgba(147, 51, 234, 0.2)",
                        }}
                        transition={{ duration: 0.3 }}
                        onClick={() => handleImageSelect(items[1]?.image)}
                      >
                        {items[1]?.image && (
                          <ImageComponent
                            image={items[1].image}
                            onClick={() => handleImageSelect(items[1].image)}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        className="col-span-4 aspect-square bg-gradient-to-br from-purple-900/30 to-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer"
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 0 20px rgba(147, 51, 234, 0.2)",
                        }}
                        transition={{ duration: 0.3 }}
                        onClick={() => handleImageSelect(items[0]?.image)}
                      >
                        {items[0]?.image && (
                          <ImageComponent
                            image={items[0].image}
                            onClick={() => handleImageSelect(items[0].image)}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                      </motion.div>
                      <motion.div
                        className="col-span-8 aspect-video bg-gradient-to-br from-purple-900/30 to-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer"
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 0 20px rgba(147, 51, 234, 0.2)",
                        }}
                        transition={{ duration: 0.3 }}
                        onClick={() => handleImageSelect(items[1]?.image)}
                      >
                        {items[1]?.image && (
                          <ImageComponent
                            image={items[1].image}
                            onClick={() => handleImageSelect(items[1].image)}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                      </motion.div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
              onClick={handleImageClose}
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                className="relative w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src={selectedImage}
                  alt="Full size"
                  className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg"
                />
                <button
                  onClick={handleImageClose}
                  className="absolute top-4 right-4 text-white rounded-full p-2 hover:scale-150 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default React.memo(Gallery);