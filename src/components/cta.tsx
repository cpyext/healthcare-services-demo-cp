import { Link, CTA, AnalyticsScopeProvider } from "@yext/pages-components";
import { useEffect, useState } from "react";
import CalendarComponent from "./CalendarComponent";
import ModalComponent from "./ModalComponent";

interface CTAProps {
  cta?: CTA;
  ctaType: "primaryCta" | "secondaryCta";
  otherStyles?: string;
  eventName?: string;
  hours?: any;
  name?: string;
  isBookAnAppointment?: boolean;
}

const buildCTAStyles = (ctaType: CTAProps["ctaType"]) => {
  return ctaType === "primaryCta"
    ? `md:max-w-[200px] font-medium w-full md:w-fit p-2 uppercase text-sm flex items-center justify-center border border-secondary rounded-full `
    : `md:max-w-[200px] font-medium w-full md:w-fit p-2 uppercase text-sm flex items-center justify-center border bg-secondary rounded-full text-primary`;
};

const Cta = ({
  cta,
  ctaType,
  otherStyles = "",
  eventName,
  hours,
  name,
  isBookAnAppointment = false,
}: CTAProps) => {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(100);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleCloseModal = () => setOpen(false);
  useEffect(() => {
    if (message) {
      setProgress(100);
      let interval = setInterval(() => {
        setProgress((prev) => (prev > 0 ? prev - 10 : 0));
      }, 100);

      let timeout = setTimeout(() => {
        setMessage(null);
        setProgress(100);
      }, 1000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [message]);
  return (
    <AnalyticsScopeProvider name="ctas">
      {message && (
        <article
          className={`z-50 normal-case text-lg
 fixed top-10 right-5 transform -translate-x-5 px-4 py-2 rounded-md text-center text-primary transition-transform duration-500 ${
   message.type === "success" ? "bg-tertiary/25" : "bg-red-500"
 } ${message ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
        >
          {message.text}
          <div className="w-full h-1 bg-secondary mt-2 relative overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
            ></div>
          </div>
        </article>
      )}
      <Link
        onClick={isBookAnAppointment ? handleOpenModal : undefined}
        className={`${buildCTAStyles(ctaType)} ${otherStyles}`}
        cta={{
          link: cta?.link || "#",
          label: cta?.label || "",
          linkType: cta?.linkType,
        }}
      />
      {open && (
        <ModalComponent modalWidth="1/3" open={open} onClose={handleCloseModal}>
          <CalendarComponent
            name={name!}
            onClose={handleCloseModal}
            setToastMessage={setMessage}
          />
        </ModalComponent>
      )}
    </AnalyticsScopeProvider>
  );
};

export default Cta;
