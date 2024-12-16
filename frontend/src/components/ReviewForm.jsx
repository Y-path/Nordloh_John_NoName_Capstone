// import { PhotoIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react';

export default function ReviewForm({ onPost }) {

  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [photo, setPhoto] = useState('');

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!name || !review) {
      alert('Please fill in both the name and the review');
      return;
    }
    console.log('Submitting review:', { name, review });
    // const newReview = {
    //   name,
    //   review,
    //   photoUrl,
    // };

    const formData = new FormData();
    formData.append('name', name);
    formData.append('review', review);
    if (photo) {
    formData.append('photo', photo); 
    }


    try {
      // Post to backend
      const response = await fetch('http://localhost:5000/reviews', {
        method: 'POST',
        body: formData, 
      });

      
      if (response.ok) {
        const savedReview = await response.json();
        
        onPost(savedReview);
        
        setName('');
        setReview('');
        setPhoto(null);
        alert('Review successfully submitted!');
      } else {
        // const errorDetail = await response.text();  
        // console.error('Error details:', errorDetail)
        alert('Failed to save the review.');
      }
    } catch (error) {
      console.error('Error posting review:', error);
      alert('An error occurred while saving the review');
    }
  };



  return (
    
    <div className="review-form-container">
      
      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          
          <p className="mt-1 text-sm/6 text-white-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-4">
            <div className="sm:col-span-4 ">
              <label htmlFor="name" className="block text-sm/6 font-medium text-white-900">
                Name
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-black pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="janesmith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-white text-white-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="review" className="block text-sm/6 font-medium text-white-900">
                Review
              </label>
              <div className="mt-2">
                <textarea
                  id="review"
                  name="review"
                  rows={5}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="block w-full rounded-md bg-black px-3 py-1.5 text-white text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  // defaultValue={''}
                />
              </div>
             {/* <p className="mt-3 text-sm/6 text-white-600">Review an artist or concert experience.</p> */}
             </div> 

            

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-white-900">
                Concert photo
              </label>
              <div className="mt-2 flex justify-center bg-black rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  {/* <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-white-300" /> */}
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="photo"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a photo</span>
                      <input id="photo" type="file" accept= "image/*" className="sr-only"
                       onChange={handleFileChange}   />
                    </label>
                    <p className="pl-1 text-white">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-white-600">PNG, JPG, GIF up to 5MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-white-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div>
      </div>
    </form>
    </div>
    
  )
}
