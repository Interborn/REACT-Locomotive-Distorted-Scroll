import React, { useEffect, useRef } from "react";
import photos from "./data";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/src/locomotive-scroll.scss";
import GridItem from "./GridItem";
import imagesLoaded from "imagesloaded";
import "./index.css";

const clamp = (value, min, max) =>
  value <= min ? min : value >= max ? max : value;

const preloadImages = (selector) => {
  return new Promise((resolve) => {
    imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
  });
};

function Home() {
  const ref = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const middleColumnRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: ref.current,
      smooth: true,
      smartphone: {
        smooth: true,
      },
      getDirection: true,
      getSpeed: true,
    });

    scroll.on("scroll", ({ scroll }) => {
      const distance = scroll.y - scroll.lastY;
      scroll.lastY = scroll.y;

      leftColumnRef.current.style.transform = `skewY(${clamp(distance, -10, 10)}deg)`;
      rightColumnRef.current.style.transform = `skewY(${clamp(distance, -10, 10)}deg)`;
      middleColumnRef.current.style.transform = `skewY(${clamp(-distance, -10, 10)}deg)`;
    });

    Promise.all([preloadImages(".grid-item-media")]).then(() => {
      scroll.update();
    });

    return () => {
      scroll.destroy();
    };
  }, []);

  const leftChunk = photos.slice(0, Math.round(photos.length * 0.33));
  const middleChunk = photos.slice(Math.round(photos.length * 0.33), Math.round(photos.length * 0.66));
  const rightChunk = photos.slice(Math.round(photos.length * 0.66), photos.length);

  return (
    <main className="main-container overflow-hidden" id="main-container" data-scroll-container ref={ref}>
      <div className="photo-header w-[100vw] h-[100vh] lg:px-48 flex lg:flex-row flex-col justify-center items-center">
        <div className="lg:w-[40%] w-full">
          <img src={'https://mymodernmet.com/wp/wp-content/uploads/2021/12/kristina-makeeva-eoy-photo-1.jpeg'} alt="image" className="sm:rounded-3xl lg:max-w-[85%]" />
        </div>
        <div className="lg:w-[60%] w-full h-full flex flex-col justify-center items-start mx-8 lg:mx-0">
          <h1 className="text-[70px] font-bold">Photo &  Blocks of Text</h1>
          <p className="text-[24px] mt-16 lg:max-w-[50ch]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque optio maxime nemo illum ipsa amet saepe, numquam illo dolores, quae animi dolorum quam obcaecati adipisci minus hic eius exercitationem. Natus?</p>
        </div>
      </div>
      <div className="grid-wrap px-8 grid lg:grid-cols-3 grid-cols-2 gap-8 justify-center mx-auto">
        <div className="left-column pointer-events-none" ref={leftColumnRef}>
          {leftChunk.map((blogpost, index) => (
            <GridItem key={blogpost.url} url={blogpost.url} description={blogpost.description} index={index} />
          ))}
        </div>
        <div className="middle-column pointer-events-none" data-scroll data-scroll-speed="-20">
          <div ref={middleColumnRef}>
            {middleChunk.map((blogpost, index) => (
              <GridItem key={blogpost.url} url={blogpost.url} description={blogpost.description} index={index} />
            ))}
          </div>
        </div>
        <div className="right-column pointer-events-none" ref={rightColumnRef}>
          {rightChunk.map((blogpost, index) => (
            <GridItem key={blogpost.url} url={blogpost.url} description={blogpost.description} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;