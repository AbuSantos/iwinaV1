"use client";
import { createNewTask } from "@/lib/api";
import { useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Input from "./Input";
import clsx from "clsx";


Modal.setAppElement("#modal");

const NewTask = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = () =>setIsOpen(true)
    const closeModal = () => setIsOpen(false);
    const taskData = {
        name: '',
        description: '',
        due: '',
      };
  const [formData, setFormData]= useState(taskData);
      const handleSubmit = async(e:any) => {
        e.preventDefault();
        console.log('New Task created:',formData);
        try {
            await createNewTask(formData)
            console.log('New Task created:',formData);
        } catch (error) {
            console.error('Error creating task:', error);
        }
        
      }

      const handleChange = (e) => {
        const { name, value } = e.target;

        setTaskData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      return(
        <div  className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
            <button  onClick={()=>openModal() }>+ New Task</button>
             <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
                // className="w-3/4 bg-white rounded-xl p-8"
            >
                <h1 className="text-3xl mb-6">New Project</h1>
                <form onSubmit={handleSubmit}>
                        <input
                          className={clsx(
                              "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full mt-4",
                            )}
                          placeholder="task name" 
                          type="text" name="name"
                          value={formData.name} 
                          onChange={(e) =>
                          setFormData((s) => ({ ...s, name: e.target.value }))
                        } 
                        
                    />
                     
                        <textarea
                          className={clsx(
                              "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full",
                          )}
                          placeholder=" Description" name="description" 
                          value={formData.description} 
                          onChange={(e) =>
                          setFormData((s) => ({ ...s, description: e.target.value }))
                        } />
                    <br />
                    <input 
                      className={clsx(
                        "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full",
                      )}
                        type="date" name="due" 
                        value={formData.due} 
                        onChange={(e) =>
                          setFormData((s) => ({ ...s, due: e.target.value }))
                        } />
                    <br />

                    <button type="submit">Submit</button>
                </form>
            </Modal>
        </div>
      )


}
export default  NewTask;