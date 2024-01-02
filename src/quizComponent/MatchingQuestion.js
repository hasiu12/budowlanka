import React, { useState, useEffect } from 'react';
import '../css/MatchingQuestion.css'; // Załóżmy, że tutaj przechowujesz swoje style CSS

const MatchingQuestion = ({ pytanie, selectedPairs1, onOptionSelect }) => {
    const [selectedPairs, setSelectedPairs] = useState(selectedPairs1 || {});

    useEffect(() => {
        setSelectedPairs(selectedPairs1 || {});
    }, [selectedPairs1]);

    const handleSelectChange = (leftItem, event) => {
        const rightItem = event.target.value;
        const newPairs = { ...selectedPairs, [leftItem]: rightItem };
        setSelectedPairs(newPairs);
        onOptionSelect(Object.keys(newPairs).length === pytanie.lewaStrona.length, newPairs);
    };

    return (
        <div className="matching-question">
            {pytanie.lewaStrona.map((leftItem, index) => (
                <div key={index} className="pair-container">
                    <span className="left-side">{leftItem}</span>
                    <select 
                        className="right-side-select" // Zaktualizowana nazwa klasy dla elementu select
                        value={selectedPairs[leftItem] || ''}
                        onChange={(e) => handleSelectChange(leftItem, e)}
                    >
                        <option value="">Wybierz...</option>
                        {pytanie.prawaStrona.map((rightItem, i) => (
                            <option key={i} value={rightItem}>
                                {rightItem}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
};

export default MatchingQuestion;
