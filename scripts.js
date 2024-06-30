document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('register-btn').addEventListener('click', function() {
        document.getElementById('register-form').style.display = 'block';
        document.getElementById('login-form').style.display = 'none';
    });

    document.getElementById('login-btn').addEventListener('click', function() {
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
    });
});

function register() {
    const role = document.getElementById('role').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = {
        role: role,
        name: name,
        email: email,
        password: password
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! Please proceed to login.');
    document.getElementById('register-form').style.display = 'none';
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const role = document.getElementById('login-role').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(user => user.email === email && user.password === password && user.role === role);

    if (user) {
        alert('Login successful!');
        if (role === 'student') {
            window.location.href = 'student_timetable.html';
        } else if (role === 'teacher') {
            window.location.href = 'teacher_timetable.html';
        }
    } else {
        alert('Invalid login credentials.');
    }
}

function displayStudentTimetables() {
    const timetableDataA = getStudentTimetableData('Section A');
    const timetableDataB = getStudentTimetableData('Section B');
    
    displayTimetable(timetableDataA, 'sectionA');
    displayTimetable(timetableDataB, 'sectionB');
}

function displayTimetable(timetableData, sectionId) {
    const timetableContainer = document.getElementById(`timetable-${sectionId}`);
    timetableContainer.innerHTML = '';

    let timetableHTML = `<table><tr><th>Time</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th></tr>`;

    timetableData.forEach(slot => {
        timetableHTML += `<tr><td>${slot.time}</td>`;
        slot.classes.forEach(cls => {
            timetableHTML += `<td>${cls}</td>`;
        });
        timetableHTML += `</tr>`;
    });

    timetableHTML += `</table>`;
    timetableContainer.innerHTML = timetableHTML;
}

function getStudentTimetableData(section) {
    if (section === 'Section A') {
        return [
            { time: '08:00 - 09:00', classes: ['Theory', 'Theory', 'Theory', 'Theory', 'Theory'] },
            { time: '09:00 - 10:00', classes: ['Data structures', 'Introductory Algebra', 'Financial management', 'Computer networks', 'Theory'] },
            { time: '10:00 - 10:30', classes: ['Lunch Break', 'Lunch Break', 'Lunch Break', 'Lunch Break', 'Lunch Break'] },
            { time: '10.30 - 11:30', classes: ['Operating systems', 'Foundational maths', 'Creative English', 'Statistics', 'Computer fundamentals'] },
            { time: '11:30 - 12:30', classes: ['Lunch Break', 'Lunch Break', 'Lunch Break', 'Lunch Break', 'Lunch Break'] },
            { time: '12.30 - 13:30', classes: ['Operating systems', 'Foundational maths', 'Creative English', 'Statistics', 'Computer fundamentals'] },
            { time: '13:30 - 14:30', classes: ['Lab', 'Lab', 'Lab', 'Lab', 'Lab'] }
        ];
    } else if (section === 'Section B') {
        return [
            { time: '08:00 - 09:00', classes: ['Foundational maths', 'computer fundamentals', 'Creative English', 'Statistics', 'Operating systems'] },
            { time: '09:00 - 10:00', classes: ['Theory', 'Theory', 'Theory', 'Theory', 'Theory'] },
            { time: '10:00 - 10:30', classes: ['Lunch Break', 'Lunch Break', 'Lunch Break', 'Lunch Break', 'Lunch Break'] },
            { time: '10:30 - 11:30', classes: ['Theory', 'Theory', 'Theory', 'Theory', 'Theory'] },
            { time: '11:30 - 12:30', classes: ['Lunch Break', 'Lunch Break', 'Lunch Break', 'Lunch Break', 'Lunch Break'] },
            { time: '12:30 - 13:30', classes: ['Foundational maths', 'computer fundamentals', 'Creative English', 'Statistics', 'Operating systems'] },
            { time: '13:30 - 14:30', classes: ['Lab', 'Lab', 'Lab', 'Lab', 'Lab'] }
        ];
    }
}

function displayTeacherTimetable() {
    const timetableData = getTeacherTimetableData();
    const timetableContainer = document.getElementById('timetable-teacher');
    timetableContainer.innerHTML = '';

    let timetableHTML = `<table><tr><th>Time</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th></tr>`;

    timetableData.forEach(slot => {
        timetableHTML += `<tr><td>${slot.time}</td>`;
        slot.classes.forEach(cls => {
            timetableHTML += `<td>${cls}</td>`;
        });
        timetableHTML += `</tr>`;
    });

    timetableHTML += `</table>`;
    timetableContainer.innerHTML = timetableHTML;
}

function getTeacherTimetableData() {
    return [
        { time: '08:00 - 09:00', classes: ['BCA-A', 'BCA-B','BCA-B' , 'BCA-A', 'BCA-A'] },
        { time: '09:00 - 10:00', classes: ['BCA-B',  'Free', 'BCA-A', 'Free', 'BCA-B'] },
        { time: '10:30 - 11:30', classes: ['Break','Break','Break','Break','Break'] },
        { time: '10:30 - 11:30', classes: ['Free','BCA-A', 'BCA-A', 'BCA-B', 'BCA-B'] },
        { time: '12:30 - 13:30', classes: ['BCA-A', 'BCA-B', 'BCA-B', 'BCA-A', 'Free'] },
        { time: '12:30 - 13:30', classes: ['BCA-B', 'BCA-A', 'Free', 'BCA-B', 'BCA-A'] },
        { time: '11:30 - 12:30', classes: ['Lab','Lab','Lab','Lab','Lab'] }
     
    ];
}
