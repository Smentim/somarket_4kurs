import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { Context } from "../../index";
import { createItems, fetchClasses, fetchTypes } from "../../http/ItemAPI";
import { observer } from "mobx-react-lite";

const CreateItem = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [weight, setWeight] = useState('')
    const [level, setLevel] = useState('')
    const [file, setFile] = useState(null)
    const [moa, setMoa] = useState('')
    const [rateoffire, setRateoffire] = useState('')
    const [breakingthrought, setBreakingthrought] = useState('')
    const [strength, setStrength] = useState('')
    const [recoil, setRecoil] = useState('')
    const [handing, setHanding] = useState('')
    const [statewaivers, setStatewaivers] = useState('')
    const [typeammo, setTypeammo] = useState('')
    const [damage, setDamage] = useState('')
    const [nopollution, setNopollution] = useState('')

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchClasses().then(data => device.setClasses(data))
      }, [device])

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addItem = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', desc)
        formData.append('weight', `${weight}`)
        formData.append('level', `${level}`)
        formData.append('typeId', device.selectedType.id)
        formData.append('classId', device.selectedClass.id)
        formData.append('img', file)
        if (device.selectedType.name === "Патроны") {
            const ammoInfo = JSON.stringify([{ type_ammo: typeammo, breaking_throught: breakingthrought, damage: damage }]);
            formData.append('ammo_infos', ammoInfo);
        }
        if (device.selectedType.name === "Оружие") {
            const weaponInfo = JSON.stringify([{ moa: moa, rate_of_fire: rateoffire, breaking_throught: breakingthrought, strength: strength, recoil: recoil, handing: handing, state_waivers: statewaivers, nopollution: nopollution }]);
            formData.append('weapons', weaponInfo);
        }
        console.log("FormData being sent:", Object.fromEntries(formData.entries()));
        createItems(formData).then(data => {
            console.log("Item created successfully:", data);
            onHide();
        }).catch(err => {
            console.error("Error creating item:", err);
        });
    }

    return (
        <Modal
          show={show}
          onHide={onHide}
          size="lg"
          centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Добавить тип
                </Modal.Title>
             </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item onClick={() => device.setSelectedType(type)} key={type.id}>{type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle>{device.selectedClass.name || "Выберите класс"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.classes.map(classe =>
                                <Dropdown.Item onClick={() => device.setSelectedClass(classe)} key={classe.id}>{classe.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название предмета"
                    />
                    <Form.Control 
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                        className="mt-3"
                        placeholder="Введите описание предмета"
                    />
                    <Form.Control 
                        value={weight}
                        onChange={e => setWeight(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите вес предмета"
                        type="number"
                        step="0.01"
                    />
                    <Form.Control 
                        value={level}
                        onChange={e => setLevel(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите уровень предмета"
                        type="number"
                        step="0.01"
                    />
                    <Form.Control 
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />

                    {device.selectedType.name === "Патроны" && (
                        <>
                            <Form.Control 
                                value={typeammo}
                                onChange={e => setTypeammo(e.target.value)}
                                className="mt-3"
                                placeholder="Тип патрона"
                            />
                            <Form.Control 
                                value={breakingthrought}
                                onChange={e => setBreakingthrought(Number(e.target.value))}
                                className="mt-3"
                                placeholder="Пробитие патрона"
                                type="number"
                                step="0.01"
                            />
                            <Form.Control 
                                value={damage}
                                onChange={e => setDamage(e.target.value)}
                                className="mt-3"
                                placeholder="Урон патрона"
                            />
                        </>
                    )}

                    {device.selectedType.name === "Оружие" && (
                        <>
                            <Form.Control 
                                value={moa}
                                onChange={e => setMoa(Number(e.target.value))}
                                className="mt-3"
                                placeholder="Введите МОА"
                                type="number"
                                step="0.01"
                            />
                            <Form.Control 
                                value={rateoffire}
                                onChange={e => setRateoffire(Number(e.target.value))}
                                className="mt-3"
                                placeholder="Введите темп"
                                type="number"
                                step="1"
                            />
                            <Form.Control 
                                value={breakingthrought}
                                onChange={e => setBreakingthrought(Number(e.target.value))}
                                className="mt-3"
                                placeholder="Введите пробитие"
                                type="number"
                                step="1"
                            />
                            <Form.Control 
                                value={strength}
                                onChange={e => setStrength(Number(e.target.value))}
                                className="mt-3"
                                placeholder="Введите прочность"
                                type="number"
                                step="1"
                            />
                            <Form.Control 
                                value={recoil}
                                onChange={e => setRecoil(Number(e.target.value))}
                                className="mt-3"
                                placeholder="Введите отдачу"
                                type="number"
                                step="1"
                            />
                            <Form.Control 
                                value={handing}
                                onChange={e => setHanding(Number(e.target.value))}
                                className="mt-3"
                                placeholder="Введите качание"
                                type="number"
                                step="1"
                            />
                            <Form.Control 
                                value={statewaivers}
                                onChange={e => setStatewaivers(Number(e.target.value))}
                                className="mt-3"
                                placeholder="Введите отказ от состояния"
                                type="number"
                                step="1"
                            />
                            <Form.Control 
                                value={nopollution}
                                onChange={e => setNopollution(Number(e.target.value))}
                                className="mt-3"
                                placeholder="Введите отказ от загрязнеения"
                                type="number"
                                step="1"
                            />
                        </>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addItem}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateItem;