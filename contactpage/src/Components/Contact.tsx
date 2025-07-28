import React from 'react';
import Lottie from 'lottie-react';
import contactAnimation from '../assets/lottie/Connect with us.json';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
        <Lottie
          animationData={contactAnimation}
          loop
          className="w-80 h-80"
        />
      </div>
      <div className="w-full md:w-1/2 max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Contact Us</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-600">Message</label>
            <textarea
              id="message"
              rows={4}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Your message..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>
        </form>
        <div className="flex justify-center space-x-6 mt-6">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-600">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5 3.66 9.13 8.44 9.93v-7.03H7.9v-2.9h2.54V9.82c0-2.5 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.8 8.44-4.93 8.44-9.93z" />
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-700">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.793-1.75-1.732 0-.939.784-1.732 1.75-1.732s1.75.793 1.75 1.732c0 .939-.784 1.732-1.75 1.732zm13.5 11.268h-3v-5.604c0-3.367-4-3.108-4 0v5.604h-3v-10h3v1.513c1.396-2.586 7-2.777 7 2.476v6.011z"/>
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-400">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.611 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.72 0-4.924 2.204-4.924 4.924 0 .386.045.762.127 1.124-4.092-.205-7.72-2.166-10.148-5.144-.424.724-.666 1.562-.666 2.475 0 1.708.87 3.216 2.191 4.099-.807-.026-1.566-.247-2.228-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.6 3.419-1.68 1.318-3.809 2.105-6.102 2.105-.395 0-.779-.023-1.17-.067 2.179 1.397 4.768 2.213 7.548 2.213 9.057 0 14.002-7.513 14.002-14.03 0-.21-.005-.423-.014-.632.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
