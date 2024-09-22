import React from 'react';

export default function LabelStatus({
  value = "",
}) {
  return (
    <>
      {value == "1" ? (
        <span style={{ color: 'green' }}>Ativo</span>
      ) : (
        <span style={{ color: 'red' }}>Inativo</span>
      )}
    </>
  )
}