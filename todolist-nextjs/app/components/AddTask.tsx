"use client";

import { FormEventHandler, useState } from "react"
import Modal from "./Modal"
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>('');

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue
    })
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">Thêm task</button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Thêm task mới</h3>
          <div className="modal-action">
            <input value={newTaskValue} onChange={e => setNewTaskValue(e.target.value)} type="text" placeholder="Nhập task" className="input w-full" />
            <button type="submit" className="btn">Thêm</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddTask
