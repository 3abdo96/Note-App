// * ==========> ADD NOTE

import axios from "axios";
import Swal from "sweetalert2";

// [1] Show Modal to Write Note (Title , Content)
export function showModalNote({ token, updater }) {
  Swal.fire({
    title: "Add Note",
    html: `
    <input type="text" placeholder="Enter a Title" id="title" name="title" class="form-control"/>
    <textarea type="text" placeholder="Enter a Description" id="content" name="content" class="form-control mt-3"></textarea>
    `,

    showCancelButton: true,
    confirmButtonText: "Add",
    showLoaderOnConfirm: true,
    preConfirm: () => {
      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      return { title, content };
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    sendDataToAddNote({
      title: result.value.title,
      content: result.value.content,
      token,
      updater,
    });
  });
}

// [2] Send the data to the API and add it to the database
async function sendDataToAddNote({ title, content, token, updater }) {
  let { data } = await axios.post(
    "https://note-sigma-black.vercel.app/api/v1/notes",
    { title, content },
    {
      headers: {
        token,
      },
    }
  );

  if (data.msg === "done") {
    getAllNotes({ token, updater });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your Note has been added",
      showConfirmButton: false,
      timer: 3000,
    });
  }
}

// [3] SHow the Notes are created
export async function getAllNotes({ token, updater }) {
  try {
    let { data } = await axios.get(
      "https://note-sigma-black.vercel.app/api/v1/notes",
      {
        headers: {
          token,
        },
      }
    );

    updater(data.notes);
  } catch (error) {
    updater([]);
  }
}

// * ==========> Delete NOTE
// [1] Show Modal to Confirm the action
export function showDeleteModal({ noteID, token, updater }) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      // Send Data to Delete Note
      sendDataToDeleteNote({ noteID, token, updater });
    }
  });
}

//[2] Send Data to Delete Note
async function sendDataToDeleteNote({ noteID, token, updater }) {
  let { data } = await axios.delete(
    `https://note-sigma-black.vercel.app/api/v1/notes/${noteID}`,
    {
      headers: {
        token,
      },
    }
  );
  getAllNotes({ token, updater });
  Swal.fire("Deleted!", "Your Note has been deleted.", "success");
}

// * ==========> Update NOTE
// [1] show modal to update note
export function showUpdateModalNote({
  prevTitle,
  prevContent,
  noteID,
  token,
  updater,
}) {
  Swal.fire({
    title: "Update Note",
    html: `
    <input type="text" placeholder="Enter a Title" id="title" name="title" class="form-control" value="${prevTitle}"/>
    <textarea type="text" placeholder="Enter a Description" id="content" name="content" class="form-control mt-3">${prevContent}</textarea>
    `,

    showCancelButton: true,
    confirmButtonText: "Update",
    showLoaderOnConfirm: true,
    preConfirm: () => {
      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      return { title, content };
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    sendDataToUpdateNote({
      noteID,
      token,
      details: { title: result.value.title, content: result.value.content },
      updater,
    });
  });
}

// [2] Send Data To Update Note
async function sendDataToUpdateNote({ noteID, token, details, updater }) {
  let { data } = await axios.put(
    `https://note-sigma-black.vercel.app/api/v1/notes/${noteID}`,
    details,
    {
      headers: {
        token,
      },
    }
  );

  if (data.msg === "done") {
    getAllNotes({ token, updater });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your Note has been updated",
      showConfirmButton: false,
      timer: 3000,
    });
  }
}
