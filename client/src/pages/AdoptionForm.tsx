// If we have time then we should make this form a little bit more dynamic and add styling to it.
// This area should pull information from the postgres database in the user profile page and populate the form with the user's information.
// There will also be additional fields that the user will need to fill out.
// We also need to figure out where to send this information once it is submitted. Should go to an admin location for approval, maybe an admin email address.

import React, { useState, useEffect } from "react";

const AdoptionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    user_address: "",
    pet_id: "",
    pet_name: "",
    pet_type: "",
    pet_breed: "",
    pet_age: "",
    reason: "",
  });

  useEffect(() => {
    // Fetch user data from the database (mocked here for simplicity)
    const fetchUserData = async () => {
      const userData = {
        user_name: "John Doe",
        user_email: "john.doe@example.com",
        user_phone: "123-456-7890",
        user_address: "123 Main St, Springfield",
      };
      setFormData((prevData) => ({
        ...prevData,
        ...userData,
      }));
    };

    fetchUserData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // We need to add an API integration to save the form to the database
    // Send a copy to the admin email for review
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Adopt a Pet
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-600 font-medium mb-1"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-600 font-medium mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-gray-600 font-medium mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="user_phone"
              value={formData.user_phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-gray-600 font-medium mb-1"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="user_address"
              value={formData.user_address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your address"
              required
            />
          </div>

          <div>
            <label
              htmlFor="petName"
              className="block text-gray-600 font-medium mb-1"
            >
              Pet Name
            </label>
            <input
              type="text"
              id="petName"
              name="pet_name"
              value={formData.pet_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter the pet's name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="reason"
              className="block text-gray-600 font-medium mb-1"
            >
              Why do you want to adopt?
            </label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Tell us why you want to adopt this pet"
              rows={4}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdoptionForm;
