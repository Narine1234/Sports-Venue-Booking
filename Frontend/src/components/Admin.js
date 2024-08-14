import React, { useState, useEffect } from "react";
import AdminTable from "./AdminTable";
import AdminFormPreview from "./AdminForm"; // Make sure this import is correct
import NotificationDropdown from "./NotificationDropdown";
import axios from "axios";
import "./Admin.css";
import { Fab, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function Admin({ initialTurfData }) {
    const [turfs, setTurfs] = useState(initialTurfData);
    const [editingTurf, setEditingTurf] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState("");

    const fetchTurfs = async () => {
        try {
            const response = await axios.get("http://localhost:8081/api/turfs");
            setTurfs(response.data);
        } catch (error) {
            console.error("Failed to fetch turfs:", error);
        }
    };

    const addTurf = async (turf) => {
        try {
            const response = await axios.post("http://localhost:8081/api/turfs", turf);
            setTurfs([...turfs, response.data]);
            setShowForm(false);
        } catch (error) {
            console.error("Failed to add turf:", error);
        }
    };

    const updateTurf = async (updatedTurf) => {
        if (!updatedTurf || !updatedTurf.id) {
            console.error("No turf or turf ID provided for update");
            return;
        }
        try {
            const response = await axios.put(`http://localhost:8081/api/turfs/${updatedTurf.id}`, updatedTurf);
            setTurfs(turfs.map(turf => (turf.id === updatedTurf.id ? response.data : turf)));
            setShowForm(false);
            setEditingTurf(null);
        } catch (error) {
            console.error("Failed to update turf:", error);
        }
    };

    const deleteTurf = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/turfs/${id}`);
            setTurfs(turfs.filter(turf => turf.id !== id));
        } catch (error) {
            console.error("Failed to delete turf:", error);
        }
    };

    const startEditing = (turf) => {
        setEditingTurf(turf);
        setFormMode("edit");
        setShowForm(true);
    };

    const handleFabClick = () => {
        setEditingTurf(null);
        setFormMode("add");
        setShowForm(true);
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setEditingTurf(null);
    };
    const handleFormClose = () => {
        setShowForm(false);
        setEditingTurf(null);
    };

    const handleNotificationClick = (notification) => {
        const turfData = {
            title: notification.title,
            ownerName: notification.ownerName,
            license: notification.license,
            address: notification.address,
            openingTime: notification.openingTime,
            phone: notification.phone,
            services: notification.services,
            id: notification.id,
            ownerPersonalNumber: notification.ownerPersonalNumber,
            image: notification.image,
            amountPerHour:notification.amountPerHour,
            maxMembersPerHour:notification.maxMembersPerHour
        };
        setEditingTurf(turfData);
        setFormMode("notification");
        setShowForm(true);
    };

    return (
        <div className="admin">
            <div className="admin-header">
                <h1>Admin Panel</h1>
                <NotificationDropdown onNotificationClick={handleNotificationClick} />
            </div>
            <div className="admin-table">
                <AdminTable turfs={turfs} onEdit={startEditing} onDelete={deleteTurf} />
            </div>

            {showForm && (
                <div className="form-overlay">
                    <AdminFormPreview
                        onSave={handleFormClose}
                        turf={editingTurf}
                        mode={formMode}

                        onCancel={handleFormCancel}
                    />
                </div>
            )}

            <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
                <Fab color="secondary" aria-label="add" onClick={handleFabClick}>
                    <AddIcon />
                </Fab>
            </Box>
        </div>
    );
}

export default Admin;
