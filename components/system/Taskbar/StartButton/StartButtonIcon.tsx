import { memo } from "react";

const StartButtonIcon = memo(() => (
  <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" fill="none" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 6v12M6 12h12" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    <circle cx="12" cy="12" fill="currentColor" r="3" />
  </svg>
));

export default StartButtonIcon;
