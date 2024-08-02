// components/WeatherBlog.js
import React, { useState } from 'react';
import { sampleBlogs } from '../../data/sampleBlogs';
import Modal from './Modal';

const WeatherBlog = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  const getRandomBlogs = (blogs, count) => {
    const shuffled = blogs.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const blogsToDisplay = getRandomBlogs(sampleBlogs, 4);

  return (
    <div className="weather-blog">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Weather News</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
        {blogsToDisplay.map((blog) => (
          <div
            key={blog.id}
            className="bg-white bg-opacity-40 p-4 rounded-lg shadow-md flex items-center cursor-pointer"
            onClick={() => openModal(blog)}
          >
            <img src={blog.image} alt={blog.title} className="w-24 h-24 rounded-lg object-cover" />
            <div className="ml-4 flex-1">
              <h3 className="text-xl font-bold text-blue-600 hidden md:block lg:block">{blog.title}</h3>
              <p className="text-blue-800">
                {blog.description.length > 100 ? `${blog.description.slice(0, 100)}...` : blog.description}
              </p>
              <div className="flex items-center mt-2">
                <img src={blog.author.image} alt={blog.author.name} className="w-8 h-8 rounded-full object-cover mr-2" />
                <span className="text-blue-500">{blog.author.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && selectedBlog && <Modal blog={selectedBlog} closeModal={closeModal} />}
    </div>
  );
};

export default WeatherBlog;
