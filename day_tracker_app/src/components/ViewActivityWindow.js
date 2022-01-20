import { useCategories } from "../contexts/CategoryContext"
import { currencyFormatter } from "../utils"
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Stack } from "react-bootstrap";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  width: '75%'
};

export default function ViewActivitiesWindow({ categoryId, handleClose }) {
  const { MISC_CATEGORY_ID, getCategoryActivities, categories, deleteCategory, deleteActivity } =
    useCategories()

  const activities = getCategoryActivities(categoryId)
  const category =
    MISC_CATEGORY_ID === categoryId
      ? { name: "Miscellaneous", id: MISC_CATEGORY_ID }
      : categories.find(b => b.id === categoryId)

  return (
    <Modal
      open={categoryId != null}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction="horizontal" gap="2">
          <Typography id="modal-modal-title" className="me-auto" variant="h4" component="h2">
            {category?.name}
          </Typography>
          {categoryId !== MISC_CATEGORY_ID && (
              <Button
                onClick={() => {
                  deleteCategory(category.id, category._id)
                  handleClose()
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
          )}
        </Stack>
        <Stack direction="vertical" gap="3">
          <Typography id="modal-modal-description" variant="body2" component="h6" sx={{ mt: 3 }}>
            {activities.map(activity => (
              <Stack direction="horizontal" gap={3} key={activity.id}>
                <div className="me-auto fs-4">{activity.description}</div>
                <div className="fs-5">
                  {currencyFormatter(activity.amount)}
                </div>
                <Button
                  onClick={() => deleteActivity(activity.id, activity._id)}
                  size="sm"
                  variant="outline-danger"
                >
                  &times;
                </Button>
              </Stack>
            ))}
          </Typography>
        </Stack>
      </Box>
    </Modal>
  )
}