import React, { useState } from "react";

const Modal = ({ open, onClose }) => {
    const [data, setData] = useState([
        {
            title: "คำสั่งที่ใช้กับ Array ใน Javascript",
            subtitle: [
                { data: "array.push() เป็น function ที่เพิ่มค่าเข้าไปที่ค่าสุดท้ายของ array" },
                { data: "array.pop() เป็นการนำค่าใน index สุดท้ายออกมา และ return ค่านั้นออกมา" },
                { data: "array.splice() เป็นการเพิ่มข้อมูลเข้าไปใน array แบบระบุตำแหน่งหรือแทรกเข้าไปในตำแหนงที่ต้องการ" }
            ]
        },
        {
            title: "วิธีการ Export file",
            subtitle: [
                { data: "1. กดปุ่ม Export จะมีหน้าต่างโผล่ขึ้นมา" },
                { data: "2. ติ๊กเลือกไฟล์ที่ต้องการ" },
                { data: "3. กด Export" },
            ]
        },
    ])

    if (!open) return null;
    return (
        <div className="overlay">
            <div className="modalcontainer" style={{ padding: '2em', position: 'relative' }}>
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ color: '#353535', fontSize: '24px' }}>ช่วยเหลือ (ตัวอย่าง)</div>
                    <div style={{ cursor: 'pointer', color: '#353535', fontSize: '24px' }} onClick={onClose}>X</div>
                </div>
                {data.map((item, index) => {
                    return (<>
                        <div style={{ color: 'white', width: '100%', height: 'auto', backgroundColor: '#e1e1e1', padding: '15px', marginTop: index == 0 ? '0px' : '10px', }}>
                            <div style={{ backgroundColor: 'transparent', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                <div key={index} style={{ backgroundColor: 'transparent' }}>
                                    {item.title}
                                </div>
                                {/* <div onClick={() => { openCard(index), console.log(helpState) }} style={{ backgroundColor: 'transparent', cursor: 'pointer', fontSize: '14px' }}>
                                    ดูข้อมูล
                                </div> */}
                            </div>
                            <div style={{marginTop : '1em', backgroundColor: 'transparent',}}>
                                {item.subtitle.map((item, index) => {
                                    return (
                                        <div style={{backgroundColor: 'transparent', width: '100%', height : 'auto', display: 'flex', justifyContent: 'space-between' }}>
                                            <div key={index} style={{ backgroundColor: 'transparent' }}>
                                                {item.data}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </>
                    )
                })}
            </div>
        </div>
    )
};

export default Modal;