import { db } from "../firebase.js";
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";

// Define products collection
const productsCollection = collection(db, "products");

// Get all products with selected fields
export const getAllProducts = async () => {
    const q = query(
        productsCollection,
        where("show" , "==", true)
    )
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Get products by category with selected fields
export const getByCategory = async (category) => {
    const q = query(
        productsCollection, 
        where("category", "==", category),
        where("show", "==", true)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Get product by ID (this will fetch all fields)
export const getProductById = async (id) => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return null;

    const data = { id: docSnap.id, ...docSnap.data() };
    return data.show? data : null;
};

// For later: Add, update, and delete products
export const addProduct = async (productData) => {
    const docRef = await addDoc(productsCollection, productData);
    return docRef.id;
};

export const updateProduct = async (id, updatedData) => {
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, updatedData);
};

export const deleteProduct = async (id) => {
    const docRef = doc(db, "products", id);
    await deleteDoc(docRef);
};
