import React from 'react'
import { useCategories } from '../contexts/CategoryContext'
import BudgetCard from './CategoryCard'

export default function MiscCategoryCard(props) {
    const {getCategoryActivities , MISC_CATEGORY_ID} = useCategories()
    const amount = getCategoryActivities(MISC_CATEGORY_ID).reduce((total, activity) => total+activity.amount, 0)
    if (amount == 0){
        return null
    }
    return (
        <BudgetCard name="Miscellaneous" id={MISC_CATEGORY_ID} amount={amount} cardGray {...props}/>            
    )
}
