import React from 'react';

export const TiktokIcon: React.FC<{ className?: string; variant?: 'brand' | 'mono' }> = ({
  className = "w-4 h-4",
  variant = "brand"
}) => {
  if (variant === "mono") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.068-.112a2.973 2.973 0 0 1-.365-1.48 2.89 2.89 0 0 1 2.89-2.89c.356 0 .694.068 1.006.19V9.56a6.326 6.326 0 0 0-1.006-.081A6.334 6.334 0 0 0 3.3 15.813a6.334 6.334 0 0 0 10.82 4.471c.038-.037.073-.076.109-.115.65-.678 1.056-1.583 1.056-2.585V8.47a8.21 8.21 0 0 0 4.304 1.22V6.686z"/>
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#010101" />
      <path
        d="M18.8 6.4a4.4 4.4 0 0 1-3.3-3.8V2.2h-2.8v11.8a2.6 2.6 0 1 1-2.6-2.6c.3 0 .6.05.9.15V8.8a5.5 5.5 0 0 0-.9-.08 5.4 5.4 0 1 0 5.4 5.4V8a7.2 7.2 0 0 0 3.8 1v-2.5c-.2 0-.3-.05-.5-.1z"
        fill="#25F4EE"
        transform="translate(-0.7, -0.5)"
      />
      <path
        d="M18.8 6.4a4.4 4.4 0 0 1-3.3-3.8V2.2h-2.8v11.8a2.6 2.6 0 1 1-2.6-2.6c.3 0 .6.05.9.15V8.8a5.5 5.5 0 0 0-.9-.08 5.4 5.4 0 1 0 5.4 5.4V8a7.2 7.2 0 0 0 3.8 1v-2.5c-.2 0-.3-.05-.5-.1z"
        fill="#FE2C55"
        transform="translate(0.7, 0.5)"
      />
      <path
        d="M18.8 6.4a4.4 4.4 0 0 1-3.3-3.8V2.2h-2.8v11.8a2.6 2.6 0 1 1-2.6-2.6c.3 0 .6.05.9.15V8.8a5.5 5.5 0 0 0-.9-.08 5.4 5.4 0 1 0 5.4 5.4V8a7.2 7.2 0 0 0 3.8 1v-2.5c-.2 0-.3-.05-.5-.1z"
        fill="#FFFFFF"
      />
    </svg>
  );
};
