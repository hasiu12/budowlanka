import React, { useState } from 'react';
import '../css/MatchingQuestion.css'; 

const MatchingQuestion = ({ pytanie, onOptionSelect  }) => {
    const [selectedPairs, setSelectedPairs] = useState(pytanie.pary.map(() => ({})));

    const handleSelectChange = (pairIndex, side, value) => {
        const newPairs = [...selectedPairs];
        newPairs[pairIndex] = { ...newPairs[pairIndex], [side]: value };
        setSelectedPairs(newPairs);

        const allPairsSelected = newPairs.every(pair => pair.left && pair.right);
        onOptionSelect(allPairsSelected, newPairs); // Informuje, czy wszystkie pary są zaznaczone
    };



    return (
        <div className="matching-question-container">
            <h2 className="matching-question-header">{pytanie.text}</h2>
            <div>
                {pytanie.pary.map((pair, index) => (
                    <div key={index} className="pair-container">
                        <select 
                            className="pair-select"
                            onChange={(e) => handleSelectChange(index, 'left', e.target.value)}
                        >
                            <option value="">Wybierz...</option>
                            {pytanie.pary.map(([left], idx) => (
                                <option key={idx} value={left}>{left}</option>
                            ))}
                        </select>
                        <span> dopasuj do </span>
                        <select 
                            className="pair-select"
                            onChange={(e) => handleSelectChange(index, 'right', e.target.value)}
                        >
                            <option value="">Wybierz...</option>
                            {pytanie.pary.map(([, right], idx) => (
                                <option key={idx} value={right}>{right}</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MatchingQuestion;
