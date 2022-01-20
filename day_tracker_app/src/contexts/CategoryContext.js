import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid"
import { useLocalStorage, useLocalStorageCategories } from "../hooks/UseLocalStorage";
const CategoryContext = React.createContext();

export function useCategories() {
    return useContext(CategoryContext)
}

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useLocalStorageCategories("categories", [])
    const [activities, setActivities] = useLocalStorage("activities", [])
    const MISC_CATEGORY_ID = "misc"

    function getCategoryActivities(categoryId) {
        return activities.filter(activity => activity.categoryId === categoryId)
    }

    async function addActivity({ description, amount, categoryId }) {
        const id = uuidV4()
        const newActivity = { id: id, description, amount, categoryId }
        setActivities(prevActivities => {
            return [...prevActivities, newActivity]
        })

        await fetch("http://localhost:5000/activity/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newActivity),
        })
            .catch(error => {
                window.alert(error);
                return;
            });


    }

    async function addCategory({ name, max }) {
        const newCategory = { id: uuidV4(), name, max }
        setCategories(prevCategories => {
            if (prevCategories.find(category => category.name === name)) {
                return prevCategories
            }
            return [...prevCategories, newCategory]
        })

        await fetch("http://localhost:5000/record/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCategory),
        })
            .catch(error => {
                window.alert(error);
                return;
            });
    }

    async function deleteCategory( id, mongoId ) {
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
        await fetch(`http://localhost:5000/${mongoId}`, {
            method: "DELETE"
        });

    }

    async function deleteActivity(id, mongoId) {
        setActivities(prevActivities => {
            return prevActivities.filter(activity => activity.id !== id)
        })
        await fetch(`http://localhost:5000/${mongoId}`, {
            method: "DELETE"
        });
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