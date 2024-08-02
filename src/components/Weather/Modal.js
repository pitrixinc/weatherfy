// components/Modal.js
import React from 'react';

const Modal = ({ blog, closeModal }) => {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative m-2 h-[500px] overflow-y-auto">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-red-500 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-xl md:text-2xl lg:text-2xl font-bold text-blue-800 mb-4">{blog.title}</h2>
        <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-lg mb-4" />
        <p className="text-blue-800 mb-4">{blog.description}</p>
        <div className="flex items-center mt-2">
          <img src={blog.author.image} alt={blog.author.name} className="w-8 h-8 rounded-full object-cover mr-2" />
          <span className="text-blue-500">{blog.author.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
