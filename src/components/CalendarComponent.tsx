import { useState } from "react";

interface CalendarComponentProps {
  onClose: (value: boolean) => void;
  name: string;
  setToastMessage: (
    message: {
      type: "success" | "error";
      text: string;
    } | null
  ) => void;
}

const CalendarComponent = ({
  onClose,
  setToastMessage,
  name,
}: CalendarComponentProps) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });
  const [showTimes, setShowTimes] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setToastMessage(null);

    const { firstname, lastname, email, phone } = formData;
    // const appointmentMessage = `Hi ${firstname}, you have an appointment scheduled with ${lastname} `;
    const appointmentMessage = `Hello ${firstname}, this is ${name}. I wanted to confirm that I’ve received your appointment request. I’ll be in touch shortly to schedule a time that works for you.`;

    const body_relate = {
      body: appointmentMessage,
      to_number: phone,
      user_id: 764009,
    };

    const sf_lead = {
      FirstName: firstname,
      LastName: lastname,
      Company: "Hearsay Social Inc.",
      Email: email,
      Phone: phone,
      MobilePhone: phone,
      Status: "New",
      FinServ__ReferredByContact__c: "0035G00001jIak5QAC",
    };

    const hearsay_lead = {
      contact_type: "lead",
      first_name: firstname,
      last_name: lastname,
      name: `${firstname} ${lastname}`,
      phone: phone,
      email: email,
    };
    // setTimeout(() => {
    //   setToastMessage({
    //     type: "success",
    //     text: "Form submitted successfully!",
    //   });

    //   setFormVisible(false);
    //   setFormData({ firstname: "", lastname: "", email: "", phone: "" });
    //   onClose(true);
    // }, 2000);
    try {
      fetch(`/api/salesforceConnectAndRelate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sf_lead, hearsay_lead, body_relate }),
      });

      setTimeout(() => {
        setToastMessage({
          type: "success",
          text: "Form submitted successfully!",
        });

        setFormVisible(false);
        setFormData({ firstname: "", lastname: "", email: "", phone: "" });
        onClose(true);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setToastMessage({
        type: "error",
        text: "There was an error submitting the form.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="bg-primary p-5 max-w-[30rem] w-full md:shadow-md mx-auto my-0 space-y-5"
      aria-labelledby="calendar-heading"
    >
      <h2 className="font-semibold text-center text-lg">
        Get in Touch – We’ll Call You Back
      </h2>
      <form
        id="ctaForm"
        onSubmit={handleSubmit}
        className="mt-4"
        aria-labelledby="form-heading"
      >
        <h3 id="form-heading" className="sr-only">
          Appointment Form
        </h3>

        <label htmlFor="firstname" className="sr-only">
          First Name
        </label>
        <input
          id="firstname"
          name="firstname"
          value={formData.firstname}
          onChange={handleInputChange}
          placeholder="First Name"
          required
          className="p-2 border rounded w-full mb-2"
        />

        <label htmlFor="lastname" className="sr-only">
          Last Name
        </label>
        <input
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleInputChange}
          placeholder="Last Name"
          required
          className="p-2 border rounded w-full mb-2"
        />

        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          type="email"
          required
          className="p-2 border rounded w-full mb-2"
        />

        <label htmlFor="phone" className="sr-only">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          type="tel"
          required
          className="p-2 border rounded w-full mb-2"
        />

        <label
          htmlFor="consentCheckbox"
          className="flex gap-2 items-base text-sm my-4"
        >
          <input
            type="checkbox"
            id="consentCheckbox"
            name="agree"
            value="yes"
            required
            className="mt-1 w-3.5 h-3.5 form-checkbox cursor-pointer border border-gray-300 rounded-sm text-secondary focus:ring-tertiary"
          />
          I consent to receive text messages from Parkside at the number
          provided. Message and data rates may apply. Reply STOP to unsubscribe.
          See our Privacy Policy for details.
        </label>

        <button
          name="Submit form"
          id="submitButton"
          type="submit"
          className="bg-secondary text-primary rounded p-2 w-full flex justify-center items-center"
        >
          {loading ? (
            <span className="loader border-primary border-t-transparent border-2 rounded-full w-5 h-5 animate-spin"></span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </section>
  );
};

export default CalendarComponent;
