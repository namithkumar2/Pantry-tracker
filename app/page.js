'use client'
import { useState, useEffect } from 'react'
import { firestore } from '@/firebase'
import { Box, Typography, Button, TextField, Stack } from '@mui/material'
import { collection, doc, getDoc, getDocs, query, updateDoc, setDoc, deleteDoc } from 'firebase/firestore'

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [itemName, setItemName] = useState('')
  const updateInventory = async () => {
    const snapshot = await getDocs(query(collection(firestore, 'inventory')))
    const inventoryList = snapshot.docs
      .map(doc => ({
        name: doc.id, 
        ...doc.data(),
      }))
      .filter(item=> item.count > 0) 
    setInventory(inventoryList)
  }
  const handleAddItem = async (name) => {
    if (name.trim() === "") return; // Avoid empty names
    const itemRef = doc(firestore, 'inventory', name)
    const itemSnapshot = await getDoc(itemRef)
    if (itemSnapshot.exists()) {
      await updateDoc(itemRef, {
        count: itemSnapshot.data().count +1
      })
    } else {
      await setDoc(itemRef, { count: 1 })
    }
    updateInventory()
  }
  const handleRemoveItem = async (name) => {
    if (name.trim() === "") return; 
    const itemRef = doc(firestore, 'inventory', name)
    const itemSnapshot = await getDoc(itemRef)

    if (itemSnapshot.exists() && itemSnapshot.data().count > 0) {
      const newCount = itemSnapshot.data().count - 1
      if (newCount > 0) {
        await updateDoc(itemRef, {
          count: newCount
        })
      } else {
        await deleteDoc(itemRef) 
    }
    updateInventory()
  }
  useEffect(() => {
    updateInventory()
  }, [])
  return (
    <Box padding={5}>
      <Typography variant="h3" textAlign="center">Inventory Management</Typography>
      <Box mt={4} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <TextField 
          label="Item Name" 
          value={itemName} 
          onChange={(e)=> setItemName(e.target.value)} 
          variant="outlined"
          sx={{ mb: 2, width:'300px' }}
        />
        <Button variant="contained" onClick={()=>handleAddItem(itemName)}>Add New Item</Button>
        <Box mt={4} width="100%">
          {inventory.length === 0 ? (
            <Typography>No items in inventory.</Typography>
          ) : (
            inventory.map((item) => (
              <Box key={item.name} mb={2} display="flex" justifyContent="space-between" alignItems="center" sx={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                <Typography variant="h6">{item.name}: {item.count}</Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" onClick={()=>handleAddItem(item.name)}>Add</Button>
                  <Button variant="contained" onClick={() => handleRemoveItem(item.name)}>Remove</Button>
                </Stack>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  )
}
