'use client'
import MainHeading from '@/components/MainHeading'
import SubHeading from '@/components/SubHeading'
import Lottie from 'lottie-react'
import React from 'react'
import aiAnimtion from '../../../public/assits/Animation - 1749905762875.json'
const AboutPage = () => {
  return (
    <section className='container mb-0'>
      <MainHeading title={'About'} />
      <div className='flex flex-col md:flex-row gap-5 justify-around'>
        <div className='p-5 pt-10 w-[90%] mx-auto md:w-[50%]'>
          <SubHeading title='AI Tools: Transforming Today, Shaping Tomorrow' />
          <p className='mt-4 text-base text-pretty text-gray-600 sm:text-lg/relaxed'>
            In today&apos;s fast-paced digital world, AI tools are revolutionizing the way we work and live. By analyzing vast amounts of data and performing complex tasks with speed and precision, they save us time and effort across various fields—from healthcare to education and entertainment. These smart technologies are no longer a luxury but a necessity, simplifying daily life and unlocking new possibilities for creativity and efficiency. AI is not just the future; it&apos;s the present, making everything easier and smarter.
          </p>
        </div>
        <div className='hidden sm:block'>
          <Lottie className='h-[500px]' animationData={aiAnimtion} loop={true} />
        </div>

      </div>
    </section>
  )
}

export default AboutPage