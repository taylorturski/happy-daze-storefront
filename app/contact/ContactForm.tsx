"use client";

import {useState} from "react";
import PageSection from "@/components/PageSection";

export default function ContactForm({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const [form, setForm] = useState({name: "", email: "", message: ""});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("message", form.message);

    const res = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setSubmitted(true);
      setForm({name: "", email: "", message: ""});
    } else {
      setError(data?.error || "Something went wrong.");
    }
  };

  return (
    <PageSection title={title}>
      <div
        className="mb-8 font-mono"
        dangerouslySetInnerHTML={{__html: content}}
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md font-mono">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
          value={form.name}
          onChange={handleChange}
          className="border border-black px-3 py-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
          value={form.email}
          onChange={handleChange}
          className="border border-black px-3 py-2"
        />
        <textarea
          name="message"
          placeholder="Your message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          className="border border-black px-3 py-2"
        />
        <button
          type="submit"
          className="border-2 border-white px-4 py-2 font-bold bg-black">
          SEND MESSAGE
        </button>
        {submitted && (
          <p className="text-green-600 mt-2">
            Message sent. We’ll get back to you soon.
          </p>
        )}
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </PageSection>
  );
}
