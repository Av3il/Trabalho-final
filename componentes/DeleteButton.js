'use client';

import { useFormStatus } from 'react-dom';

function DeleteButton({ text = "Excluir", confirmationMessage = "Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.", className = "" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        padding: '5px 10px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer'
      }}
      onClick={(e) => {
        if (!confirm(confirmationMessage)) {
          e.preventDefault();
        }
      }}
    >
      {pending ? 'Excluindo...' : text}
    </button>
  );
}

export default DeleteButton;