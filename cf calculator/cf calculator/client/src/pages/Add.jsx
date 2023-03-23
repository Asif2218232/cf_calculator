
import React, { useState } from 'react';
import axios from 'axios';

import '../styles/add.css';

export default function Add() {
  const [electricityUsage, setElectricityUsage] = useState('');
  const [naturalGasUsage, setNaturalGasUsage] = useState('');
  const [carMileage, setCarMileage] = useState('');
  const [flightMileage, setFlightMileage] = useState('');
  const [carbonFootprint, setCarbonFootprint] = useState(0);
  const [totalCarbonFootprint, setTotalCarbonFootprint] = useState(0);

  const [calc, setCalc] = useState({
    electricityUsage: '',
    naturalGasUsage: '',
    carMileage: '',
    flightMileage: '',
    result: '0'
  });

  const handleChange = (e) => {
    setCalc((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const electricityCarbon = 0.86 * calc.electricityUsage;
    const naturalGasCarbon = 11.7 * calc.naturalGasUsage;
    const carCarbon = 0.39 * calc.carMileage;
    const flightCarbon = 0.24 * calc.flightMileage;
    const totalCarbonFootprint = electricityCarbon + naturalGasCarbon + carCarbon + flightCarbon;

    setElectricityUsage(electricityCarbon.toFixed(2));
    setNaturalGasUsage(naturalGasCarbon.toFixed(2));
    setCarMileage(carCarbon.toFixed(2));
    setFlightMileage(flightCarbon.toFixed(2));
    setCarbonFootprint(totalCarbonFootprint.toFixed(2));
    setTotalCarbonFootprint(totalCarbonFootprint.toFixed(2));


    try {
      const { data } = await axios.post('http://localhost:8800', {
        ...calc,
        result: totalCarbonFootprint.toFixed(2),
      });
      // console.log(data);
      setCalc({
        electricityUsage: '',
        naturalGasUsage: '',
        carMileage: '',
        flightMileage: '',
        result: '0',
      });
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(calc);

  return (
    <>
      <h1 className="main-title">Carbon Footprint Calculator</h1>
      <div className="form-container">
        <div className="form">
          <input type="number" placeholder="Electricity Usage (kWh)" onChange={handleChange} name="electricityUsage" value={calc.electricityUsage} />
          <input type="number" placeholder="Natural Gas Usage (therms)" onChange={handleChange} name="naturalGasUsage" value={calc.naturalGasUsage} />
          <input type="number" placeholder="Car Mileage (miles)" onChange={handleChange} name="carMileage" value={calc.carMileage} />
          <input type="number" placeholder="Flight Mileage (miles)" onChange={handleChange} name="flightMileage" value={calc.flightMileage} />

          <div className="add-btn-container">
            <button onClick={handleClick} className="add-btn">
              Calculate
            </button>
          </div>


