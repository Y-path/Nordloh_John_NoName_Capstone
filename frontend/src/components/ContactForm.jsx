'use client'
import React, { useRef, useState } from "react"
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    const name = form.current["from_name"].value;
    const email = form.current["user_email"].value;
    const message = form.current["message"].value;

    if (!name || !email || !message) {
      alert("All fields must be filled to submit.");
      setLoading(false);
      return;
    }

    emailjs
      .sendForm('service_rkv60dd', 'template_kc8yzdp', form.current, {
        publicKey: 'M1DQXFf_gokExd68M',
      })
      .then(
        (result) => {
          setLoading(false);
          console.log("Success:", result);
          alert("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          setLoading(false);
          console.log("Error:", error);
          setErrorMessage("Message failed to send.");
        }
      );
  };

  return (


    <div className="field px-6 py-24 sm:py-32 lg:px-20 border rounded-lg">
      <div className="words mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-white-900 sm:text-5xl">Contact</h2>
        <p className="mt-2 text-lg/8 text-white-600">Please feel free to contact us with any questions or comments you may have.</p>
      </div>
      <form ref={form} onSubmit={sendEmail} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="from_name" className="block text-sm/6 font-semibold text-white-900">
              Name
            </label>
            <div className="mt-2.5">
              <input
                id="from_name"
                name="from_name"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md bg-black px-3.5 py-2 text-white text-white-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-purple-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="user_email" className="block text-sm/6 font-semibold text-white-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="user_email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md bg-black px-3.5 py-2 text-white text-white-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-purple-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm/6 font-semibold text-white-900">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full rounded-md bg-black px-3.5 py-2 text-white text-white-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-purple-600"
                defaultValue={''}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            disabled={loading}
          >
            {loading ? "Sending..." : "Let's talk"}
          </button>
        </div>
      </form>
      {errorMessage && <div className="mt-4 text-red-600">{errorMessage}</div>}
    </div>
  )
}
