import { useState } from "react";
import axios from "axios";

const AdoptionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    user_id: 1,
    pet_id: "",
    pet_name: "",
    pet_type: "",
    pet_breed: "",
    pet_age: "",
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const requiredFields = [
      "user_id",
      "pet_id",
      "pet_name",
      "pet_type",
      "pet_breed",
      "pet_age",
      "reason",
    ];

    for (const field of requiredFields) {
      const value = formData[field as keyof typeof formData];
      if (typeof value === "string" && !value.trim()) {
        console.error(`Validation failed: ${field} is missing or empty.`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form data before submission:", formData);

    if (!validateForm()) {
      alert("Please fill out all required fields before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/adoption-forms", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.status === 201) {
        alert("Application submitted successfully!");
        setFormData({
          user_id: formData.user_id,
          pet_id: "",
          pet_name: "",
          pet_type: "",
          pet_breed: "",
          pet_age: "",
          reason: "",
        });
      }
    } catch (error: any) {
      console.error(
        "Error submitting adoption form:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message ||
          "There was an issue submitting your application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
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
              htmlFor="petId"
              className="block text-gray-600 font-medium mb-1"
            >
              Pet ID
            </label>
            <input
              type="text"
              id="petId"
              name="pet_id"
              value={formData.pet_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter the pet's ID"
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
              htmlFor="petType"
              className="block text-gray-600 font-medium mb-1"
            >
              Pet Type
            </label>
            <input
              type="text"
              id="petType"
              name="pet_type"
              value={formData.pet_type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter the pet's type (e.g., Dog, Cat)"
              required
            />
          </div>
          <div>
            <label
              htmlFor="petBreed"
              className="block text-gray-600 font-medium mb-1"
            >
              Pet Breed
            </label>
            <input
              type="text"
              id="petBreed"
              name="pet_breed"
              value={formData.pet_breed}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter the pet's breed"
              required
            />
          </div>
          <div>
            <label
              htmlFor="petAge"
              className="block text-gray-600 font-medium mb-1"
            >
              Pet Age
            </label>
            <input
              type="number"
              id="petAge"
              name="pet_age"
              value={formData.pet_age}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter the pet's age"
              required
            />
          </div>
          <div>
            <label
              htmlFor="reason"
              className="block text-gray-600 font-medium mb-1"
            >
              Reason to Adopt
            </label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Why do you want to adopt this pet?"
              rows={4}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdoptionForm;
