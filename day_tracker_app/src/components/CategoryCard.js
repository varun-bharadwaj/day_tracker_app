import React, {useState} from 'react'
import { Button, Card, ProgressBar, Stack } from 'react-bootstrap'
import { currencyFormatter } from '../utils'
import AddActivityWindow from './AddActivityWindow'
import ViewActivityWindow from './ViewActivityWindow'

export default function CategoryCard({ id, name, amount, max, cardGray }) {
    const classNames = []
    if (amount > max) {
        classNames.push("bg-danger", "bg-opacity-10")
    } else if(cardGray){
        classNames.push("bg-light")
    }
    const [showAddActivityWindow, setShowAddActivityWindow] = useState(false)
    const [showViewActivitiesWindow, setShowViewActivitiesWindow] = useState()

    return (
        <>
        <Card className={classNames.join(" ")}>
            <Card.Body>
                <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                    <div className='me-2'>{name}</div>
                    <div className='d-flex align-items-baseline'>
                        {currencyFormatter(amount)}
                        {max && (<span className='text-muted fs-6 ms-1'>
                            /
                            {currencyFormatter(max)}
                        </span>)}</div>
                </Card.Title>
                {max && (<ProgressBar
                    className='rounded-pill'
                    variant={getProgressBarColor(amount, max)}
                    min={0}
                    max={max}
                    now={amount}
                />)}
                <Stack direction="horizontal" gap="2" className="mt-4">
                    <Button variant="outline-primary" className='ms-auto' onClick={()=> setShowAddActivityWindow(true)}>Add Activity</Button>
                    <Button variant="outline-secondary" onClick={()=> setShowViewActivitiesWindow(id)}>View Breakdown</Button>
                </Stack>
            </Card.Body>
        </Card>
        <AddActivityWindow show={showAddActivityWindow} handleClose={() => setShowAddActivityWindow(false)} defaultCategoryId={id}/>
        <ViewActivityWindow categoryId={showViewActivitiesWindow} handleClose={()=> setShowViewActivitiesWindow()}/>
        </>
    )
}

function getProgressBarColor(currAmount, total) {
    const ratio = currAmount / total;
    if (ratio > 0.75) return "danger"
    if (ratio > 0.5) return "warning"
    return 'primary'

}
