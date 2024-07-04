import React from 'react'
import '../components/styles.css'
// import { ReactComponent as loader } from '../assets/loader.svg';

const Loader = ({text}) => {
  return (
    <div className="fixed inset-0 z-30 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <div className="loader"></div>
      <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">{text} <br /> Please wait...</p>
    </div>
  )
}

export default Loader 