import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { HiOutlineCheckCircle } from "react-icons/hi";

const testimonialData = [
  {
    name: "Name",
    date: "20/6/2022",
    isVerified: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, dolore? Unde ipsum libero recusandae distinctio ad! Dignissimos quisquam repudiandae, animi praesentium harum officia ipsam inventore molestiae excepturi cupiditate doloribus temporibus!",
    faqs: [
      {
        q: "Are you an existing client? (Y/N)",
        a: "Yes",
      },
      {
        q: "Do you have a conflict of interest with the advisor? (Y/N)",
        a: "No",
      },
      {
        q: "Have you received any compensation for leaving the review? (Y/N)",
        a: "No",
      },
      {
        q: "If Yes, provide a description of the material terms of compensation provided.",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ],
  },
  {
    name: "Name",
    date: "20/8/2024",
    isVerified: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, dolore? Unde ipsum libero recusandae distinctio ad! Dignissimos quisquam repudiandae, animi praesentium harum officia ipsam inventore molestiae excepturi cupiditate doloribus temporibus!",
    faqs: [
      {
        q: "Are you an existing client? (Y/N)",
        a: "Yes",
      },
      {
        q: "Do you have a conflict of interest with the advisor? (Y/N)",
        a: "No",
      },
      {
        q: "Have you received any compensation for leaving the review? (Y/N)",
        a: "No",
      },
      {
        q: "If Yes, provide a description of the material terms of compensation provided.",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ],
  },
  {
    name: "Name",
    date: "20/12/2024",
    isVerified: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, dolore? Unde ipsum libero recusandae distinctio ad! Dignissimos quisquam repudiandae, animi praesentium harum officia ipsam inventore molestiae excepturi cupiditate doloribus temporibus!",
    faqs: [
      {
        q: "Are you an existing client? (Y/N)",
        a: "Yes",
      },
      {
        q: "Do you have a conflict of interest with the advisor? (Y/N)",
        a: "No",
      },
      {
        q: "Have you received any compensation for leaving the review? (Y/N)",
        a: "No",
      },
      {
        q: "If Yes, provide a description of the material terms of compensation provided.",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ],
  },
];

const Testimonials = () => {
  return (
    <section className="centered-container">
      <h2 className="text-2xl md:text-4xl font-bold text-center">
        Testimonials
      </h2>
      <article className="flex flex-col gap-8">
        {testimonialData.map((item, index) => {
          return (
            <section
              key={index}
              className="flex flex-col md:flex-row gap-2 border border-secondary rounded-lg"
            >
              <article className="w-full p-6 md:w-3/4 md:p-8 space-y-6 md:space-y-8">
                <p className="text-lg">{item.description}</p>
                <hr />
                <article className="grid grid-cols-1 md:grid-cols-2 text-sm gap-4 md:gap-2">
                  {item.faqs.map((item, index) => {
                    return (
                      <article className="space-y-1" key={index}>
                        <p className="font-bold">{item.q}</p>
                        <p>{item.a}</p>
                      </article>
                    );
                  })}
                </article>
              </article>
              <article className="w-full p-6 md:w-1/4 md:p-8 rounded-b-lg md:rounded-bl-none md:rounded-r-lg space-y-2 bg-secondary text-primary">
                <p className="text-xl md:text-2xl font-bold">{item.name}</p>
                <p className="text-sm">{item.date}</p>
                <p className="flex items-center text-lg font-bold">
                  <HiOutlineCheckCircle className="h-6 w-6 mr-2" />
                  Verified
                </p>
              </article>
            </section>
          );
        })}
      </article>
    </section>
  );
};

export default Testimonials;
