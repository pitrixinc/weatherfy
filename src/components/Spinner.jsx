import Image from 'next/image';
import React from 'react';
import spinner from '../../public/spinner.gif';

const Spinner = () => {
  return (
    <>
      <img className='w-[200px] m-auto block' src={spinner} alt='loading..' />
    </>
  );
};

export default Spinner;
