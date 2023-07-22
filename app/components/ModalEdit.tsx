import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "flowbite-react";
import { UserValueState } from "../types";
import Image from "next/image";
import { editUser } from "../features/users/usersSlice";
import { useAppDispatch } from "../hooks";

const ModalEdit = ({
  status,
  onCloseHandler,
  userValue,
}: {
  status: boolean | undefined;
  onCloseHandler: () => void;
  userValue: UserValueState | null | undefined;
}) => {
  const dispatch = useAppDispatch();
  const nameUser = useRef<HTMLInputElement>(null);
  const emailUser = useRef<HTMLInputElement>(null);
  const phoneUser = useRef<HTMLInputElement>(null);
  const websiteUser = useRef<HTMLInputElement>(null);

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [websiteError, setWebsiteError] = useState<boolean>(false);

  useEffect(() => {
    if (status === false) {
      setNameError(false);
      setEmailError(false);
      setPhoneError(false);
      setWebsiteError(false);
    }
  }, [nameError, emailError, phoneError, websiteError, status]);

  const formHandler = () => {
    if (nameUser?.current?.value === "") {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (emailUser?.current?.value === "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (phoneUser?.current?.value === "") {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
    if (websiteUser?.current?.value === "") {
      setWebsiteError(true);
    } else {
      setWebsiteError(false);
    }

    if (
      !userValue ||
      !nameUser?.current?.value ||
      !emailUser?.current?.value ||
      !phoneUser?.current?.value ||
      !websiteUser?.current?.value
    )
      return;

    const id = userValue.id;
    const name = nameUser.current.value;
    const email = emailUser.current.value;
    const phone = phoneUser.current.value;
    const website = websiteUser.current.value;

    dispatch(editUser({ id, name, email, phone, website }));
    onCloseHandler();
    setNameError(false);
  };

  return (
    <Modal show={status} onClose={() => onCloseHandler()}>
      <Modal.Header>
        Edit User -
        {userValue && (
          <Image
            alt={userValue.name}
            height="28"
            width="28"
            src={userValue.avatar}
            priority
            className="ml-4 mr-2 inline-block rounded-full"
          />
        )}
        <span className="text-blue-600">{userValue?.name} </span>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              className={` ${
                nameError === true
                  ? "bg-red-50 border border-red-500"
                  : "bg-gray-50 border border-gray-300"
              }
              text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
              ref={nameUser}
              defaultValue={userValue?.name}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className={` ${
                emailError === true
                  ? "bg-red-50 border border-red-500"
                  : "bg-gray-50 border border-gray-300"
              }
              text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
              ref={emailUser}
              defaultValue={userValue?.email}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone
            </label>
            <input
              type="text"
              name="phone"
              className={` ${
                phoneError === true
                  ? "bg-red-50 border border-red-500"
                  : "bg-gray-50 border border-gray-300"
              }
              text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
              ref={phoneUser}
              defaultValue={userValue?.phone}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Website
            </label>
            <input
              type="text"
              name="phone"
              className={` ${
                websiteError === true
                  ? "bg-red-50 border border-red-500"
                  : "bg-gray-50 border border-gray-300"
              }
              text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
              ref={websiteUser}
              defaultValue={userValue?.website}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button
              className="bg-blue-700 hover:bg-blue-800"
              onClick={formHandler}
            >
              Submit
            </Button>
            <Button onClick={() => onCloseHandler()} className="bg-red-700">
              Cancel
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalEdit;
