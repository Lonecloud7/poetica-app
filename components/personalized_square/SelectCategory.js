import React from 'react';
import Image from 'next/image';
import SecondaryButton from '../button/SecondaryButton';
import BlackButton from '../button/BlackButton';
import { motion } from 'framer-motion';

const SelectCategory = ({ categories, setTab }) => {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className='bg-indigo-700' style={{ flex: '1 1 auto' }}>
      <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
        <div className='max-w-xl sm:mx-auto lg:max-w-2xl'>
          {/* <div className="container px-5 py-24 mx-auto"> */}
          <div className='flex flex-col text-center w-full mb-10'>
            <div className='mb-6 mx-auto'>
              <div className='flex items-center justify-center w-12 h-12 rounded-full bg-teal-accent-400'>
                <Image
                  src='/assets/icons/pen.png'
                  alt='pen-emoji'
                  width={80}
                  height={80}
                />
              </div>
            </div>
            <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl mx-auto'>
              Pick category to generate words from
            </h2>
            <p className='text-base text-indigo-100 md:text-lg'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
              aliquid expedita, inventore architecto maxime odio dolore magni
              incidunt accusamus.
            </p>
          </div>
          <div>
            <motion.ul
              variants={container}
              initial='hidden'
              animate='visible'
              className='flex flex-wrap justify-center text-center -m-2 gap-4'
            >
              {categories.map((category, i) => {
                return (
                  <motion.li variants={item} className='p-2' key={i}>
                    <SecondaryButton
                      text={category.category}
                      onClick={() => setTab(4)}
                    />
                  </motion.li>
                );
              })}
              <motion.li key='ready-button' variants={item} className='w-full'>
                <div className='w-full flex flex-col gap-4 items-center mt-10'>
                  <BlackButton text='Previous' onClick={() => setTab(2)} />
                </div>
              </motion.li>
            </motion.ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCategory;
