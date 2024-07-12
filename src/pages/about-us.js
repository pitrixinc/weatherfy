import About from '@/components/About'
import NavBar from '@/components/NavBar'
import React from 'react'

const AboutUs = () => {
  return (
    <div>
        <NavBar/>
        <About/>

        <div className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900">Who We Are</h2>
            <p className="mt-4 text-lg text-gray-600">
            Weatherfy is a cutting-edge weather forecasting company committed to providing accurate and reliable weather information to individuals and businesses worldwide. 
            Founded in 2021, Weatherfy has rapidly grown to become a trusted name in the industry, thanks to our dedication to innovation, precision, and customer satisfaction.
            Weatherfy was born out of a passion for meteorology and a desire to make high-quality weather data accessible to everyone.
            Our journey began with a small team of meteorologists and data scientists who were determined to revolutionize weather forecasting. Over the years, we have expanded our team, enhanced our technology, and broadened our reach to serve millions of users globally.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              <p className="mt-4 text-gray-600">
              Our mission at Weatherfy is to empower people with the information they need to make informed decisions, stay safe, and thrive, regardless of the weather conditions. We aim to deliver the most accurate, 
              timely, and user-friendly weather forecasts through our state-of-the-art technology and expert analysis.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              <p className="mt-4 text-gray-600">
              We envision a world where everyone has access to reliable weather information at their fingertips, enabling them to navigate their daily lives and plan for the future with confidence. Weatherfy strives to be the leading global provider of weather data and insights, 
              continuously pushing the boundaries of what is possible in weather forecasting.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center">Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-gray-800">Integrity</h4>
                <p className="mt-4 text-gray-600">
                  [Placeholder for company value. Explain the importance of integrity within your company.]
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-gray-800">Innovation</h4>
                <p className="mt-4 text-gray-600">
                  [Placeholder for company value. Highlight how innovation drives your business.]
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-gray-800">Customer Focus</h4>
                <p className="mt-4 text-gray-600">
                  [Placeholder for company value. Describe your commitment to customer satisfaction.]
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center">Our Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img className="h-24 w-24 rounded-full mx-auto" src="/path/to/image" alt="Team member photo" />
                <h4 className="text-xl font-semibold text-gray-800 mt-4">John Doe</h4>
                <p className="text-gray-600">CEO</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img className="h-24 w-24 rounded-full mx-auto" src="/path/to/image" alt="Team member photo" />
                <h4 className="text-xl font-semibold text-gray-800 mt-4">Jane Smith</h4>
                <p className="text-gray-600">CTO</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img className="h-24 w-24 rounded-full mx-auto" src="/path/to/image" alt="Team member photo" />
                <h4 className="text-xl font-semibold text-gray-800 mt-4">Alice Johnson</h4>
                <p className="text-gray-600">CFO</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img className="h-24 w-24 rounded-full mx-auto" src="/path/to/image" alt="Team member photo" />
                <h4 className="text-xl font-semibold text-gray-800 mt-4">Bob Brown</h4>
                <p className="text-gray-600">COO</p>
              </div>
            </div>
          </section>

          <section className="text-center">
            <h3 className="text-2xl font-bold text-gray-900">Contact Us</h3>
            <p className="mt-4 text-gray-600">
              [Placeholder for contact information. Include email, phone number, and address.]
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default AboutUs