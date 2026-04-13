import { FaFacebook, FaGlobe, FaLinkedin, FaWhatsapp } from "react-icons/fa";

interface FounderCardProps {
  variant: "mini" | "full";
  onExpand?: () => void;
}

const SOCIAL_LINKS = [
  {
    icon: FaWhatsapp,
    href: "https://wa.me/8801576447623",
    label: "WhatsApp",
    color: "hover:text-green-400",
  },
  {
    icon: FaFacebook,
    href: "https://www.facebook.com/profile.php?id=61580925924901",
    label: "Facebook",
    color: "hover:text-blue-400",
  },
  {
    icon: FaLinkedin,
    href: "https://bd.linkedin.com/in/alvee-noor-siyam-0a1a84354",
    label: "LinkedIn",
    color: "hover:text-sky-400",
  },
  {
    icon: FaGlobe,
    href: "https://onlymesiyam.netlify.app",
    label: "Portfolio",
    color: "hover:text-primary",
  },
];

const PHOTO_URL = "https://onlymesiyam.netlify.app/assets/ceo.jpg";
const JOB_LINK = "https://raysotech.studyingtech.com/#";

export function FounderCard({ variant, onExpand }: FounderCardProps) {
  if (variant === "mini") {
    return (
      <button
        type="button"
        onClick={onExpand}
        aria-label="View founder profile"
        data-ocid="founder-mini-card"
        className="focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded-full transition-smooth"
      >
        <img
          src={PHOTO_URL}
          alt="Alvee Noor Siyam"
          className="w-10 h-10 rounded-full object-cover founder-photo transition-smooth hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/images/placeholder.svg";
          }}
        />
      </button>
    );
  }

  return (
    <div
      className="flex flex-col items-center gap-3 p-4"
      data-ocid="founder-full-card"
    >
      <div className="relative">
        <img
          src={PHOTO_URL}
          alt="Alvee Noor Siyam"
          className="w-20 h-20 rounded-full object-cover founder-photo"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/images/placeholder.svg";
          }}
        />
      </div>

      <div className="text-center">
        <p className="font-semibold text-foreground text-sm">
          Alvee Noor Siyam
        </p>
        <a
          href={JOB_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:text-primary/80 transition-colors underline-offset-2 hover:underline"
          data-ocid="founder-job-link"
        >
          Frontend Engineer
        </a>
      </div>

      <div className="flex items-center gap-3">
        {SOCIAL_LINKS.map(({ icon: Icon, href, label, color }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            data-ocid={`founder-social-${label.toLowerCase()}`}
            className={`text-muted-foreground ${color} transition-smooth text-lg focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded`}
          >
            <Icon />
          </a>
        ))}
      </div>
    </div>
  );
}
