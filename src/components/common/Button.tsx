import Link from 'next/link';
import React from 'react';

interface Button {
  href: string;
  label: string;
}
function Button({ href, label }: Button) {
  return (
    <Link
      href={href}
      type="button"
      className="text-primary bg-white border border-primary px-6 py-4 rounded-md m-5 hover:bg-primary hover:text-white transition-all"
    >
      {label}
    </Link>
  );
}

export default Button;
