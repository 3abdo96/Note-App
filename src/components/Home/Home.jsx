import { useContext, useEffect } from "react";
import styles from "./Home.module.css";
import { noteContext } from "../../Context/NoteContext";
import Loading from "../Loading/Loading";
import Note from "../Note/Note";
import { getAllNotes } from "../../utils/Note";
import { userContext } from "../../Context/UserContext";

export default function Home() {
  const {token}=useContext(userContext)
  const {notes,setNotes}=useContext(noteContext)

  useEffect(() => {
    getAllNotes({token,updater:setNotes});
  },[])
  return (
    <>

      <h2 className="font-Montserrat h4 heading">
        <i className="bi bi-folder me-2"></i>My Notes
      </h2>

      {!notes? <Loading/>: notes.length === 0 ? <h2 className="d-flex justify-content-center align-items-center">No Notes To Show</h2>:<div className={styles.notes}>{notes.map((noteDetails)=><Note note={noteDetails}/>)}</div> }
    </>
  );
}
