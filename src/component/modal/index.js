import React, { useEffect, useRef } from 'react';
import './index.css';

const CustomModal = ({ isOpen, closeModal, children }) => {
    if (!isOpen) return null;
    const modalRef = useRef(null);
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);
    return (
        <div className="modal">
            <div className="modal-content" ref={modalRef}>
                {children}
            </div>
        </div>
    );
};

export default CustomModal;
