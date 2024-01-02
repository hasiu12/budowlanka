import React, { useState, useEffect } from 'react';
import '../css/MatchingQuestion.css'; 

const MatchingQuestion = ({ pytanie, onOptionSelect, selectedPairs1 }) => {
    // Tworzenie pary z lewej strony z pustymi wartościami po prawej stronie
    const createPairs = () => {
        return pytanie.lewaStrona.map(leftItem => ({
            left: leftItem,
            right: '' // Początkowo puste
        }));
    };

    // Inicjalizacja stanu selectedPairs
    const [selectedPairs, setSelectedPairs] = useState(createPairs());

    const handleSelectChange = (pairIndex, value) => {
        const newPairs = [...selectedPairs];
        newPairs[pairIndex] = { ...newPairs[pairIndex], right: value };
        setSelectedPairs(newPairs);

        const allPairsSelected = newPairs.every(pair => pair.right);
        onOptionSelect(allPairsSelected, newPairs);
    };

    useEffect(() => {
        // Aktualizacja selectedPairs jeśli selectedPairs1 się zmienia
        if (selectedPairs1) {
            const updatedPairs = createPairs().map((pair, index) => ({
                ...pair,
                right: selectedPairs1[index]?.right || ''
            }));
            setSelectedPairs(updatedPairs);
        }
    }, [selectedPairs1]);

    // Utworzenie pytanie.pary na podstawie aktualnego stanu
    pytanie.pary = selectedPairs;

    return (
        <div className="matching-question-container">
            <h2 className="matching-question-header">{pytanie.text}</h2>
            <div>
                {selectedPairs.map((pair, index) => (
                    <div key={index} className="pair-container">
                        <span className="pair-left">{pair.left}</span>
                        <span> dopasuj do </span>
                        <select 
                            className="pair-select"
                            value={pair.right}
                            onChange={(e) => handleSelectChange(index, e.target.value)}
                        >
                            <option value="">Wybierz...</option>
                            {pytanie.prawaStrona.map((rightOption, rightIdx) => (
                                <option key={rightIdx} value={rightOption}>{rightOption}</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MatchingQuestion1;
