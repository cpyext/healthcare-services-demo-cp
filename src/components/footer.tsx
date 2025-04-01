import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export interface FooterProps {
  _site?: any;
  logo?: string;
  paragraph?: string;
}

const currentTime = new Date();
const year = currentTime.getFullYear();

const navigation = {
  company: [
    { name: "Blog", href: "/search.html?vertical=blog" },
    { name: "Jobs", href: "/search.html?vertical=jobs" },
    { name: "FAQS", href: "/search.html?vertical=faqs" },
    { name: "Events", href: "/search.html?vertical=events" },
  ],
  legal: [
    {
      name: "Professionals",
      href: "/search.html?vertical=financial-professional",
    },
    { name: "Locations", href: "/search.html?vertical=locations" },
    { name: "Directory", href: "/locations.html" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (
        props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => <FaFacebook {...props} />,
    },
    {
      name: "Instagram",
      href: "#",
      icon: (
        props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => <FaInstagram {...props} />,
    },
    {
      name: "Twitter",
      href: "#",
      icon: (
        props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => <FaTwitter {...props} />,
    },
    {
      name: "GitHub",
      href: "#",
      icon: (
        props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => <FaGithub {...props} />,
    },
    {
      name: "YouTube",
      href: "#",
      icon: (
        props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => <FaYoutube {...props} />,
    },
  ],
};

const Footer = (props: FooterProps) => {
  const { paragraph } = props;

  return (
    <footer
      className="bg-primary text-secondary pt-4 border-t"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <section className="mx-auto centered-container  !space-y-4  !py-4">
        <nav
          aria-label="Company links"
          className="w-full gap-6 flex flex-col md:flex-row justify-between "
        >
          <section className="md:w-1/2 w-full">
            <ul
              role="list"
              className="w-full flex md:flex-row flex-col items-center md:gap-8 gap-2"
            >
              {navigation.company.map((item) => (
                <li
                  key={item.name}
                  className=" w-full text-center py-2 md:py-0"
                >
                  <a
                    href={item.href}
                    className="text-base leading-6 text-secondary hover:underline"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              {navigation.legal.map((item) => (
                <li
                  key={item.name}
                  className=" w-full text-center py-2 md:py-0"
                >
                  <a
                    href={item.href}
                    className=" text-base leading-6 text-secondary hover:underline"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>
          <nav aria-label="Social media ">
            <ul className="flex justify-between space-x-6">
              {navigation.social.map((item) => (
                <li key={item.name}>
                  <a href={item.href} aria-label={item.name}>
                    <item.icon
                      className="h-8 w-8 md:h-5 md:w-5 text-secondary"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </nav>

        <section>
          <p className="text-sm leading-5 text-secondary text-center md:text-left">
            &copy; {year} Your Company, Inc. All rights reserved.
          </p>
        </section>
      </section>
    </footer>
  );
};

export default Footer;
