import React, { useState } from 'react';
import { Drawer, Button, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent, Box, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CancelIcon from '@mui/icons-material/Cancel';

interface FilterProps {
    applyFilters: (filters: any) => void;
    clearFilters: () => void;
}

const Filters: React.FC<FilterProps> = ({ applyFilters, clearFilters }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedBuildingType, setSelectedBuildingType] = useState<keyof typeof filterData.roomTypes | ''>('');
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');

    const filterData = {
        metropolitan_cities_locations: [
            {
                city: "Mumbai",
                locations: ["Andheri", "Bandra", "Juhu", "Dadar", "Colaba", "Malad", "Goregaon", "Powai", "Borivali", "Vile Parle", "Worli", "Chembur", "Kandivali", "Thane", "Santa Cruz", "Mulund",
                    "Khar", "Santacruz", "Navi Mumbai", "Versova", "Dahisar", "Ghatkopar", "Panvel", "Mira Road", "Vashi", "Andheri West", "Andheri East", "Malad West", "Malad East", "Goregaon East"]
            },
            {
                city: "Delhi",
                locations: ["Connaught Place", "Dwarka", "Saket", "Vasant Kunj", "Lajpat Nagar", "Chanakyapuri", "Nehru Place", "Karol Bagh", "South Extension", "Rohini", "Mayur Vihar", "Pitampura", "Greater Kailash", "Hauz Khas", "Laxmi Nagar", "Chandni Chowk", "Noida", "Gurgaon", "Rajouri Garden", "Green Park", "Paharganj", "Najafgarh", "Dilshad Garden", "New Friends Colony", "Rajendra Nagar", "Daryaganj", "Shahdara", "Kalkaji", "Patel Nagar", "Mukherjee Nagar"
                ]
            },
            {
                city: "Kolkata",
                locations: ["Salt Lake City", "Park Street", "Ballygunge", "New Town", "Behala", "Howrah", "Dum Dum", "Alipore", "Barasat", "Garia", "Rajarhat", "Jadavpur", "Tollygunge", "Sealdah", "Barrackpore", "Kasba", "Salt Lake", "Kestopur", "Beliaghata", "Gariahat", "Esplanade", "Bidhannagar", "Baguiati", "Durgapur", "Hooghly", "Chandannagar", "Khardah", "Baranagar", "Ranaghat", "Dunlop"]
            },
            {
                city: "Chennai",
                locations: ["Anna Nagar", "T Nagar", "Adyar", "Velachery", "Mylapore", "Mogappair", "Kilpauk", "Guindy", "Nungambakkam", "Pallavaram", "Thiruvanmiyur", "Ambattur", "Royapettah", "Tambaram", "Koyambedu", "Ashok Nagar", "Porur", "Sholinganallur", "Medavakkam", "Vadapalani", "Chrompet", "Egmore", "Virugambakkam", "West Mambalam", "Anna Salai", "Mount Road", "Thiruvallikeni", "Madipakkam", "Kodambakkam", "Villivakkam"]
            },
            {
                city: "Bengaluru",
                locations: ["Koramangala", "Indiranagar", "Whitefield", "Electronic City", "HSR Layout", "Jayanagar", "Marathahalli", "JP Nagar", "BTM Layout", "Bannerghatta Road", "Malleshwaram", "Banashankari", "Yelahanka", "Hebbal", "Rajajinagar", "Bellandur", "Basavanagudi", "Kengeri", "Sarjapur Road", "KR Puram", "Cunningham Road", "Vijayanagar", "Ulsoor", "Basaveshwaranagar", "Brookefield", "Mahadevapura", "Yeshwanthpur", "Banaswadi", "RR Nagar", "Domlur"]
            },
            {
                city: "Hyderabad",
                locations: ["Gachibowli", "Madhapur", "Banjara Hills", "Jubilee Hills", "Kondapur", "Hitech City", "Ameerpet", "Begumpet", "Kukatpally", "Secunderabad", "Miyapur", "Nizampet", "Kothapet", "Manikonda", "Mehdipatnam", "Himayat Nagar", "Kukatpally Housing Board Colony", "Malkajgiri", "KPHB Colony", "Tolichowki", "Santosh Nagar", "Somajiguda", "LB Nagar", "Moula Ali", "Srinagar Colony", "Uppal", "Attapur", "Kompally", "Shamshabad", "Hayathnagar"]
            },
            {
                city: "Ahmedabad",
                locations: ["Satellite", "Vastrapur", "Maninagar", "Thaltej", "Bodakdev", "Navrangpura", "Ghatlodia", "Chandkheda", "Bopal", "Naranpura", "Ambawadi", "Nikol", "Gota", "Vastral", "Prahlad Nagar", "Naroda", "Isanpur", "Nava Vadaj", "Jodhpur", "Sola", "Memnagar", "Gandhinagar", "Narol", "Vatva", "Sabarmati", "Juhapura", "Thakkarbapa Nagar", "Shahibaug", "Narayan Nagar", "Manek Chowk"]
            },
            {
                city: "Pune",
                locations: ["Koregaon Park", "Kothrud", "Viman Nagar", "Wakad", "Baner", "Hinjewadi", "Magarpatta", "Hadapsar", "Kondhwa", "Camp", "Deccan Gymkhana", "Aundh", "Pimpri", "Chinchwad", "Bavdhan", "Kalyani Nagar", "Yerwada", "Swargate", "Karve Nagar", "Shivajinagar", "Balewadi", "Wanowrie", "Pimple Saudagar", "Kharadi", "Warje", "Katraj", "Vishrantwadi", "Nigdi", "Keshav Nagar"]
            }
        ],
        buildingTypes: ["Individual House", "Individual Apartment", "Semi-Gated Apartment", "Gated Apartment","PG"],
        roomTypes: {
            "Individual House": ["1BHK House", "2BHK House", "3BHK House"],
            "Individual Apartment": ["1BHK Flat", "2BHK Flat", "3BHK Flat"],
            "Semi-Gated Apartment": ["1BHK Flat", "2BHK Flat", "3BHK Flat"],
            "Gated Apartment": ["1BHK Flat", "2BHK Flat", "3BHK Flat"],
            "PG": ["1 Sharing", "2 Sharing", "3 Sharing", "4 Sharing", "5 Sharing"]
        },
        priceRanges: ["5000-10000", "10000-15000", "15000-20000", "20000-25000", "25000-30000", "30000-35000", "35000-40000", "40000-45000", "45000-50000"]
    };

    const handleCityChange = (e: SelectChangeEvent<string>) => {
        setSelectedCity(e.target.value as string);
        setSelectedLocation('');
    };

    const handleLocationChange = (e: SelectChangeEvent<string>) => {
        setSelectedLocation(e.target.value as string);
    };

    const handleBuildingTypeChange = (e: SelectChangeEvent<string>) => {
        setSelectedBuildingType(e.target.value as keyof typeof filterData.roomTypes);
        setSelectedRoomType('');
    };

    const handleRoomTypeChange = (e: SelectChangeEvent<string>) => {
        setSelectedRoomType(e.target.value as string);
    };

    const handlePriceRangeChange = (e: SelectChangeEvent<string>) => {
        setSelectedPriceRange(e.target.value as string);
    };

    const handleApplyFilters = () => {
        // Construct filters object
        const filters = {
            city: selectedCity,
            location: selectedLocation,
            buildingType: selectedBuildingType,
            roomType: selectedRoomType,
            priceRange: selectedPriceRange
        };

        // Apply filters
        applyFilters(filters);

        // Close drawer
        setDrawerOpen(false);
    };

    const handleClearFilters = () => {
        setSelectedCity('');
        setSelectedLocation('');
        setSelectedBuildingType('');
        setSelectedRoomType('');
        setSelectedPriceRange('');
        clearFilters();
        setDrawerOpen(false);
    };

    return (
        <>
            <Button
                variant='contained'
                // color="primary"
                aria-label="filter"
                sx={{ mr: 1, backgroundColor: '#f26024', '&:hover': {backgroundColor: '#f26024'} }}
                startIcon={<FilterAltIcon />}
                onClick={() => setDrawerOpen(true)}
            >
                Filter
            </Button>
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 380, p: 2 }}>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', m: 2 }} >
                        <Typography sx={{fontWeight: 'Bold', fontSize: '20px'}}>Filters</Typography>
                        <CancelIcon onClick={() => setDrawerOpen(false)} />
                    </Box>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>City</InputLabel>
                        <Select value={selectedCity} onChange={handleCityChange}>
                            {filterData.metropolitan_cities_locations.map((cityData) => (
                                <MenuItem key={cityData.city} value={cityData.city}>
                                    {cityData.city}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Location</InputLabel>
                        <Select
                            value={selectedLocation}
                            onChange={handleLocationChange}
                            disabled={!selectedCity}
                        >
                            {selectedCity && filterData.metropolitan_cities_locations.find((cityData) => cityData.city === selectedCity)?.locations.map((location) => (
                                <MenuItem key={location} value={location}>
                                    {location}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Building Type</InputLabel>
                        <Select value={selectedBuildingType} onChange={handleBuildingTypeChange}>
                            {filterData.buildingTypes.map((buildingType) => (
                                <MenuItem key={buildingType} value={buildingType}>
                                    {buildingType}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Room Type</InputLabel>
                        <Select
                            value={selectedRoomType}
                            onChange={handleRoomTypeChange}
                            disabled={!selectedBuildingType}
                        >
                            {selectedBuildingType && filterData.roomTypes[selectedBuildingType].map((roomType) => (
                                <MenuItem key={roomType} value={roomType}>
                                    {roomType}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Price Range</InputLabel>
                        <Select value={selectedPriceRange} onChange={handlePriceRangeChange}>
                            {filterData.priceRanges.map((priceRange) => (
                                <MenuItem key={priceRange} value={priceRange}>
                                    {priceRange}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" onClick={handleApplyFilters} sx={{ backgroundColor: '#f26024', '&:hover': {backgroundColor: '#f26024'}}}>
                            Apply Filters
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleClearFilters} sx={{ color: '#f26024',borderColor: '#f26024','&:hover': {borderColor: '#f26024',color: '#f26024',}}} >
                            Clear Filters
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default Filters;

//     return (
//         <>
//             <Button
//                 variant='contained'
//                 color="primary"
//                 aria-label="filter"
//                 sx={{ mr: 1 }}
//                 startIcon={<FilterAltIcon />}
//                 onClick={() => setDrawerOpen(true)}
//             >
//                 Filter
//             </Button>
//             <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
//                 <Box sx={{ width: 300, p: 2 }}>
//                     <Typography>Filters</Typography>
//                     <FormControl fullWidth margin="normal">
//                         <InputLabel>City</InputLabel>
//                         <Select value={selectedCity} onChange={handleCityChange}>
//                             {filterData.metropolitan_cities_locations.map((cityData) => (
//                                 <MenuItem key={cityData.city} value={cityData.city}>
//                                     {cityData.city}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                     <FormControl fullWidth margin="normal">
//                         <InputLabel>Location</InputLabel>
//                         <Select
//                             value={selectedLocation}
//                             onChange={handleLocationChange}
//                             disabled={!selectedCity}
//                         >
//                             {selectedCity && filterData.metropolitan_cities_locations.find((cityData) => cityData.city === selectedCity)?.locations.map((location) => (
//                                 <MenuItem key={location} value={location}>
//                                     {location}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                     <FormControl fullWidth margin="normal">
//                         <InputLabel>Building Type</InputLabel>
//                         <Select value={selectedBuildingType} onChange={handleBuildingTypeChange}>
//                             {filterData.buildingTypes.map((buildingType) => (
//                                 <MenuItem key={buildingType} value={buildingType}>
//                                     {buildingType}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                     <FormControl fullWidth margin="normal">
//                         <InputLabel>Room Type</InputLabel>
//                         <Select
//                             value={selectedRoomType}
//                             onChange={handleRoomTypeChange}
//                             disabled={!selectedBuildingType}
//                         >
//                             {selectedBuildingType && filterData.roomTypes[selectedBuildingType].map((roomType) => (
//                                 <MenuItem key={roomType} value={roomType}>
//                                     {roomType}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                     <FormControl fullWidth margin="normal">
//                         <InputLabel>Price Range</InputLabel>
//                         <Select value={selectedPriceRange} onChange={handlePriceRangeChange}>
//                             {filterData.priceRanges.map((priceRange) => (
//                                 <MenuItem key={priceRange} value={priceRange}>
//                                     {priceRange}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                     <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
//                         <Button variant="contained" color="primary" onClick={handleApplyFilters}>
//                             Apply Filters
//                         </Button>
//                         <Button variant="outlined" color="secondary" onClick={() => setDrawerOpen(false)}>
//                             Cancel
//                         </Button>
//                     </Box>
//                 </Box>
//             </Drawer>
//         </>
//     );
// };

// export default Filters;
