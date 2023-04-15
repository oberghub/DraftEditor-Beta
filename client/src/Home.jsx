import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Combobox, DropdownList } from 'react-widgets';

function Home() {
    const navigate = useNavigate()
    const [createRoomModal, setCreateRoomModal] = useState(false)
    const [roomData, setRoomData] = useState([
        {
            title: "หัดใช้ภาษา python",
            timeStamp: "01/05/2023",
            template: "Python",
        },
        {
            title: "สี่เหลี่ยมสีแดง",
            timeStamp: "01/05/2023",
            template: "HTML",
        }
    ])
    const template = ["Basic Website", "Python", "C", "Javascript", "Java"]
    const [roomName, setRoomName] = useState("")
    const [selectedTemplate, setSelectedTemplate] = useState("")
    const mapRoom = () => {
        let arr2 = roomData.map((item => Object.assign(item, { optionState: false })))
        console.log(arr2);
        return arr2
    }
    const setOptionState = (state, index) => {
        let arr = [...roomMapped]
        arr[index].optionState = state
        setRoomMapped(arr)
    }
    const createDraft = () => {
        let arr = [...roomData]
        arr.push({
            title : roomName,
            timeStamp : '15/4/2023',
            template : selectedTemplate,
            optionState : false
        })
        console.log(arr)
        setRoomData(arr)
    }
    const nameChange = (event) => {
        setRoomName(event.target.value)
    }
    const templateChange = (event) => {
        setSelectedTemplate(event)
    }
    const [roomMapped, setRoomMapped] = useState(mapRoom)
    return (
        <>
            {createRoomModal ?
                <div className="overlay">
                    <div className="modalcontainer" style={{ padding: '2em', position: 'relative', width: '500px', height: '600px' }}>
                        <div>
                            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ color: '#353535', fontSize: '24px' }}>สร้างห้องทดลอง</div>
                                <div style={{ cursor: 'pointer', color: '#353535', fontSize: '24px' }} onClick={() => { setCreateRoomModal(!createRoomModal) }}>X</div>
                            </div>
                            <div style={{ width: '100%', marginTop: '15px', marginBottom: '10px', color: '#353535' }}>
                                เลือกรูปแบบที่คุณต้องการ
                            </div>
                            <Combobox
                                placeholder='โปรดเลือก'
                                data={template}
                                onChange={templateChange}
                            ></Combobox>
                            <div style={{ width: '100%', marginTop: '15px', marginBottom: '10px', color: '#353535' }}>
                                ตั้งชื่องานของคุณ
                            </div>
                            <input type='text' style={{
                                width: '100%', border: '1px solid lightgray', borderRadius: '3px', height: '40px', fontSize: '16px',
                                paddingLeft: '15px'
                            }} onChange={nameChange} required />
                            <div style={{
                                width: '100px', height: '40px', cursor: 'pointer',
                                backgroundColor: '#5cb86b', color: 'white', borderRadius: '5px', display: 'flex',
                                justifyContent: 'center', alignItems: 'center', position : 'absolute', right : 20, bottom : 20
                            }} onClick={() => { setCreateRoomModal(false), createDraft() }}>
                                ยืนยัน
                            </div>
                        </div>
                    </div>
                </div>
                :
                null}
            <div style={{ maxWidth: '100%', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '1660px', display: 'flex', padding: '2em', borderBottom: '0.5px solid gray' }}>
                    <div style={{ width: '100%', color: 'white', }}>
                        <div style={{ fontSize: '24px' }}>
                            DraftEditor (Beta)
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ maxWidth: '100%', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '1660px', display: 'flex', justifyContent: 'space-between', color: 'white', padding: '2em' }}>
                    <div style={{ fontSize: '22px' }} onClick={mapRoom}>
                        กระดานของฉัน
                    </div>
                    <div style={{
                        width: '100px', height: '40px', cursor: 'pointer',
                        backgroundColor: '#5cb86b', color: 'white', borderRadius: '5px', display: 'flex',
                        justifyContent: 'center', alignItems: 'center'
                    }} onClick={() => { setCreateRoomModal(!createRoomModal) }}>
                        สร้าง
                    </div>
                </div>
            </div>
            <div style={{
                maxWidth: '100%', display: 'flex', justifyContent: 'center'
            }}>
                <div style={{
                    width: '1660px', display: 'grid', placeItems: 'center', gap: '1em',
                    gridTemplateColumns: 'repeat(4, 1fr)', padding: '15px'
                }}>
                    {roomMapped.map((item, index) => {
                        return (
                            <>
                                <div key={item} style={{ width: '100%', height: '200px', backgroundColor: '#e1e1e1', position: 'relative' }}>
                                    <div style={{
                                        width: '100%', display: 'flex', justifyContent: 'space-between', backgroundColor: 'transparent',
                                        padding: '1em', color: 'white'
                                    }}>
                                        <div style={{ backgroundColor: 'transparent', fontSize: '20px' }}>{item.title}</div>
                                        {/* 3dots */}
                                        <div onClick={() => { setOptionState(!item.optionState, index) }} style={{ backgroundColor: 'transparent', fontSize: '14px', cursor: 'pointer', display: 'flex', gap: '3px', marginTop: '10px', height: '20px' }}>
                                            <div style={{ width: '5px', height: '5px', borderRadius: '100%', backgroundColor: '#353535' }} />
                                            <div style={{ width: '5px', height: '5px', borderRadius: '100%', backgroundColor: '#353535' }} />
                                            <div style={{ width: '5px', height: '5px', borderRadius: '100%', backgroundColor: '#353535' }} />
                                        </div>
                                    </div>

                                    <div style={{
                                        display: 'flex', justifyContent: 'space-between', backgroundColor: 'transparent',
                                        padding: '1em', color: 'gray', alignItems: 'center', position: 'absolute', left: 0, bottom: 0
                                    }}>
                                        <div style={{ backgroundColor: 'transparent', fontSize: '16px' }}>รูปแบบ : {item.template}</div>
                                    </div>
                                    <div style={{
                                        display: 'flex', justifyContent: 'space-between', backgroundColor: 'transparent',
                                        padding: '1em', color: 'gray', alignItems: 'center', position: 'absolute', bottom: 25
                                    }}>
                                        <div style={{ backgroundColor: 'transparent', fontSize: '14px' }}>{item.timeStamp}</div>
                                    </div>
                                    <div onClick={() => { navigate("/coding", { state: { data: item } }) }} style={{
                                        width: '60px', height: '30px', backgroundColor: '#5cb86b', borderRadius: '5px', color: 'white', display: 'grid', placeItems: 'center',
                                        position: 'absolute', right: 10, bottom: 10, cursor: 'pointer'
                                    }}>Go</div>

                                    {item.optionState ?
                                        <div style={{
                                            width: '60px', backgroundColor: '#e1e1e1',
                                            position: 'absolute', top: 45, right: 15, fontSize: '14px'
                                        }}>
                                            <div style={{ cursor: 'pointer', padding: '5px', borderBottom: '1px solid #e1e1e1', display: 'grid', placeItems: 'center', backgroundColor: '#d1d1d1', color: '#353535' }}>
                                                ตั้งค่า
                                            </div>
                                            <div style={{ cursor: 'pointer', padding: '5px', borderBottom: '1px solid #e1e1e1', display: 'grid', placeItems: 'center', backgroundColor: '#d1d1d1', color: '#353535' }}>
                                                แก้ไข
                                            </div>
                                            <div style={{ cursor: 'pointer', padding: '5px', borderBottom: '1px solid #e1e1e1', display: 'grid', placeItems: 'center', backgroundColor: '#d1d1d1', color: 'red' }}>
                                                ลบ
                                            </div>
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Home
