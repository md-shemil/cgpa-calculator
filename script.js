const container = document.querySelector(".container");
const addbtn = document.getElementById("addcourse");
const reference = document.querySelector('div.box');

const gradeMap ={
    "O": 10,
    "A+": 9,
    "A":8,
    "B+":7,
    "B":6,
    "C":5
};

let courseid =0;

function createInput(courseid){
    //credit input
    const courseDiv = document.createElement('div');
    const courseID = document.createElement('label');
    courseID.innerHTML = courseid;
    courseID.classList.add('coursenumber');


    const creditInput = document.createElement('input');
    creditInput.type = "number";    
    creditInput.id =`credit${courseid}`;
    creditInput.classList.add('creditinputbar');




    const grade = document.createElement('select');
    grade.id = `grade${courseid}`;
    grade.classList.add("gradeselect");

    

    

    
    Object.keys(gradeMap).forEach((gradeText)=>{
        const option = document.createElement('option');
        option.value = gradeMap[gradeText];
        option.textContent = gradeText;
        grade.appendChild(option)
    });

    creditInput.addEventListener('change', () => {
        updateGPA(courseid);  // Update GPA when grade is changed
    });
    grade.addEventListener('change', () => {
        updateGPA(courseid);  // Update GPA when grade is changed
    });
    
    
    // newInput.type = 'number';
    courseDiv.appendChild(courseID);
    courseDiv.appendChild(creditInput);
    courseDiv.appendChild(grade);
    courseDiv.appendChild(document.createElement("br"));
    container.insertBefore(courseDiv,reference);
};
courseid++;
createInput(courseid)
courseid++;
createInput(courseid)

addbtn.addEventListener('click', ()=>{
    courseid++;
    createInput(courseid)
});

function gpa(courseid){
    let totalcredit = 0;
    let totalgradepoint=0;
    for(let i = 1;i<=courseid;i++){
        const credit = parseFloat(document.getElementById(`credit${i}`).value)||0;
        const gradevalue = parseFloat(document.getElementById(`grade${i}`).value)||0;
        totalcredit +=credit;
        totalgradepoint += credit* gradevalue;
    }
    let gpa = totalgradepoint/totalcredit;
    return gpa;

};
function updateGPA(courseid){
    const result = gpa(courseid);
    document.getElementById('cgpa').innerHTML = `Result  ${result.toFixed(2)}`;
}
const clear = document.getElementById("clear");
clear.addEventListener('click', () =>{
    const form = document.querySelector('.container');
    form.querySelectorAll('input, select').forEach(input => input.value = '');
    document.getElementById('cgpa').innerHTML = '';
});