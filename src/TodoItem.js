import React, { useState } from 'react';

function TodoItem({ todo, onUpdate, onDelete, onComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);

  const handleUpdate = async () => {
    onUpdate(todo.id, updatedTitle);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    onDelete(todo.id);
  };

  const handleComplete = async () => {
    onComplete(todo.id);
  };

  return (
    <tr>
      <th scope="row">{todo.id}</th>
      <td>

        {isEditing ? (
          <div>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button type="button" onClick={handleUpdate}>Kaydet</button>
            <button type="button" onClick={() => setIsEditing(false)}>İptal</button>
          </div>
        ) : (
          <div>
            <span
              style={{
                textDecoration: todo.isCompleted ? 'line-through' : 'none',
              }}
            >
              {todo.title}
            </span>
            

          </div>
        )}
      </td>
      <td>
        <button  className="btn btn-warning ms-1" type="button" onClick={() => setIsEditing(true)}>Düzenle</button>
      </td>
      <td>
        <button className="btn btn-danger ms-1" type="button" onClick={handleDelete}>Sil</button>
      </td>
      <td>
        {!todo.isCompleted && (
          <button className="btn btn-success ms-1" type="button" onClick={handleComplete}>Tamamla</button>
        )}
        {todo.isCompleted && (
          <button className="btn btn-danger ms-1" type="button" onClick={handleComplete}>Geri Al</button>
        )}
      </td>
    </tr>
  );
}

export default TodoItem;
