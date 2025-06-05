import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from './Card';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emails, setEmails] = useState([]);
  const [showEmails, setShowEmails] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events/scrape");
        const data = await res.json();
        setEvents(data.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const fetchEmails = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events/all");
      setEmails(res.data);
      setShowEmails(true);
    } catch (err) {
      console.error('Failed to fetch emails:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-700">
        Loading events...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Upcoming Events in Sydney</h1>
        <button
          onClick={fetchEmails}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          Show Registered Emails
        </button>
      </div>

      {/* Show Emails */}
      {showEmails && (
        <div className="bg-white shadow p-4 mb-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Registered Emails</h2>
          {emails.length > 0 ? (
            <ul className="list-disc list-inside text-gray-800">
              {emails.map((user, idx) => (
                <li key={idx}>{user.email}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No emails registered yet.</p>
          )}
        </div>
      )}

      {/* Events Grid */}
      {events.length === 0 ? (
        <p className="text-center text-gray-600">No events found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Event;
