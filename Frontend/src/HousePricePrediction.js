import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { TextField, Button, Typography, Grid, Paper } from '@mui/material';
import PredictionChart from './PredictionChart';
import MapComponent from './MapComponent';
import MortgageCalculator from './MortgageCalculator'; // Import MortgageCalculator

const HousePricePrediction = () => {
    const [formData, setFormData] = useState({
        MedInc: '',
        HouseAge: '',
        AveRooms: '',
        AveBedrms: '',
        Population: '',
        AveOccup: '',
        Latitude: '',
        Longitude: ''
    });
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePrediction = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        const data = { 
            features: Object.fromEntries(Object.entries(formData).map(([key, value]) => [key, parseFloat(value)])) 
        };

        try {
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                setPrediction(result.prediction[0]);
            } else {
                setError(result.error);
            }
        } catch {
            setError('Something went wrong! Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper style={styles.container}>
            <Typography variant="h4" align="center" gutterBottom>House Price Prediction</Typography>
            <form onSubmit={handlePrediction} style={styles.form}>
                <Grid container spacing={2}>
                    {Object.keys(formData).map((field) => (
                        <Grid item xs={12} sm={6} key={field}>
                            <TextField
                                label={field}
                                variant="outlined"
                                name={field}
                                type="number"
                                value={formData[field]}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                    ))}
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={styles.button}
                    disabled={loading}
                    fullWidth
                >
                    {loading ? <ClipLoader loading={loading} size={25} color="#fff" /> : 'Get Prediction'}
                </Button>
            </form>

            {prediction && (
                <div style={styles.resultContainer}>
                    <Typography variant="h5">Predicted Price: ${prediction.toFixed(2)}</Typography>
                    <MortgageCalculator propertyPrice={prediction} /> {/* Include Mortgage Calculator */}
                    <PredictionChart predictedPrice={prediction} historicalPrices={[230000, 240000]} />
                </div>
            )}

            {error && <Typography color="error">Error: {error}</Typography>}

            {formData.Latitude && formData.Longitude && (
                <MapComponent lat={parseFloat(formData.Latitude)} lng={parseFloat(formData.Longitude)} />
            )}
        </Paper>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '50px auto',
        backgroundColor: '#f4f4f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
    },
    form: {
        marginBottom: '20px',
    },
    button: {
        marginTop: '10px',
    },
    resultContainer: {
        marginTop: '20px',
        textAlign: 'center',
    },
};

export default HousePricePrediction;
