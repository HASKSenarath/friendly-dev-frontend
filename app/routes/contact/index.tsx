import type { Route } from "./+types";
// import { Form } from "react-router";

// export async function action({ request }: Route.ActionArgs) {
//   const formData = await request.formData();
//   const name = formData.get("name") as string;
//   const email = formData.get("email") as string;
//   const subject = formData.get("subject") as string;
//   const message = formData.get("message") as string;

//   // Simple validation

//   const errors: Record<string, string> = {};
//   if (!name) errors.name = "Name is required";
//   if (!email) {
//     errors.email = "Email is required";
//   } else {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) errors.email = "Invalid email address";
//   }
//   if (!subject) errors.subject = "Subject is required";
//   if (!message) errors.message = "Message is required";

//   if (Object.keys(errors).length > 0) {
//     return { errors };
//   }

//   const data = {
//     name,
//     email,
//     subject,
//     message,
//   };

//   // Here you would typically handle the form submission,
//   // such as sending an email or storing the message in a database.
//   console.log(data);
//   return { message: "Form submitted successfully", data };
// }

// const ContactPage = ({ actionData }: Route.ComponentProps) => {
//   const errors = actionData?.errors || {};
//   return (
//     <div className="max-w-3xl mx-auto px-6 py-8 bg-gray-900">
//       <h2 className="text-3xl font-bold text-white mb-8 text-center">
//         Contact Page
//       </h2>
//       {actionData?.message ? (
//         <div className="mb-6 p-4 bg-green-600 text-white rounded-md">
//           {actionData.message}
//         </div>
//       ) : null}
//       <Form method="post" className="space-y-6">
//         <div>
//           <label
//             htmlFor="name"
//             className="block text-sm font-medium text-white mb-2"
//           >
//             Full Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Your Name"
//           />
//           {errors.name ? (
//             <div className="text-red-500">{errors.name}</div>
//           ) : null}
//         </div>
//         <div>
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium text-white mb-2"
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Your Email"
//           />
//           {errors.email ? (
//             <div className="text-red-500">{errors.email}</div>
//           ) : null}
//         </div>

//         <div>
//           <label
//             htmlFor="subject"
//             className="block text-sm font-medium text-white mb-2"
//           >
//             Subject
//           </label>
//           <input
//             type="text"
//             id="subject"
//             name="subject"
//             className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Subject"
//           />
//           {errors.subject ? (
//             <div className="text-red-500">{errors.subject}</div>
//           ) : null}
//         </div>
//         <div>
//           <label
//             htmlFor="message"
//             className="block text-sm font-medium text-white mb-2"
//           >
//             Message
//           </label>
//           <textarea
//             id="message"
//             name="message"
//             rows={4}
//             className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Your Message"
//           ></textarea>
//           {errors.message ? (
//             <div className="text-red-500">{errors.message}</div>
//           ) : null}
//         </div>
//         <button
//           type="submit"
//           className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Send Message
//         </button>
//       </Form>
//     </div>
//   );
// };

// export default ContactPage;

const ContactPage = ({ actionData }: Route.ComponentProps) => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8 bg-gray-900">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Contact Page
      </h2>

      <form
        action="https://formspree.io/f/xreebwel"
        method="post"
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Email"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-white mb-2"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Subject"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-white mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Message"
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
