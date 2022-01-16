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
export default function AddCategoryWindow({ show, handleClose }) {
  const nameRef = useRef()
  const minRef = useRef(0)
  const hourRef = useRef(0)
  const { addCategory } = useCategories()
  function handleSubmit(e) {
    e.preventDefault()
    addCategory({
      name: nameRef.current.value,
      max: 60 * parseFloat(hourRef.current.value) + parseFloat(minRef.current.value),
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
          New Category
        </Typography>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Limit:</Form.Label>
            <Row>
              <Col><Form.Control
                ref={hourRef}
                type="number"
                required
                min={0}
                step={1}
                placeholder="Hours"
              /></Col>
              <Col> <Form.Control
                ref={minRef}
                type="number"
                required
                min={0}
                max={59}
                step={1}
                placeholder="Minutes"
              /></Col>
            </Row>


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