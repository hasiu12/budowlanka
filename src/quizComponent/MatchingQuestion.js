import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import '../css/MatchingQuestion.css';

const MatchingQuestion = ({ pytanie, selectedPairs1, onOptionSelect }) => {
    const [selectedPairs, setSelectedPairs] = useState(selectedPairs1 || {});

    useEffect(() => {
        setSelectedPairs(selectedPairs1 || {});
    }, [selectedPairs1]);
    
    const handleSelectChange = (leftItem, selectedOption) => {
        const newPairs = { ...selectedPairs, [leftItem]: selectedOption ? selectedOption.value : '' };
        setSelectedPairs(newPairs);
        onOptionSelect(Object.keys(newPairs).length === pytanie.lewaStrona.length, newPairs);
    };

    // Przygotowanie opcji dla React Select
    const options = pytanie.prawaStrona.map(item => ({ value: item, label: item }));
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            width: '100%', // Szerokość kontrolki dopasowuje się do kontenera nadrzędnego
            minWidth: '250px', // Minimalna szerokość, gdy nie ma wybranej wartości
            maxWidth: '480px', // Maksymalna szerokość kontrolki
            borderRadius: '4px',
            borderColor: '#ced4da',
            '&:hover': { borderColor: '#adb5bd' },
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#6c757d',
            minWidth: '45vw', // 50% szerokości viewportu dla placeholdera
            maxWidth: '480px',
        }),
        option: (provided, state) => ({
            ...provided,
            borderBottom: '1px solid #ddd', // Dodaje ramkę na dole każdej opcji
            padding: '10px',
            backgroundColor: state.isSelected ? '#007bff' : '#fff',
            color: state.isSelected ? '#fff' : '#495057',
            '&:hover': {
                backgroundColor: '#0056b3',
                color: '#fff',
            },
            // Usuń linię poniżej, jeśli nie chcesz oddzielać ostatniej opcji
            '&:last-of-type': {
                borderBottom: 'none',
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#495057',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#6c757d',
        }),
        // Możesz dodać więcej stylów dla innych części komponentu
    };
    


    return (
        <div className="matching-question-container">
            {pytanie.lewaStrona.map((leftItem, index) => (
                <div key={index} className="pair-container">
                    <span className="left-side">{leftItem}</span>
                    <Select
                        styles={customStyles}
                        className="right-side-select"
                        value={options.find(option => option.value === selectedPairs[leftItem])}
                        onChange={(selectedOption) => handleSelectChange(leftItem, selectedOption)}
                        options={options}
                        isClearable
                        placeholder="Wybierz..."
                    />
                </div>
            ))}
        </div>
    );
};

export default MatchingQuestion;
