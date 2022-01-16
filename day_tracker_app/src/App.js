import Container from 'react-bootstrap/Container'
import CategoryCard from './components/CategoryCard';
import AddCategoryWindow from './components/AddCategoryWindow';
import AddActivityWindow from './components/AddActivityWindow'
import { useState } from 'react';
import { useCategories } from './contexts/CategoryContext';
import MiscCategoryCard from './components/MiscCategoryCard';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function App() {
  const [showAddCategoryWindow, setShowAddCategoryWindow] = useState(false)
  const [showAddActivityWindow, setShowAddActivityWindow] = useState(false)

  const { categories, getCategoryActivities } = useCategories()
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <Container className='my-4'>
        <Stack direction='row' spacing={2} className='mb-2'>
          <h1 className='me-auto'>Activities</h1>
          <Button variant='contained' onClick={() => setShowAddCategoryWindow(true)}>Add Category</Button>
          <Button variant='outlined' onClick={() => setShowAddActivityWindow(true)}>Add Activity</Button>
        </Stack>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px,1fr))",
          gap: "1rem",
          alignItems: "flex-start"
        }}>
          {
            categories.map(Category => {
              const CategoryAmount = getCategoryActivities(Category.id).reduce((total, activity) => total + activity.amount, 0)
              return (
                <CategoryCard key={Category.id} name={Category.name} amount={CategoryAmount} max={Category.max} id={Category.id} />
              )
            })
          }
          <MiscCategoryCard />
        </div>
      </Container>
      <AddCategoryWindow show={showAddCategoryWindow} handleClose={() => setShowAddCategoryWindow(false)} />
      <AddActivityWindow show={showAddActivityWindow} handleClose={() => setShowAddActivityWindow(false)} />
    </>
  );
}

export default App;
