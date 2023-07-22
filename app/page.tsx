"use client";

import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { deleteUser, getUsers, usersState } from "@/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import CardItem from "@/app/components/CardItem";
import ModalDelete from "@/app/components/ModalDelete";
import ModalEdit from "@/app/components/ModalEdit";
import { UserValueState } from "./types";

export default function Home() {
  const dispatch = useAppDispatch();
  const { value, isLoading } = useAppSelector(usersState);
  const [openModal, setOpenModal] = useState<boolean | undefined>(false);
  const [deleteId, setDeleteId] = useState<number | null | undefined>(null);
  const [openModalEdit, setOpenModalEdit] = useState<boolean | undefined>(
    false
  );
  const [userEdit, setUserEdit] = useState<UserValueState | null | undefined>(
    null
  );

  const onModalHandler: (id: number) => void = (id) => {
    setDeleteId(id);
    setOpenModal(!openModal);
  };

  const onCloseHandler: () => void = () => {
    setOpenModal(!openModal);
    setDeleteId(null);
  };

  const onDeleteHandler: (id: number | null | undefined) => void = (id) => {
    dispatch(deleteUser(id));
    setOpenModal(!openModal);
    setDeleteId(null);
  };

  const onModalEditHandler: (
    user: UserValueState | null | undefined
  ) => void = (user) => {
    setUserEdit(user);
    setOpenModalEdit(!openModalEdit);
  };

  const onCloseEditHandler: () => void = () => {
    setOpenModalEdit(!openModalEdit);
    setUserEdit(null);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <main className="container mx-auto py-16">
      <h1 className="text-2xl mb-8">Jitera Exam</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {value.map((user) => (
            <CardItem
              key={user.id}
              user={user}
              onModalId={onModalHandler}
              onModalEdit={onModalEditHandler}
            />
          ))}
        </div>
      )}

      <ModalDelete
        status={openModal}
        onCloseHandler={onCloseHandler}
        onDeleteHandler={onDeleteHandler}
        idDelete={deleteId}
      />
      <ModalEdit
        status={openModalEdit}
        onCloseHandler={onCloseEditHandler}
        userValue={userEdit}
      />
    </main>
  );
}
