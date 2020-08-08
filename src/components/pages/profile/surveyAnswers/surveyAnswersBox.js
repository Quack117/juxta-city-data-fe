import React, { useContext, useState, useEffect } from "react";
import ProfileContext from "../../../../contexts/ProfileContext";
import { getSurveyData } from "../../../surveyQuestions/SurveyFunctions";
import SurveyAnswers from './SurveyAnswers'

const SurveyAnswersBox = ({index}) => {
  const { profileData } = useContext(ProfileContext);
  const [surveyData, setSurveyData] = useState([]);

  useEffect(() => {
    getSurveyData().then((response) => setSurveyData(response));
  }, []);
 
  
   return (
    <div style={{position: 'absolute', bottom: 0, marginBottom: 20, marginTop: 20}}>
      <h3>Your Survey Answers</h3>
     <SurveyAnswers  index={index} profileData={profileData}  surveyData={surveyData} />
     
    </div>
   )
  
};
export default SurveyAnswersBox;
