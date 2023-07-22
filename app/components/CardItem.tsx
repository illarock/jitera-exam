import { UserValueState } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import IconLink from "@/app/components/IconLink";
import { Dropdown } from "flowbite-react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { heartUser } from "@/features/users/usersSlice";
import { useAppDispatch } from "../hooks";

const CardItem = ({
  user,
  onModalId,
  onModalEdit,
}: {
  user: UserValueState;
  onModalId: (id: number) => void;
  onModalEdit: (user: UserValueState | null | undefined) => void;
}) => {
  const dispatch = useAppDispatch();
  const { id, name, email, phone, website, avatar, favorite } = user;

  const loveHandler = (id: number) => {
    dispatch(heartUser(id));
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4">
        <Dropdown inline label="">
          <Dropdown.Item icon={HiPencil} onClick={() => onModalEdit(user)}>
            <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
              <p>Edit</p>
            </div>
          </Dropdown.Item>
          <Dropdown.Item icon={HiTrash} onClick={() => onModalId(id)}>
            <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
              <p>Delete</p>
            </div>
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div className="flex flex-col items-center pb-10">
        <Image
          alt={name}
          className="mb-3 rounded-full shadow-lg"
          height="96"
          width="96"
          src={avatar}
          priority
        />
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
          {name}
        </h3>

        <IconLink type="email" value={email} />
        <IconLink type="phone" value={phone} />
        <IconLink type="website" value={website} />

        <div className="mt-4 flex space-x-3 lg:mt-6">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => loveHandler(id)}
          >
            {favorite && (
              <svg
                className="w-4 h-4 text-white "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
              </svg>
            )}

            {!favorite && (
              <svg
                className="w-4 h-4 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 21 19"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"
                />
              </svg>
            )}
          </button>

          <Link
            href={`/${id}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
