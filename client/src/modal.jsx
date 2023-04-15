import React from "react";
import 'bulma/css/bulma.min.css';

const Modal = ({ open,onClose }) => {
    
    if (!open) return null;
    return (
        <div onClick={onClose} className="overlay">
            <div className="modalcontainer">
                <div className="modalLeft">
                    <div className="title">
                        <h1>Array Prototype ใน Java</h1>
                    </div>

                    <div className="content">
                            <h5>.push()</h5>
                            <p>เป็น function ที่เพิ่มค่าเข้าไปที่ค่าสุดท้ายของ array</p>
                            <h5>.pop()</h5>
                            <p>เป็นการนำค่าใน index สุดท้ายออกมา และ return ค่านั้นออกมา</p>
                            <h5>.splice()</h5>
                            <p>เป็นการเพิ่มข้อมูลเข้าไปใน array แบบระบุตำแหน่งหรือแทรกเข้าไปในตำแหนงที่ต้องการ</p>
                            <h5>.sort()</h5>
                            <p>ใช้เพื่อจัดเรียงข้อมูลจากน้อยไปมาก</p>
                            <h5>.reverse()</h5>
                            <p>ใช้เพื่อจัดเรียงข้อมูลมากไปน้อย</p>
                    </div>
                </div>

            </div>    
        </div>
    )
};

export default Modal;