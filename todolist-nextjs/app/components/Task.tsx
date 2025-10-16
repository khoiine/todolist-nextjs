"use client";
import { ITask } from "@/types/tasks"
import { FormEventHandler, useState } from "react"
import { FiEdit } from "react-icons/fi"
import { FiTrash2 } from "react-icons/fi"
import Modal from "./Modal"
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
            id: task.id,
            text: taskToEdit,
        })
        setOpenModalEdit(false);
        router.refresh();
    };

    const handleDeletedTask = async (id: string) => {
        await deleteTodo(id);
        setOpenModalDeleted(false);
        router.refresh();
    }

    return (
        <tr key={task.id}>
            <td className="w-full">{task.text}</td>
            <td className="flex gap-5">
                <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={25} />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEditTodo}>
                        <h3 className="font-bold text-lg">Sửa task</h3>
                        <div className="modal-action">
                            <input value={taskToEdit} onChange={e => setTaskToEdit(e.target.value)} type="text" placeholder="Nhập task" className="input w-full" />
                            <button type="submit" className="btn">Thêm</button>
                        </div>
                    </form>
                </Modal>
                <FiTrash2 onClick={() => setOpenModalDeleted(true)} cursor="pointer" className="text-red-500" size={25} />
                <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
                    <h3 className="text-lg">Bạn có muốn xóa không?</h3>
                    <div className="modal-action">
                        <button onClick={() => handleDeletedTask(task.id)} className="btn">Có</button>
                    </div>
                </Modal>
            </td>
        </tr>
    )
}

export default Task

