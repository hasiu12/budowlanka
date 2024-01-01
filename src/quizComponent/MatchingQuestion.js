import React, { useState, useEffect } from 'react';
import '../css/MatchingQuestion.css'; 

const MatchingQuestion = ({ pytanie, onOptionSelect, selectedPairs1 }) => {
    // Ustawienie domyślnych wartości dla lewej strony na podstawie dostarczonych par
    const initializePairs = () => pytanie.pary.map((pair, index) => ({
        left: pair[0],
        right: selectedPairs1 && selectedPairs1[index] ? selectedPairs1[index].right : ''
    }));

    const [selectedPairs, setSelectedPairs] = useState(initializePairs());

    const handleSelectChange = (pairIndex, value) => {
        const newPairs = [...selectedPairs];
        newPairs[pairIndex] = { ...newPairs[pairIndex], right: value };
        setSelectedPairs(newPairs);

        const allPairsSelected = newPairs.every(pair => pair.right);
        onOptionSelect(allPairsSelected, newPairs);
    };

    useEffect(() => {
        if (selectedPairs1) {
            setSelectedPairs(initializePairs());
        }
    }, [selectedPairs1, pytanie.pary]);

    return (
        <div className="matching-question-container">
            <h2 className="matching-question-header">{pytanie.text}</h2>
            <div>
                {pytanie.pary.map((pair, index) => {
                    const selectedRight = selectedPairs[index]?.right || '';

                    return (
                        <div key={index} className="pair-container">
                            <span className="pair-left">{pair[0]}</span>
                            <span> dopasuj do </span>
                            <select 
                                className="pair-select"
                                value={selectedRight}
                                onChange={(e) => handleSelectChange(index, e.target.value)}
                            >
                                <option value="">Wybierz...</option>
                                {pytanie.pary.map(([, rightOption], rightIdx) => (
                                    <option key={rightIdx} value={rightOption}>{rightOption}</option>
                                ))}
                            </select>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MatchingQuestion;
