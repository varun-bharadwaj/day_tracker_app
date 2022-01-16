import { Form, Row, Col } from "react-bootstrap"
import { useRef } from "react"
import { useCategories } from "../contexts/CategoryContext"

import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddActivityWindow({ show, handleClose, defaultCategoryId }) {
    const descriptionRef = useRef()
    const categoryIdRef = useRef()
    const minRef = useRef()
    const hourRef = useRef()

    const { addActivity, categories, MISC_CATEGORY_ID } = useCategories()
    function handleSubmit(e) {
        e.preventDefault()
        addActivity({
            description: descriptionRef.current.value,
            amount: 60 * parseFloat(hourRef.current.value) + parseFloat(minRef.current.value),
            categoryId: categoryIdRef.current.value
        })
        handleClose()
    }

    return (
        <Modal
            open={show}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    New Description
                </Typography>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control ref={descriptionRef} type="text" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Time:</Form.Label>
                        <Row>
                            <Col><Form.Control
                                ref={hourRef}
                                type="number"
                                min={0}
                                step={1}
                                placeholder="Hours"
                                required
                            /></Col>
                            <Col> <Form.Control
                                ref={minRef}
                                type="number"
                                min={0}
                                max={59}
                                step={1}
                                placeholder="Minutes"
                                required
                            /></Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Category</Form.Label>
                        <Form.Select defaultValue={defaultCategoryId}
                            ref={categoryIdRef} required>
                            <option key={MISC_CATEGORY_ID} value={MISC_CATEGORY_ID}>Miscellaneous</option>
                            {
                                categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </div>
                </Form>
            </Box>
        </Modal>
    )
}