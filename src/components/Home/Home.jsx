import React, { useContext, useEffect, useState } from "react";
import NotFoundImg from "../../assets/notfounddark.png";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { CiStickyNote } from "react-icons/ci";
import  Modal  from "../Modal/Modal";


export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const { token } = useContext(UserContext);
  const [notes, setNotes] = useState([]);



  const handelModal =()=>{
    setShowModal(true)
  }

  const getUserNotes = async () => {
    try {
      const { data } = await axios.get(
        `https://note-sigma-black.vercel.app/api/v1/notes`,
        {
          headers: {
            token: "3b8ny__" + token,
          },
        }
      );
      console.log(data);
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    token && getUserNotes();
  }, [token]);

  return (
    <>
      {notes.length == 0 ? (
        <div className="text-center">
          <img src={NotFoundImg} className="w-1/3 mx-auto" />
          <p className="text-gray-200 p-3 text-2xl">No Notes Found</p>
        </div>
      ) : (
        <div className="container mx-auto mt-20">
          <div className="row w-4/5 mx-auto">
            {/*Notes map*/}

            {notes.map((note) => (
              <div
                key={note._id}
                className="w-full md:w-1/2 lg:w-1/4 xl:w-1/4 text-white text-center p-4"
              >
                <div className="inner flex flex-col rounded-lg bg-[#202020] p-6">
                  <div className="flex items-center font-bold justify-between border-b-2 text-3xl mb-5 flex-col">
                    <h2 className="capitalize mb-2">{note.title}</h2>
                    <div className="flex w-full justify-between">
                      <MdDelete className="cursor-pointer" />
                      <FaEdit className="cursor-pointer" />
                    </div>
                  </div>
                  <p className="text-xl">{note.content}</p>
                </div>
              </div>
            ))}

            <button
            onClick={handelModal}
              className="hover:bg-sky-950 duration-300 cursor-pointer absolute top-20 right-5 text-gray-200 rounded px-5 py-3 bg-[#005dcb] flex items-center justify-center"
              type="button"
            >
              <CiStickyNote className="mr-3" />
              Add Note
            </button>


{showModal && <Modal setShowModal={setShowModal} setNotes={setNotes} notes={notes}/>}
          </div>
        </div>
      )}
    </>
  );
}
