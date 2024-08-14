import React, { useState, useEffect, useCallback } from 'react';
import './AdminTable.css';
import AdminFormPreview from './AdminForm';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FaFilter, FaEllipsisV, FaChevronDown } from 'react-icons/fa';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';

function AdminTable() {
  const [turfs, setTurfs] = useState([]);
  const [editingTurf, setEditingTurf] = useState(null);
  const [showFormPreview, setShowFormPreview] = useState(false);
  const [selectedTurfIds, setSelectedTurfIds] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const [expandedRowIds, setExpandedRowIds] = useState([]);

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/turfs');
        setTurfs(response.data);
      } catch (error) {
        console.error('Error fetching turfs:', error);
      }
    };

    fetchTurfs();
  }, []);

  const handleEdit = useCallback((turf) => {
    setEditingTurf(turf);
    setShowFormPreview(true);
  }, []);

  const handleSave = useCallback((updatedTurf) => {
    axios.put(`http://localhost:8081/api/turfs/${updatedTurf.id}`, updatedTurf)
      .then(response => {
        setTurfs(turfs.map(turf => turf.id === updatedTurf.id ? response.data : turf));
        setShowFormPreview(false);
        setEditingTurf(null);
      })
      .catch(error => {
        console.error('Error updating turf:', error);
      });
  }, [turfs]);

  const handleCancel = useCallback(() => {
    setShowFormPreview(false);
    setEditingTurf(null);
  }, []);

  const handleDelete = useCallback((id) => {
    axios.delete(`http://localhost:8081/api/turfs/${id}`)
      .then(() => {
        setTurfs(turfs.filter(turf => turf.id !== id));
      })
      .catch(error => {
        console.error('Error deleting turf:', error);
      });
  }, [turfs]);

  const handleSelectAll = useCallback(() => {
    const allIds = turfs.map(turf => turf.id);
    setSelectedTurfIds(allIds);
  }, [turfs]);

  const handleDeleteAll = useCallback(() => {
    axios.delete('http://localhost:8081/api/turfs', { data: { ids: selectedTurfIds } })
      .then(() => {
        setTurfs(turfs.filter(turf => !selectedTurfIds.includes(turf.id)));
        setSelectedTurfIds([]);
        setSelectMode(false);
      })
      .catch(error => {
        console.error('Error deleting selected turfs:', error);
      });
  }, [selectedTurfIds, turfs]);

  const handleSelectToggle = useCallback(() => {
    setSelectMode(prevSelectMode => !prevSelectMode);
    setSelectedTurfIds([]);
  }, []);

  const handleSelectChange = useCallback((id) => {
    setSelectedTurfIds(prevSelected => 
      prevSelected.includes(id) 
        ? prevSelected.filter(turfId => turfId !== id) 
        : [...prevSelected, id]
    );
  }, []);

  const handleExpandToggle = useCallback((id) => {
    setExpandedRowIds(prevExpanded => 
      prevExpanded.includes(id) 
        ? prevExpanded.filter(turfId => turfId !== id) 
        : [...prevExpanded, id]
    );
  }, []);

  const formatServices = (services) => {
    if (typeof services === 'string') {
      return services.split(',').map(service => service.trim()).join(', ');
    } else if (Array.isArray(services)) {
      return services.map(service => service.trim()).join(', ');
    } else {
      return 'N/A';
    }
  };

  return (
    <div className="admin-container">
      <div className="header">
        <h1>Sports Venue</h1>
        <div className="header-actions">
          <button className="filter-button">
            <FaFilter />
          </button>
          <DropdownButton className="three-dots-dropdown" id="three-dots-dropdown" title={<FaEllipsisV />}>
            <Dropdown.Item onClick={handleSelectToggle}>Select</Dropdown.Item>
            <Dropdown.Item onClick={handleSelectAll}>Select All</Dropdown.Item>
            <Dropdown.Item onClick={handleDeleteAll}>Delete All</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>
                {selectMode && (
                  <input
                    type="checkbox"
                    checked={selectedTurfIds.length === turfs.length}
                    onChange={handleSelectAll}
                  />
                )}
                S.No.
              </th>
              <th>Name</th>
              <th>Address</th>
              <th>Services</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {turfs.map((turf, index) => (
              <React.Fragment key={turf.id}>
                <tr>
                  <td>
                    {selectMode ? (
                      <input 
                        type="checkbox" 
                        checked={selectedTurfIds.includes(turf.id)} 
                        onChange={() => handleSelectChange(turf.id)} 
                      />
                    ) : (
                      index + 1
                    )}
                  </td>
                  <td>{turf.title}</td>
                  <td>{turf.address}</td>
                  <td>{formatServices(turf.services)}</td>
                  <td>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button size="small" variant="outlined" color="primary" onClick={() => handleEdit(turf)}>
                        Edit
                      </Button>
                      <Button size="small" variant="contained" color="error" onClick={() => handleDelete(turf.id)}>
                        Delete
                      </Button>
                      <Button size="small" variant="text" onClick={() => handleExpandToggle(turf.id)}>
                        <FaChevronDown />
                      </Button>
                    </Box>
                  </td>
                </tr>
                {expandedRowIds.includes(turf.id) && (
                  <tr className="expanded-row">
                    <td colSpan="5">
                      <div className="expanded-content">
                        <span><strong>Owner:</strong> {turf.ownerName}</span>
                        <span><strong>License Number:</strong> {turf.license}</span>
                        <span><strong>Owner's Personal Number:</strong> {turf.ownerPersonalNumber}</span>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {showFormPreview && (
        <div className="form-overlay">
          <AdminFormPreview 
            turf={editingTurf} 
            onSave={handleSave} 
            onCancel={handleCancel} 
            mode="edit"
          />
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default AdminTable;
