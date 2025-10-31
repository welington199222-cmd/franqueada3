import type { SVGProps } from "react"

export const VisaIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="20"
    viewBox="0 0 38 24"
    {...props}
    role="img"
    aria-label="Visa Card Logo"
  >
    <g fill="none">
      <path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#1A1F71" />
      <path
        d="M12.9 20.1c-2.2 0-3.7-1.4-3.7-4.3s1.6-4.2 3.9-4.2c1.2 0 2.1.5 2.7.9l-.6 1c-.6-.4-1.3-.8-2.1-.8-1.6 0-2.7 1.2-2.7 3.1 0 2 1.1 3.2 2.9 3.2 1 0 1.7-.4 2.1-.7l.5.9c-.6.6-1.5 1-2.9 1zm19.4-8.3c-.6-.8-1.6-1.3-2.9-1.3-2.5 0-4.7 2-4.7 4.8s2.2 4.8 4.7 4.8c1.7 0 2.8-.7 3.4-1.7l-.9-.5c-.5.8-1.3 1.4-2.5 1.4-1.8 0-3.1-1.3-3.1-3.1s1.3-3.1 3.1-3.1c.9 0 1.6.4 2 .9l.8-.5zm-8.5.2L22.1 17l-1.8-8.1h-1.3L16 19.8h1.5l1.1-5.4.4 2.5 1.2 5.1h1.9l3.2-8.3h-1.9zM8.4 11.8L5.9 17.7l-.4-5.1c0-.6 0-.8-.1-.8H4.2v.3s-.1 2.4-.3 3.8L2.6 11.8H1.3L0 20h1.7l1.1-5.9c.2-.8.2-.8.3-1.2.1.4.5 1.9.5 1.9L4.9 20h1.6l3.3-8.2H8.4z"
        fill="#fff"
      />
    </g>
  </svg>
)

export const MasterCardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="20"
    viewBox="0 0 38 24"
    {...props}
    role="img"
    aria-label="Mastercard Card Logo"
  >
    <g fill="none">
      <circle cx="15" cy="12" r="7" fill="#EB001B" />
      <circle cx="23" cy="12" r="7" fill="#F79E1B" />
      <path
        d="M22.2 12a7.1 7.1 0 01-3 5.7 7.1 7.1 0 01-8.4 0A7.1 7.1 0 018 12a7.1 7.1 0 012.8-5.7 7.1 7.1 0 018.4 0A7.1 7.1 0 0122.2 12z"
        fill="#FF5F00"
      />
    </g>
  </svg>
)
