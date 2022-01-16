import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid"
import useLocalStorage from "../hooks/UseLocalStorage";
const CategoryContext = React.createContext();

export function useCategories() {
    return useContext(CategoryContext)
}

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useLocalStorage("categories", [])
    const [activities, setActivities] = useLocalStorage("activities", [])
    const MISC_CATEGORY_ID = "misc"

    function getCategoryActivities(categoryId) {
        return activities.filter(activity => activity.categoryId === categoryId)
    }

    function addActivity({ description, amount, categoryId }) {
        setActivities(prevActivities => {
            return [...prevActivities, { id: uuidV4(), description, amount, categoryId }]
        })
    }

    function addCategory({ name, max }) {
        setCategories(prevCategories => {
            if (prevCategories.find(category => category.name === name)) {
                return prevCategories
            }
            return [...prevCategories, { id: uuidV4(), name, max }]
        })
    }

    function deleteCategory({ id }) {
        setActivities(prevActivities => {
            return prevActivities.map(activity => {
                if (activity.categoryId === id) return { ...activity, categoryId: MISC_CATEGORY_ID }
                return activity
            }
            )
        })
        setCategories(prevCategories => {
            return prevCategories.filter(category => category.id !== id)
        })
    }

    function deleteActivity({ id }) {
        setActivities(prevActivities => {
            return prevActivities.filter(activity => activity.id !== id)
        })
    }

    return (
        <CategoryContext.Provider
            value={{
                categories,
                activities,
                getCategoryActivities,
                addActivity,
                addCategory,
                deleteCategory,
                deleteActivity,
                MISC_CATEGORY_ID
            }}
        >
            {children}
        </CategoryContext.Provider>
    )
}