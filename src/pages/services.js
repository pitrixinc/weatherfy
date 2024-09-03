import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import React from 'react'

const services = () => {
  return (
    <div>
        <NavBar/>

        <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">Our Services</h1>
        <p className="text-lg text-gray-700">
          We offer a range of services to meet your weather forecasting needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="bg-white bg-opacity-40 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Personalized Weather Reports</h2>
          <p className="text-lg text-gray-700 mb-4">
            Get customized weather reports tailored to your specific location and needs. Our advanced algorithms ensure that you receive the most accurate and up-to-date information.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold">Learn more</a>
        </div>

        <div className="bg-white bg-opacity-40 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Severe Weather Alerts</h2>
          <p className="text-lg text-gray-700 mb-4">
            Stay safe with our real-time severe weather alerts. We monitor extreme weather conditions and send you instant notifications to keep you informed and prepared.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold">Learn more</a>
        </div>

        <div className="bg-white bg-opacity-40 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Climate Monitoring</h2>
          <p className="text-lg text-gray-700 mb-4">
            Track long-term climate trends with our comprehensive climate monitoring services. We provide detailed reports and analysis to help you understand the changing climate.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold">Learn more</a>
        </div>

        <div className="bg-white bg-opacity-40 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Agricultural Forecasting</h2>
          <p className="text-lg text-gray-700 mb-4">
            Optimize your farming operations with our agricultural forecasting services. We provide weather insights that help you make informed decisions about planting, irrigation, and harvesting.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold">Learn more</a>
        </div>

        <div className="bg-white bg-opacity-40 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Marine Weather Services</h2>
          <p className="text-lg text-gray-700 mb-4">
            Ensure safe maritime activities with our marine weather services. We offer detailed forecasts and alerts for ocean and coastal conditions, helping you navigate safely.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold">Learn more</a>
        </div>

        <div className="bg-white bg-opacity-40 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Aviation Weather Services</h2>
          <p className="text-lg text-gray-700 mb-4">
            Enhance flight safety with our aviation weather services. We provide accurate weather information for pilots and airlines to ensure smooth and safe flights.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold">Learn more</a>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default services