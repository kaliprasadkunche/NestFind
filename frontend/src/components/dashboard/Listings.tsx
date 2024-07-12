// src/components/dashboard/Listings.tsx
import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import MyAppBar from '../layout/AppBar';
import Map from '../Map';
import Filters from './Filters';
import { fetchListings, deleteListing, createListing, updateListing } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Grid,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputBase,
    Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { startChat } from '../../services/api';
import ChatBox from '../chat/chatBox';


const Listings: React.FC = () => {
    const [listings, setListings] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentListing, setCurrentListing] = useState<any>(null);
    const [filteredListings, setFilteredListings] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [cityFilter, setCityFilter] = useState<string>(''); // State for city filter
    const [chatId, setChatId] = useState<number | null>(null);
    // const navigate = useNavigate();

    const { user } = useAuth();

    const [formValues, setFormValues] = useState({
        house_name: '',
        owner_name: '',
        contact_info: '',
        house_type: '',
        room_type: '',
        city: '',
        location: '',
        area: '',
        street: '',
        price: '',
        google_map_location: '',
        images: ['', '', '', '', ''],
    });

    useEffect(() => {
        const getListings = async () => {
            const response = await fetchListings();
            setListings(response?.data || []);
            setFilteredListings(response?.data || []);
        };
        getListings();
    }, []);

    useEffect(() => {
        console.log('User:', user);
        console.log('Listings:', listings);
    }, [user, listings]);

    const handleDelete = async (id: number) => {
        await deleteListing(id);
        setListings(listings.filter((listing) => listing.id !== id));
    };

    const handleEdit = (listing: any) => {
        setCurrentListing(listing);
        setFormValues({
            ...listing,
            images: listing.images || ['', '', '', '', ''], // Ensure images is an array
        });
        setEditMode(true);
        setOpen(true);
    };

    const handleOpenCreateForm = () => {
        setCurrentListing(null);
        setFormValues({
            house_name: '',
            owner_name: '',
            contact_info: '',
            house_type: '',
            room_type: '',
            city: '',
            location: '',
            area: '',
            street: '',
            price: '',
            google_map_location: '',
            images: ['', '', '', '', ''],
        });
        setEditMode(false);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleGetDirection = (location: string) => {
        const googleMapsUrl = location;
        window.open(googleMapsUrl, '_blank');
    };
    

    const handleCall = (contact: string) => {
        window.location.href = `tel:${contact}`;
    };


    const handleChat = async (listingId: number) => {
        try {
            const response = await startChat(listingId);
            console.log('Chat started:', response.data);
            if (response.data && response.data.chat_id) {
                setChatId(response.data.chat_id); // Set the chatId in state
            } else {
                console.error('ChatId not found in response data:', response.data);
            }
        } catch (error) {
            console.error('Error starting chat:', error);
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newImages = [...formValues.images];
        if (e.target.files && e.target.files[0]) {
            newImages[index] = URL.createObjectURL(e.target.files[0]);
        }
        setFormValues({
            ...formValues,
            images: newImages,
        });
    };
    

    const handleLocateMe = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setFormValues({
                        ...formValues,
                        google_map_location: `https://www.google.com/maps?q=${latitude},${longitude}`
                    });
                },
                (error) => {
                    console.error('Error obtaining location', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser');
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('house_name', formValues.house_name);
        formData.append('owner_name', formValues.owner_name);
        formData.append('contact_info', formValues.contact_info);
        formData.append('house_type', formValues.house_type);
        formData.append('room_type', formValues.room_type);
        formData.append('city', formValues.city);
        formData.append('location', formValues.location);
        formData.append('area', formValues.area);
        formData.append('street', formValues.street);
        formData.append('price', formValues.price);
        formData.append('google_map_location', formValues.google_map_location);
        formValues.images.forEach((image, index) => {
            if (image) {
                formData.append(`image${index + 1}`, image);
            }
        });

        if (editMode && currentListing) {
            await updateListing(currentListing.id, formData);
        } else {
            await createListing(formData);
        }
        const response = await fetchListings();
        setListings(response.data || []);
        setOpen(false);
    };


    const applyFilters = (filters: any) => {
        let filtered = listings;

        if (filters.city) {
            filtered = filtered.filter(listing => listing.city === filters.city);
        }
        if (filters.location) {
            filtered = filtered.filter(listing => listing.location === filters.location);
        }
        if (filters.buildingType) {
            filtered = filtered.filter(listing => listing.buildingType === filters.buildingType);
        }
        if (filters.roomType) {
            filtered = filtered.filter(listing => listing.roomType === filters.roomType);
        }
        if (filters.priceRange) {
            const [min, max] = filters.priceRange.split('-').map(Number);
            filtered = filtered.filter(listing => {
                const price = parseInt(listing.price, 10);
                return price >= min && price <= max;
            });
        }

        console.log("Applied Filters:", filters);
        console.log("Filtered Listings:", filtered);

        setFilteredListings(filtered);
        setCityFilter(filters.city || '');
    };

    const clearFilters = () => {
        console.log("Clearing Filters, Resetting Listings to Original");
        setFilteredListings(listings);
        setCityFilter(''); 
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredListings(
            listings.filter(listing => {
                return Object.values(listing).some(value => 
                    typeof value === 'string' && value.toLowerCase().includes(query)
                );
            })
        );
    };

    return (
        <div className="listings-container" style={{ position: 'relative', height: '100vh' }}>
            <MyAppBar />
            <Map listings={listings} cityFilter={cityFilter} className="map-container" />
            {chatId !== null && (
            <div className="chat-box-container">
                <ChatBox chatId={chatId} onClose={() => setChatId(null)} />
            </div>
        )}
            <Box sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Paper
                        component="form"
                        sx={{ display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search Nest"
                            inputProps={{ 'aria-label': 'search listings' }}
                            value={searchQuery}
                            onChange={handleSearchChange} 
                        />
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    <Box>
                        {user && user.user_type === 'Owner' && (
                            <Button
                                variant='contained'
                                color="primary"
                                aria-label="add"
                                onClick={handleOpenCreateForm}
                                sx={{ mr: 1 }}
                                startIcon={<AddIcon />}
                            >
                            Create
                        </Button>
                        )}
                         {user && user.user_type === 'Tenant' && (
                        <Filters applyFilters={applyFilters} clearFilters={clearFilters} />
                        )}
                    </Box>
                </Box>
                {/* <Box>
                {chatId !== null && <ChatBox chatId={chatId} onClose={() => setChatId(null)} />}
                </Box> */}
                <Grid container spacing={0.5}>
                    <Grid item xs={12} md={4.5}>
                    <Box sx={{
                            height: 'calc(100vh - 200px)', 
                            overflowY: 'auto',
                            '::-webkit-scrollbar': {
                                width: '0px',
                                background: 'transparent',
                            }
                        }}>
                        {filteredListings
                            .filter((listing) => user && (user.user_type === 'Tenant' || user.id === listing.user_id))
                            .map((listing) => (
                                <Card key={listing.id} sx={{ mb: 3 }}>
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={4}>
                                            {listing.image1 && (
                                                <img src={listing.image1.replace('blob:', '')} alt="image1" style={{ width: 'auto', height: 'auto' }} />
                                            )}
                                            {listing.image2 && (
                                                <img src={listing.image2.replace('blob:', '')} alt="image2" style={{ width: 'auto', height: 'auto' }} />
                                            )}
                                            {listing.image3 && (
                                                <img src={listing.image3.replace('blob:', '')} alt="image3" style={{ width: 'auto', height: 'auto' }} />
                                            )}
                                            {listing.image4 && (
                                                <img src={listing.image4.replace('blob:', '')} alt="image4" style={{ width: 'auto', height: 'auto' }} />
                                            )}
                                            {listing.image5 && (
                                                <img src={listing.image5.replace('blob:', '')} alt="image5" style={{ width: 'auto', height: 'auto' }} />
                                            )}
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <Typography variant="h6">{listing.house_name}</Typography>
                                                <Typography>Owner : {listing.owner_name}</Typography>
                                                {/* <Typography>{listing.contact_info}</Typography> */}
                                                <Typography>{listing.room_type},{listing.house_type}</Typography>
                                                <Typography>{listing.area},{listing.location},{listing.city}</Typography>
                                                <Typography sx={{fontWeight: 'bold'}}>Price : {listing.price}</Typography>
                                                {user && user.user_type === 'Tenant' && (
                                                    <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginTop: '5px' }}>
                                                        <Box
                                                            component="img"
                                                            src="./google-maps.png"
                                                            alt="Location Icon"
                                                            onClick={() => handleGetDirection(listing.google_map_location)}
                                                            sx={{
                                                                cursor: 'pointer', 
                                                                width: '25px',  
                                                                height: '25px',  
                                                                borderRadius: '50%', 
                                                                marginRight: '10px', 
                                                            }}
                                                        />
                                                        <Box
                                                            component="img"
                                                            src="./phone-call.png"
                                                            alt="call"
                                                            onClick={() => handleCall(listing.contact_info)}
                                                            sx={{
                                                                cursor: 'pointer',
                                                                width: '25px', 
                                                                height: '25px', 
                                                                borderRadius: '50%',
                                                                marginRight: '15px',
                                                            }}
                                                        />
                                                        <IconButton
                                                            color="primary"
                                                            aria-label="chat"
                                                            onClick={() => handleChat(listing.id)}
                                                        >
                                                            <img src="./chat.png" alt="chat" style={{ width: '25px', height: '25px', borderRadius: '10%', marginRight: '10px' }} />
                                                        </IconButton>
                                                    </Box>
                                                    )}
                                                {user && user.user_type === 'Owner' && user.id === listing.user_id && (
                                                    <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginTop: '5px' }}>
                                                    <IconButton
                                                        color="primary"
                                                        aria-label="edit"
                                                        onClick={() => handleEdit(listing)}
                                                    >
                                                        <EditNoteIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        color="primary"
                                                        aria-label="delete"
                                                        onClick={() => handleDelete(listing.id)}
                                                        sx={{ mr: 2 }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    </Box>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                        ))};
                        </Box>
                    </Grid>
                </Grid>
                <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                    <DialogTitle>{editMode ? 'Edit Listing' : 'Create New Listing'}</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    margin="dense"
                                    label="Name of House/Appartment/PG"
                                    name="house_name"
                                    value={formValues.house_name}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    margin="dense"
                                    label="Name of House/Appartment/PG Owner"
                                    name="owner_name"
                                    value={formValues.owner_name}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    margin="dense"
                                    label="Contact"
                                    name="contact_info"
                                    value={formValues.contact_info}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    margin="dense"
                                    label="Type Of Building"
                                    name="house_type"
                                    value={formValues.house_type}
                                    onChange={handleChange}
                                    select
                                    SelectProps={{ native: true }}
                                    fullWidth
                                >
                                    <option value=""></option>
                                    <option value="Individual House">Individual House</option>
                                    <option value="Individual Apartment">Individual Apartment</option>
                                    <option value="Semi-Gated Apartment">Semi-Gated Apartment</option>
                                    <option value="Gated Apartment">Gated Apartment</option>
                                    <option value="PG">PG</option>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    margin="dense"
                                    label="Type Of Flat/Room"
                                    name="room_type"
                                    value={formValues.room_type}
                                    onChange={handleChange}
                                    select
                                    SelectProps={{ native: true }}
                                    fullWidth
                                >
                                    <option value=""></option>
                                    {formValues.house_type === 'Individual House' && (
                                        <>
                                            <option value="1BHK House">1BHK House</option>
                                            <option value="2BHK House">2BHK House</option>
                                            <option value="3BHK House">3BHK House</option>
                                            <option value="4BHK House">4BHK House</option>
                                        </>
                                    )}
                                    {formValues.house_type === 'Individual Apartment' && (
                                        <>
                                            <option value="1BHK Flat">1BHK Flat</option>
                                            <option value="2BHK Flat">2BHK Flat</option>
                                            <option value="3BHK Flat">3BHK Flat</option>
                                        </>
                                    )}
                                    {formValues.house_type === 'Semi-Gated Apartment' && (
                                        <>
                                            <option value="1BHK Flat">1BHK Flat</option>
                                            <option value="2BHK Flat">2BHK Flat</option>
                                            <option value="3BHK Flat">3BHK Flat</option>
                                        </>
                                    )}
                                    {formValues.house_type === 'Gated Apartment' && (
                                        <>
                                            <option value="1BHK Flat">1BHK Flat</option>
                                            <option value="2BHK Flat">2BHK Flat</option>
                                            <option value="3BHK Flat">3BHK Flat</option>
                                        </>
                                    )}
                                    {formValues.house_type === 'PG' && (
                                        <>
                                            <option value="1 Sharing">1 Sharing</option>
                                            <option value="2 Sharing">2 Sharing</option>
                                            <option value="3 Sharing">3 Sharing</option>
                                            <option value="4 Sharing">4 Sharing</option>
                                            <option value="5 Sharing">5 Sharing</option>
                                        </>
                                    )}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    margin="dense"
                                    label="City"
                                    name="city"
                                    value={formValues.city}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    margin="dense"
                                    label="Location"
                                    name="location"
                                    value={formValues.location}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    margin="dense"
                                    label="Area"
                                    name="area"
                                    value={formValues.area}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    margin="dense"
                                    label="Street"
                                    name="street"
                                    value={formValues.street}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    margin="dense"
                                    label="Price"
                                    name="price"
                                    value={formValues.price}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button
                                    onClick={handleLocateMe}
                                    color="primary"
                                    variant="contained"
                                    startIcon={<LocationOnIcon />}
                                    sx={{ mt: 1 }}
                                >
                                    Locate Me
                                </Button>
                                <TextField
                                    margin="dense"
                                    name="google_map_location"
                                    value={formValues.google_map_location}
                                    onChange={handleChange}
                                    sx={{ '& .MuiInputBase-root': { height: '36.5px !important', ml:1 } }}
                                    />
                            </Grid>

                            {formValues.images.map((image, index) => (
                                <Grid item xs={12} md={6} key={index}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        fullWidth
                                    >
                                        Upload Image {index + 1}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={(e) => handleImageChange(e, index)}
                                        />
                                    </Button>
                                    {image && (
                                        <Box mt={2}>
                                            <img
                                            src={image}
                                            alt="" // If the image is decorative
                                            style={{ width: '100%', height: 'auto' }}
                                            />
                                        </Box>
                                        )}

                                </Grid>
                            ))}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            {editMode ? 'Update' : 'Create'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
};

export default Listings;

