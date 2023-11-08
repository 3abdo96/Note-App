import { useContext } from "react";
import { showDeleteModal, showUpdateModalNote } from "../../utils/Note";
import style from "./Note.module.css";
import { noteContext } from "../../Context/NoteContext";
import { userContext } from "../../Context/UserContext";

export default function Note({note}) {
  const{token}=useContext(userContext);
  const{setNotes}=useContext(noteContext);
  return (
    <>
      <div className={`${style.note} note shadow `}>
        <div className="note-body">
          <h2 className="h6 fw-semibold m-0 font-Montserrat ">{note.title}</h2>
          <p className={`mb-0 mt-2`}>{note.content}</p>
        </div>

        <div className="note-footer">
          <i className="fa-solid fa-pen-to-square pointer me-2" onClick={()=>showUpdateModalNote({prevTitle:note.title,prevContent:note.content,token,updater:setNotes,noteID:note._id})}></i>

          <i className="bi bi-archive-fill pointer" onClick={()=>showDeleteModal({noteID:note._id,token,updater:setNotes})}></i>
        </div>
      </div>
    </>
  );
}
