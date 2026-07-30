import React from 'react'

function ConfirmationModal({ title, rows, onConfirm, confirmText = 'OK' }) {
    return (
        <div className='modal-overlay'>
            <div className='modal-box' role='dialog' aria-modal='true'>
                <div className='content-box'>
                    <h4>{title}</h4>
                    <div className='modal-content'>
                        {rows.map((row, i) => (
                            <div key={i} className='modal-row'>
                                <span className='modal-label'>{row.label}:</span>
                                <span className='modal-value'>{row.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <button className='modal-confirm-btn' onClick={onConfirm}>{confirmText}</button>
            </div>
        </div>
    )
}

export default ConfirmationModal
