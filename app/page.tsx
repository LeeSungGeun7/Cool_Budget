"use client"
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';


export const users = [
  {
    name: '메인페이지',
    designation: 'Founder, Algochurn',
    image: 'https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/91434b56-9194-48c9-62d8-25290d8fa400/medium',
    badge: 'Main',
  },
  {
    name: '차트',
    designation: "Founder, Sarah's Kitchen",
    image: 'https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/9d1a2e67-f2ae-4d7d-adc1-73659bbfef00/medium',
    badge: 'chart',
  },
  {
    name: '생성',
    designation: 'Founder, Algochurn',
    image: 'https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/d12d5f29-d7fa-4de7-f6fa-106c54fbba00/medium',
    badge: 'temp',
  },
  {
    name: '관리',
    designation: "Founder, Sarah's Kitchen",
    image: 'https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/e8bfb108-4105-4da1-2bb6-64a319088600/medium',
    badge: 'login',
  },
  // Rest of the users...
];

export const Scroll = () => {
  return (
    <div className="flex flex-col bg-white h-screen w-screen">
      <ScrollCore />
    </div>
  );
};
 const ScrollCore = () => {
  const { scrollYProgress } = useScroll();

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className=" h-[120vh] transform scale-[0.8] p-10 flex items-center justify-center relative ">
      <div
        className=" py-40 w-full relative"
        style={{
          perspective: '1000px',
        }}
      >
         <Header translate={translate} />
        <Card rotate={rotate} translate={translate} scale={scale} />
      </div>
    </div>
  );
};

export const Header = ({ translate }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      <h1 className="m-8 text-4xl font-semibold">
        Welcome <br />{' '}
        <span className="text-5xl lg:text-6xl  font-bold mt-1 leading-none">
           My Budget
        </span>
      </h1>
    </motion.div>
  );
};

export default ScrollCore;


export const Card = ({
  rotate,
  scale,
  translate,
}: {
  rotate: any;
  scale: any;
  translate: any;
}) => {
  const route = useRouter();
  return (
    <motion.div
      style={{
        rotateX: rotate, // rotate in X-axis
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className=" max-w-5xl -mt-12 mx-auto h-[40rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="bg-gray-100 h-full w-full rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden p-4">
        {users.map((user, idx) => (
          <motion.div
            key={`user-${idx}`}
            className="bg-white rounded-md cursor-pointer relative"
            style={{ translateY: translate }}
            whileHover={{
              boxShadow:
                '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
            }}
          >
            <div onClick={()=>{if(user.badge ==="Main") return;route.push(`/${user.badge}`); }} className=" absolute top-2 right-2 rounded-full text-xs font-bold hover:bg-black hover:text-white bg-white px-2 py-1">
              {user.badge}
            </div>
            <motion.img
            
              drag 
              whileTap={{
                opacity: 1,
                scale: 1.05,
                boxShadow: "0px 5px 8px #222",
            }}
              whileDrag={{
                scale: 1.1, boxShadow: "0px 10px 16px #222"
              }}
              src={user.image}
              className="h-[90%] rounded-tr-md rounded-tl-md text-sm "
            />
            <div className="flex justify-center items-center p-2 ">
              <h1 className="font-semibold text-sm ">{user.name}</h1>
              {/* <h2 className=" text-gray-500 text-xs ">{user.designation}</h2> */}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};