import React, { useState } from "react";
import { dbService, storageService } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

function Twite({ twiteObj, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newTwite, setNewTwite] = useState(twiteObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this twite?");
    if (ok) {
      await dbService.doc(`twites/${twiteObj.id}`).delete();
      await storageService.refFromURL(twiteObj.attachmentUrl).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`twites/${twiteObj.id}`).update({ text: newTwite });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTwite(value);
  };
  return (
    <div className="twite">
      {editing ? (
        <>
          {" "}
          <form onSubmit={onSubmit} className="container twiteEdit">
            <input
              onChange={onChange}
              value={newTwite}
              required
              type="text"
              className="formInput"
              autoFocus
              placeholder="Edit yout twite"
            />
            <input type="submit" value="Update twite" className="formBtn" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{twiteObj.text}</h4>
          {twiteObj.attachmentUrl && <img src={twiteObj.attachmentUrl} />}
          {isOwner && (
            <div class="twite__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Twite;
