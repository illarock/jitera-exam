"use client";

import { Metadata } from "next";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getUserById, usersState } from "@/features/users/usersSlice";
import { UserValueState } from "../types";
import Link from "next/link";
import Image from "next/image";
import IconLink from "@/app/components/IconLink";
import { Spinner } from "flowbite-react";

export const metadata: Metadata = {
  title: "Get user",
};

interface pageProps {
  params: { id: number };
}

const UserPage: FC<pageProps> = ({ params }) => {
  const dispatch = useAppDispatch();
  const { valueSolo, isLoading } = useAppSelector(usersState);
  const userId = params.id;

  const { name, avatar, email, phone, website } = valueSolo as UserValueState;

  useEffect(() => {
    dispatch(getUserById(userId));
  }, [dispatch, userId]);

  return (
    <main className="container mx-auto py-16">
      <div className="flex justify-end mb-4">
        <Link href="/" className="flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Go back
        </Link>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center p-16 h-96">
          <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
            <Spinner
              aria-label="Default status example"
              className="mr-4  w-4 h-4"
            />
            loading...
          </div>
        </div>
      )}

      {!isLoading && (
        <div className="flex flex-col text-center">
          <Image
            alt={name}
            className="mb-10 rounded-full shadow-lg mx-auto"
            height="300"
            width="300"
            src={avatar}
            priority
          />
          <h1 className="text-4xl text-blue-700 mb-4">{name}</h1>
          <div className="flex gap-4 items-center justify-center text-2xl flex-wrap">
            <IconLink type="email" value={email} />
            <IconLink type="phone" value={phone} />
            <IconLink type="website" value={website} />
          </div>
        </div>
      )}
    </main>
  );
};

export default UserPage;
