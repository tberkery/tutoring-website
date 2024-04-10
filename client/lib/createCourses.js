const axios = require("axios");

async function getWhitingCourses(school) {
    let coursesToAdd = new Set();
    const data = await axios.get(`https://sis.jhu.edu/api/classes/${school}/Spring 2024?key=KFc5nPpzg735eByE0sb6iWumaOtORpSt`)
    for (let i = 0; i < data.data.length; i++) {
        if ((i != 0 && data.data[i].OfferingName === data.data[i-1].OfferingName) || !data.data[i].AllDepartments || !data.data[i].OfferingName){
            continue;
        }
        const departments = data.data[i].AllDepartments.split("^")
        const curCourse = {"courseTitle": data.data[i].Title, "courseNumber": data.data[i].OfferingName, "courseDepartment": departments, };
        coursesToAdd.add(curCourse);
    }
    // data = await axios.get(`https://sis.jhu.edu/api/classes/${school}/Fall 2023?key=KFc5nPpzg735eByE0sb6iWumaOtORpSt`)
    return coursesToAdd;
}

async function storeWhitingCourses(school) {
    const courses = await getWhitingCourses(school);    
    for(const course of courses){
        try {
            const data = await axios.post(`http://localhost:6300/courses/`, course);
        } catch (err) {
            console.log("error is ", err);
        }
        
    }
}


storeWhitingCourses("Whiting School of Engineering");
storeWhitingCourses("Krieger School of Arts and Sciences");

