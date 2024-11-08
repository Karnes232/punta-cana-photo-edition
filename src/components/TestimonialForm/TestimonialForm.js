import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

const TestimonialForm = () => {
  const [host, setHost] = useState("");
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    names: "",
    package: "",
    testimonial: "",
    photos: [],
  });

  useEffect(() => {
    setHost(window.location.origin); // };
  }, [host]);
  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MAX_FILES = 2;

  const packageOptions = [
    {
      page: "proposal",
      value: "Proposal Photo Shoot",
    },
    {
      page: "elopement-vow-renewal",
      value: "Vow Renewal Photo Shoot",
    },
    {
      page: "wedding",
      value: "Wedding Photo Shoot",
    },
    {
      page: "puntacana-wedding-planner",
      value: "Wedding Planner",
    },
    {
      page: "birthday-celebrations",
      value: "Birthday Celebrations",
    },
    {
      page: "gender-reveal-and-baby-showers",
      value: "Gender Reveal and Baby Showers",
    },
    {
      page: "punta-cana-bachelor-party",
      value: "Bachelor Party",
    },
    {
      page: "photoshoots",
      value: "Photoshoots",
    },
    {
      page: "event-planner",
      value: "Corporate Events",
    },
    {
      page: "real-estate-photography",
      value: "Real Estate Photography",
    },

    {
      page: "videos-and-comercial-photos",
      value: "Videos and Comercial Photos",
    },
  ];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > MAX_FILES) {
      setFileError(`Please select a maximum of ${MAX_FILES} photos`);
      e.target.value = ""; // Reset file input
      return;
    }

    // Optional: Check file sizes (example: 5MB per file)
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB in bytes
    const hasLargeFiles = files.some((file) => file.size > MAX_SIZE);

    if (hasLargeFiles) {
      setFileError("Each file must be less than 5MB");
      e.target.value = "";
      return;
    }

    setFileError("");
    setFormData({ ...formData, photos: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const redirectHref = `${host}/contact/thankyou/?name=${encodeURIComponent(formData.names)}`;
    try {
      // Upload photos
      const photoUrls = await Promise.all(
        Array.from(formData.photos).map(async (photo) => {
          const storageRef = ref(
            storage,
            `testimonials/${Date.now()}-${photo.name}`,
          );
          await uploadBytes(storageRef, photo);
          return getDownloadURL(storageRef);
        }),
      );
      let docName = `testimonials-${formData.package}`;
      // Save testimonial to Firestore
      await addDoc(collection(db, docName), {
        names: formData.names,
        package: formData.package,
        testimonial: formData.testimonial,
        photoUrls,
        createdAt: new Date(),
      });

      // Reset form
      await setFormData({
        names: "",
        package: "",
        testimonial: "",
        photos: [],
      });
      window.location.href = redirectHref;
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      setError(true);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm border pb-20 lg:pb-10 w-full max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-6">
          Tell Us About Your Experience
        </h3>
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto p-6 space-y-4"
        >
          <div>
            <label
              htmlFor="names"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Names
            </label>
            <input
              type="text"
              name="names"
              value={formData.names}
              onChange={(e) =>
                setFormData({ ...formData, names: e.target.value })
              }
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="package"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Package
            </label>

            <select
              value={formData.package}
              onChange={(e) =>
                setFormData({ ...formData, package: e.target.value })
              }
              required
              className="w-full p-2 border rounded-md bg-white"
            >
              <option value="">Select a package</option>
              {packageOptions.map((option) => (
                <option key={option.page} value={option.page}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="testimonial"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Experience
            </label>
            <textarea
              required
              name="testimonial"
              value={formData.testimonial}
              onChange={(e) =>
                setFormData({ ...formData, testimonial: e.target.value })
              }
              rows="4"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="photos"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Photos (Maximum {MAX_FILES} photos)
            </label>
            <input
              type="file"
              name="photos"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md"
            />
            {fileError && (
              <p className="text-red-500 text-sm mt-1">{fileError}</p>
            )}
            {formData.photos.length > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                {formData.photos.length}{" "}
                {formData.photos.length === 1 ? "photo" : "photos"} selected
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isSubmitting ? "Submitting..." : "Submit Testimonial"}
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-1">
              There was an error submitting your testimonial. Please try again.
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default TestimonialForm;
