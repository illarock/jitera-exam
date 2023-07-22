import { Button, Modal } from "flowbite-react";

const ModalDelete = ({
  status,
  onCloseHandler,
  onDeleteHandler,
  idDelete,
}: {
  status: boolean | undefined;
  onCloseHandler: () => void;
  onDeleteHandler: (id: number | null | undefined) => void;
  idDelete: number | null | undefined;
}) => {
  return (
    <Modal show={status} onClose={() => onCloseHandler()}>
      <Modal.Header>Are you sure you want to delete?</Modal.Header>
      <Modal.Body>
        <div className="flex items-center space-x-2">
          <Button
            className="bg-blue-700 hover:bg-blue-800"
            onClick={() => onDeleteHandler(idDelete)}
          >
            Yes
          </Button>
          <Button onClick={() => onCloseHandler()} color="gray">
            No
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDelete;
