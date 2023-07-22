import Link from "next/link";
import React from "react";

const IconLink = ({ type, value }: { type: string; value: string }) => {
  const linkTypeEmail = type === "email";
  const linkTypePhone = type === "phone";
  const linkTypeWebsite = type === "website";

  let linkValue = value;
  let viewBoxValue: string | undefined;
  let svgPath;

  if (linkTypeEmail) {
    linkValue = `mailto:${value}`;
    viewBoxValue = "0 0 20 16";
    svgPath = (
      <>
        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
      </>
    );
  }

  if (linkTypePhone) {
    linkValue = `tel:${value}`;
    viewBoxValue = "0 0 19 18";
    svgPath = (
      <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
    );
  }

  if (linkTypeWebsite) {
    linkValue = `http://${value}` as string;
    viewBoxValue = "0 0 19 19";
    svgPath = (
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11.013 7.962a3.519 3.519 0 0 0-4.975 0l-3.554 3.554a3.518 3.518 0 0 0 4.975 4.975l.461-.46m-.461-4.515a3.518 3.518 0 0 0 4.975 0l3.553-3.554a3.518 3.518 0 0 0-4.974-4.975L10.3 3.7"
      />
    );
  }

  return (
    <div className="flex gap-2 items-center mb-2 group">
      <svg
        className="w-4 h-4 text-gray-800 group-hover:text-blue-700"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox={viewBoxValue}
      >
        {svgPath}
      </svg>

      <Link
        href={linkValue}
        target={linkTypeWebsite ? "_blank" : " "}
        className="text-sm text-gray-500 dark:text-gray-400"
      >
        {value}
      </Link>
    </div>
  );
};

export default IconLink;
