import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';

const Card = ({ title, date_time, venue, price, link, image }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleBookSlot = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('BASE_URL="https://sydney-web-backend.vercel.app/api/events/details', { email});
      setIsOpen(false);
      window.open(link, '_blank'); // Open event link in new tab
    } catch (err) {
      console.error('Error submitting email:', err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 max-w-md mx-auto">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-xl" />
      <h2 className="text-xl font-semibold mt-2">{title}</h2>
      <p className="text-gray-600"><strong>Date:</strong> {date_time}</p>
      <p className="text-gray-600"><strong>Venue:</strong> {venue}</p>
      <p className="text-green-600 font-bold"> <strong>Price:</strong> {price}</p>
      <button
        onClick={handleBookSlot}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Book Slot
      </button>

      {/* Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-full max-w-sm rounded bg-white p-6">
            <Dialog.Title className="text-lg font-semibold mb-4">Enter Your Email</Dialog.Title>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="mr-2 text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit & Go
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Card;
