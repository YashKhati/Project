import numpy as np
import pickle
import streamlit as st

load_model = pickle.load(open('C:/Users/ASUS/OneDrive/Desktop/MiniProject/Modifiedsvm_model.pkl','rb'))

def Loan_status_pred(input_data):
    
    inputArray = np.asarray(input_data)
    newInput = inputArray.reshape(1,-1)
    prediction = load_model.predict(newInput)
    if(prediction==0):
        return 'Sorry Loan Cannot be Approved'
    else:
        return 'Congratulation Your Loan is Approved'
    
    
    
def main():
    st.title("Loan Status prediction")
    st.header('Enter Details')


    col1, col2  = st.columns(2)

    user=col1.text_input(label='Enter Name')



    # Applicant Monthly Income
    applicantIncome = col1.slider(label='Monthly Income',min_value=100,max_value=80000,step=100)
    
    with col1:
        st.write('Applicant Monthly Income : ',applicantIncome)


    # Co-Applicant Monthly Income
    coapplicantIncome = col1.slider("Co-Applicant's Monthly Income",min_value=100,max_value=40000,step=100)
   
    with col1:
         st.write('Co-Applicant Monthly Income : ',coapplicantIncome)


    TotalIncome = applicantIncome+coapplicantIncome
    NewTotalIncome = np.log(TotalIncome)
    # For Credit Score
    selectCredit = {'500 or above' : 1 , ' Below 500' : 0 }
    credOptions = col1.selectbox(label='Credit Score',options=selectCredit)
    credSc = selectCredit[credOptions]


    # Loan AMount
    loanAmt=col1.slider(label="Loan Amount",min_value=10,max_value=1000,step=10)
    with col1:
        st.write('Loan Amount : ',loanAmt)
    
    NewloanAmt = np.log(loanAmt)

    # loan duration
    loanDur = col1.slider(label='Loan duration(months)',min_value=0,max_value=16,step=1)
    with col1:
        st.write('Loan duration in Days : ',loanDur*30) 
    loanDur = loanDur*30



    # Gender
    selectGender = {'Female' : 0 ,'Male' : 1}
    genOptions = col2.selectbox(label='Gender',options=selectGender)

    gen = selectGender[genOptions]


    #  Marriage Status
    selectMarriage = {'Married' : 1 , 'Not-married' : 0}
    marrOptions =  col2.selectbox(label='Marital Status' ,options=selectMarriage)
    marr = selectMarriage[marrOptions]
    

    # Dependents
    selectDependents = {'0': 0, '1': 1, '2': 2, '3+' : 3}
    depOptions =col2.selectbox(label='Dependents',options=selectDependents)
    depe=selectDependents[depOptions]

    # Education Qualification
    selectEducation = {'Graduate' : 1,'Not Graduate' : 0}
    eduOptions = col2.selectbox(label='Education Qualification',options=selectEducation)
    edu = selectEducation[eduOptions]

    # Employment
    selectSelfEmployed = {'Yes': 1,'No' : 0}
    employedOption = col2.selectbox(label='Self Employed',options=selectSelfEmployed)
    self_emp = selectSelfEmployed[employedOption]


    # Property Location
    selectProperty = {'Rural' : 1,'Semi-Urban' : 0,'Urban' : 2}
    propertyOption = col2.selectbox(label='Property Area',options=selectProperty)
    propAr = selectProperty[propertyOption]
    
    result=''
    features = [gen,marr,depe,edu,self_emp,loanDur,credSc,propAr,NewTotalIncome,NewloanAmt]
  
    if st.button('Apply'):
        result=Loan_status_pred(features)
    
    st.success(result)


if __name__ =='__main__':
    main()    