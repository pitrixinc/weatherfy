import NavBar from '@/components/NavBar'
import React from 'react'

const ContactUs = () => {
  return (
    <div>
        <NavBar/>

        <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-blue-600">Contact Us</h1>
        <p className="text-lg text-gray-700">
          We're here to help and answer any questions you might have. We look forward to hearing from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-semibold mb-6 text-blue-600">Contact Information</h2>
          <div className="text-lg text-gray-700 mb-6">
            <p className="mb-4">
              <strong className="text-blue-600">Address:</strong>
              <br />
              Greater Accra
              <br />
              Tessano, WC 56789
            </p>
            <p className="mb-4">
              <strong className="text-blue-600">Phone:</strong>
              <br />
              +1 (123) 456-7890
            </p>
            <p className="mb-4">
              <strong className="text-blue-600">Email:</strong>
              <br />
              support@weatherfy.com
            </p>
            <p className="mb-4">
              <strong className="text-blue-600">Business Hours:</strong>
              <br />
              Monday - Friday: 9:00 AM - 6:00 PM
              <br />
              Saturday: 10:00 AM - 4:00 PM
              <br />
              Sunday: Closed
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="#" className="text-blue-500 hover:text-blue-700">
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-600">
                <i className="fab fa-twitter fa-2x"></i>
              </a>
              <a href="#" className="text-pink-600 hover:text-pink-800">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <img
            src="https://www.researchgate.net/publication/323676238/figure/fig1/AS:602492559716357@1520656828940/Map-of-Accra-Metropolis-Google-Map.png"
            alt="Company location map"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
    </div>
  )
}

export default ContactUs